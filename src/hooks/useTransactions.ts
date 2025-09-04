// src/hooks/useTransactions.ts
import { useState, useEffect, useCallback, useMemo } from 'react';
import { message } from 'antd';
import { CreateTransactionRequest, Transaction, TRANSACTION_TYPE_DISPLAY, TransactionFilters, TransactionSummary } from '../Models/Transaction';
import { TransactionService } from '../Services/TransactionService';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters state
  const [filters, setFilters] = useState<TransactionFilters>({
    searchText: '',
    status: 'all',
    type: 'all',
    dateRange: null
  });

  /**
   * Fetch all user transactions
   */
  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await TransactionService.getUserTransactions();
      setTransactions(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải giao dịch';
      setError(errorMessage);
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch transactions by date range
   */
  const fetchTransactionsByDateRange = useCallback(async (startDate: string, endDate: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await TransactionService.getTransactionsByDateRange(startDate, endDate);
      setTransactions(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải giao dịch theo ngày';
      setError(errorMessage);
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create new transaction
   */
  const createTransaction = useCallback(async (transactionData: CreateTransactionRequest) => {
    try {
      setLoading(true);
      const newTransaction = await TransactionService.createTransaction(transactionData);
      setTransactions(prev => [newTransaction, ...prev]);
      message.success('Tạo giao dịch thành công');
      return newTransaction;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Không thể tạo giao dịch';
      message.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update transaction
   */
  const updateTransaction = useCallback(async (id: number, transactionData: CreateTransactionRequest) => {
    try {
      setLoading(true);
      const updatedTransaction = await TransactionService.updateTransaction(id, transactionData);
      setTransactions(prev =>
        prev.map(t => t.id === id ? updatedTransaction : t)
      );
      message.success('Cập nhật giao dịch thành công');
      return updatedTransaction;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Không thể cập nhật giao dịch';
      message.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Delete transaction
   */
  const deleteTransaction = useCallback(async (id: number) => {
    try {
      setLoading(true);
      await TransactionService.deleteTransaction(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
      message.success('Xóa giao dịch thành công');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Không thể xóa giao dịch';
      message.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get transaction by stock ID
   */
  const getTransactionsByStock = useCallback(async (stockId: number) => {
    try {
      setLoading(true);
      const data = await TransactionService.getUserTransactionsByStock(stockId);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải giao dịch của cổ phiếu';
      message.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Filter transactions based on current filters
   */
  const filteredTransactions = useMemo(() => {
    let filtered = transactions.filter((transaction) => {
      // Search filter
      const matchesSearch = !filters.searchText ||
        transaction.companyName?.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        transaction.symbol?.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        transaction.id.toString().includes(filters.searchText.toLowerCase());

      // Status filter
      const matchesStatus = filters.status === 'all' ||
        (transaction.status || 'Completed') === filters.status;

      // Type filter
      const matchesType = filters.type === 'all' ||
        TRANSACTION_TYPE_DISPLAY[transaction.transactionType] === filters.type;

      return matchesSearch && matchesStatus && matchesType;
    });

    // Apply date range filter if specified and not using API date range
    if (filters.dateRange && filters.dateRange.length === 2) {
      const [startDate, endDate] = filters.dateRange;
      filtered = filtered.filter(transaction => {
        const transactionDate = new Date(transaction.transactionDate);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return transactionDate >= start && transactionDate <= end;
      });
    }

    return filtered;
  }, [transactions, filters]);

  /**
   * Calculate transaction summary with enhanced metrics
   */
  const transactionSummary = useMemo((): TransactionSummary => {
    const filtered = filteredTransactions;

    const summary = filtered.reduce((acc, tx) => {
      // Tổng volume (giá trị giao dịch)
      acc.totalVolume += tx.totalAmount || (tx.quantity * tx.price);

      // Tổng phí hoa hồng
      acc.totalCommission += tx.commission || 0;

      // Tổng phí khác (backward compatibility)
      acc.totalFees += tx.fees || 0;

      // Đếm số lượng theo status
      const status = tx.status || 'Completed';
      if (status === 'Completed') acc.completedCount++;
      else if (status === 'Pending') acc.pendingCount++;
      else if (status === 'Failed') acc.failedCount++;

      return acc;
    }, {
      totalVolume: 0,
      totalCommission: 0,
      totalFees: 0,
      completedCount: 0,
      pendingCount: 0,
      failedCount: 0,
    });

    return summary;
  }, [filteredTransactions]);

  /**
   * Get portfolio summary by transaction type
   */
  const portfolioSummary = useMemo(() => {
    const completed = filteredTransactions.filter(tx => (tx.status || 'Completed') === 'Completed');

    return completed.reduce((acc, tx) => {
      const type = TRANSACTION_TYPE_DISPLAY[tx.transactionType];

      if (!acc[type]) {
        acc[type] = {
          count: 0,
          totalVolume: 0,
          totalCommission: 0,
          totalQuantity: 0,
          avgPrice: 0,
        };
      }

      acc[type].count++;
      acc[type].totalVolume += tx.totalAmount || (tx.quantity * tx.price);
      acc[type].totalCommission += tx.commission || 0;
      acc[type].totalQuantity += tx.quantity;
      acc[type].avgPrice = acc[type].totalVolume / acc[type].totalQuantity;

      return acc;
    }, {} as Record<string, {
      count: number;
      totalVolume: number;
      totalCommission: number;
      totalQuantity: number;
      avgPrice: number;
    }>);
  }, [filteredTransactions]);

  /**
   * Get stock holdings summary
   */
  const stockHoldings = useMemo(() => {
    const holdings = new Map<number, {
      stockId: number;
      symbol?: string;
      companyName?: string;
      totalQuantity: number;
      totalBuyValue: number;
      totalSellValue: number;
      totalCommission: number;
      netQuantity: number;
      avgBuyPrice: number;
      totalTransactions: number;
    }>();

    filteredTransactions
      .filter(tx => (tx.status || 'Completed') === 'Completed')
      .forEach(tx => {
        const key = tx.stockId;
        const existing = holdings.get(key) || {
          stockId: tx.stockId,
          symbol: tx.symbol,
          companyName: tx.companyName,
          totalQuantity: 0,
          totalBuyValue: 0,
          totalSellValue: 0,
          totalCommission: 0,
          netQuantity: 0,
          avgBuyPrice: 0,
          totalTransactions: 0,
        };

        existing.totalTransactions++;
        existing.totalCommission += tx.commission || 0;

        if (tx.transactionType === 1) {
          existing.totalQuantity += tx.quantity;
          existing.totalBuyValue += tx.totalAmount || (tx.quantity * tx.price);
          existing.netQuantity += tx.quantity;
        } else if (tx.transactionType === 2) {
          existing.totalSellValue += tx.totalAmount || (tx.quantity * tx.price);
          existing.netQuantity -= tx.quantity;
        }

        if (existing.totalQuantity > 0) {
          existing.avgBuyPrice = existing.totalBuyValue / existing.totalQuantity;
        }

        holdings.set(key, existing);
      });

    return Array.from(holdings.values()).filter(holding => holding.netQuantity > 0);
  }, [filteredTransactions]);

  /**
   * Update filters
   */
  const updateFilters = useCallback((newFilters: Partial<TransactionFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  /**
   * Clear all filters
   */
  const clearFilters = useCallback(() => {
    setFilters({
      searchText: '',
      status: 'all',
      type: 'all',
      dateRange: null
    });
  }, []);

  /**
   * Handle date range filter
   */
  const handleDateRangeFilter = useCallback((dateRange: [string, string] | null) => {
    setFilters(prev => ({ ...prev, dateRange }));

    // If using API-based date filtering
    if (dateRange && dateRange.length === 2) {
      fetchTransactionsByDateRange(dateRange[0], dateRange[1]);
    } else {
      fetchTransactions();
    }
  }, [fetchTransactions, fetchTransactionsByDateRange]);

  /**
   * Get transactions for specific stock with calculations
   */
  const getStockTransactionSummary = useCallback((stockId: number) => {
    const stockTransactions = filteredTransactions.filter(tx => tx.stockId === stockId);

    return stockTransactions.reduce((acc, tx) => {
      acc.transactions.push(tx);

      if (tx.transactionType === 1) {
        acc.totalBought += tx.quantity;
        acc.totalBuyValue += tx.totalAmount || (tx.quantity * tx.price);
      } else if (tx.transactionType === 2) {
        acc.totalSold += tx.quantity;
        acc.totalSellValue += tx.totalAmount || (tx.quantity * tx.price);
      }

      acc.totalCommission += tx.commission || 0;
      acc.netQuantity = acc.totalBought - acc.totalSold;

      if (acc.totalBought > 0) {
        acc.avgBuyPrice = acc.totalBuyValue / acc.totalBought;
      }

      return acc;
    }, {
      transactions: [] as Transaction[],
      totalBought: 0,
      totalSold: 0,
      totalBuyValue: 0,
      totalSellValue: 0,
      totalCommission: 0,
      netQuantity: 0,
      avgBuyPrice: 0,
    });
  }, [filteredTransactions]);

  // Load initial data
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    // Data
    transactions: filteredTransactions,
    allTransactions: transactions,
    transactionSummary,
    portfolioSummary,
    stockHoldings,

    // State
    loading,
    error,
    filters,

    // Actions
    fetchTransactions,
    fetchTransactionsByDateRange,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionsByStock,

    // Filter actions
    updateFilters,
    clearFilters,
    handleDateRangeFilter,

    // Analytics
    getStockTransactionSummary,

    // Utilities
    refetch: fetchTransactions
  };
};