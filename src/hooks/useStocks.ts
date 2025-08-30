// hooks/useStocks.ts
import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import { StockService } from '../Services/StockService';
import { Stock } from '../Models/Stock';

interface UseStocksOptions {
  initialPageSize?: number;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

interface UseStocksReturn {
  // Data
  stocks: Stock[];
  topGainers: any[];
  topLosers: any[];
  marketSummary: MarketSummary;
  industries: string[];

  // Loading states
  stocksLoading: boolean;
  marketDataLoading: boolean;

  // Filters
  searchTerm: string;
  selectedIndustry: string;
  sortBy: string;

  // Actions
  setSearchTerm: (term: string) => void;
  setSelectedIndustry: (industry: string) => void;
  setSortBy: (sort: string) => void;
  refreshStocks: () => Promise<void>;
  refreshMarketData: () => Promise<void>;
  refreshAll: () => Promise<void>;

  // Selection
  selectedStockIds: number[];
  setSelectedStockIds: (ids: number[]) => void;
  selectedSymbols: string[];
}

interface MarketSummary {
  totalStocks: number;
  gainers: number;
  losers: number;
  unchanged: number;
  totalVolume: string;
  marketCap: string;
}

export const useStocks = (options: UseStocksOptions = {}): UseStocksReturn => {
  const {
    initialPageSize = 20,
    autoRefresh = false,
    refreshInterval = 30000, // 30 seconds
  } = options;

  // Data states
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [topGainers, setTopGainers] = useState<any[]>([]);
  const [topLosers, setTopLosers] = useState<any[]>([]);
  const [marketSummary, setMarketSummary] = useState<MarketSummary>({
    totalStocks: 0,
    gainers: 0,
    losers: 0,
    unchanged: 0,
    totalVolume: "0",
    marketCap: "0",
  });
  const [industries, setIndustries] = useState<string[]>([]);

  // Loading states
  const [stocksLoading, setStocksLoading] = useState(false);
  const [marketDataLoading, setMarketDataLoading] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [sortBy, setSortBy] = useState("marketCap");

  // Selection state
  const [selectedStockIds, setSelectedStockIds] = useState<number[]>([]);

  // Calculate selected symbols
  const selectedSymbols = stocks
    .filter(stock => selectedStockIds.includes(stock.id))
    .map(stock => stock.symbol);

  // Fetch stocks with current filters
  const fetchStocks = useCallback(async () => {
    setStocksLoading(true);
    try {
      const params = {
        searchTerm: searchTerm || undefined,
        industry: selectedIndustry || undefined,
        SortBy: sortBy,
        PageSize: initialPageSize,
        PageNumber: 1,
      };

      const response = await StockService.getAllStocks(params);
      setStocks(response);

      // Update industries list
      const uniqueIndustries = [...Array.from(new Set(response.map(stock => stock.industry).filter(Boolean)))];
      setIndustries(uniqueIndustries);

    } catch (error) {
      console.error("Error fetching stocks:", error);
      message.error("Failed to load stocks. Please try again!");
    } finally {
      setStocksLoading(false);
    }
  }, [searchTerm, selectedIndustry, sortBy, initialPageSize]);

  // Fetch market data (top gainers/losers)
  const fetchMarketData = useCallback(async () => {
    setMarketDataLoading(true);
    try {
      const [gainersData, losersData] = await Promise.all([
        StockService.getTopGainers(5),
        StockService.getTopLosers(5),
      ]);

      setTopGainers(gainersData);
      setTopLosers(losersData);

    } catch (error) {
      console.error("Error fetching market data:", error);
      message.error("Failed to load market data");
    } finally {
      setMarketDataLoading(false);
    }
  }, []);

  // Calculate market summary from current stocks
  const calculateMarketSummary = useCallback((stocksData: Stock[]) => {
    const gainers = stocksData.filter(stock => stock.change > 0).length;
    const losers = stocksData.filter(stock => stock.change < 0).length;
    const unchanged = stocksData.filter(stock => stock.change === 0).length;

    const totalVolume = stocksData.reduce((sum, stock) => sum + (stock.volume || 0), 0);
    const totalMarketCap = stocksData.reduce((sum, stock) => sum + (stock.marketCap || 0), 0);

    setMarketSummary({
      totalStocks: stocksData.length,
      gainers,
      losers,
      unchanged,
      totalVolume: StockService.formatVolume(totalVolume),
      marketCap: StockService.formatMarketCap(totalMarketCap),
    });
  }, []);

  // Public refresh methods
  const refreshStocks = useCallback(async () => {
    await fetchStocks();
  }, [fetchStocks]);

  const refreshMarketData = useCallback(async () => {
    await fetchMarketData();
  }, [fetchMarketData]);

  const refreshAll = useCallback(async () => {
    await Promise.all([fetchStocks(), fetchMarketData()]);
  }, [fetchStocks, fetchMarketData]);

  // Initial load
  useEffect(() => {
    refreshAll();
  }, []);

  // Debounced search effect
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchStocks();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, selectedIndustry, sortBy]);

  // Update market summary when stocks change
  useEffect(() => {
    if (stocks.length > 0) {
      calculateMarketSummary(stocks);
    }
  }, [stocks, calculateMarketSummary]);

  // Auto refresh effect
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      refreshAll();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, refreshAll]);

  return {
    // Data
    stocks,
    topGainers,
    topLosers,
    marketSummary,
    industries,

    // Loading states
    stocksLoading,
    marketDataLoading,

    // Filters
    searchTerm,
    selectedIndustry,
    sortBy,

    // Actions
    setSearchTerm,
    setSelectedIndustry,
    setSortBy,
    refreshStocks,
    refreshMarketData,
    refreshAll,

    // Selection
    selectedStockIds,
    setSelectedStockIds,
    selectedSymbols,
  };
};