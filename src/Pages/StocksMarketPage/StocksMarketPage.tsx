// StocksMarketPage.tsx - Final Version
import { Col, message, Row } from "antd";
import { useState } from "react";
import { BatchOperations } from "../../Components/Stocks/BatchOperations";
import { HeaderSection } from "../../Components/Stocks/HeaderSection";
import { MarketSummaryCard } from "../../Components/Stocks/MarketSummaryCard";
import { QuickTradeModal } from "../../Components/Stocks/QuickTradeModal";
import { SearchAndFilters } from "../../Components/Stocks/SearchAndFilters";
import { StockPriceChart } from "../../Components/Stocks/StockPriceChart";
import { StocksTable } from "../../Components/Stocks/StocksTable";
import { TopMoversTable } from "../../Components/Stocks/TopMoversTable";
import { Stock } from "../../Models/Stock";
import { StockService } from "../../Services/StockService";
import { useStocks } from "../../hooks/useStocks";

interface HistoricalPrice {
  date: string;
  price: number;
}

export const StocksMarketPage = () => {
  // Use custom hook for stocks management
  const {
    stocks,
    topGainers,
    topLosers,
    marketSummary,
    industries,
    stocksLoading,
    marketDataLoading,
    searchTerm,
    selectedIndustry,
    sortBy,
    setSearchTerm,
    setSelectedIndustry,
    setSortBy,
    refreshStocks,
    refreshAll,
    selectedStockIds,
    setSelectedStockIds,
    selectedSymbols,
  } = useStocks({
    initialPageSize: 20,
    autoRefresh: false, // Can be enabled for real-time updates
    refreshInterval: 30000,
  });

  // Local component state
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalPrice[]>([]);
  const [isTradeModalVisible, setIsTradeModalVisible] = useState(false);

  // Fetch historical data for selected stock
  const fetchHistoricalData = async (stockId: number) => {
    try {
      const response = await StockService.getHistoricalPrices(stockId, 30);
      const chartData = response.map((item) => ({
        date: item.date,
        price: item.close,
      }));
      setHistoricalData(chartData);
    } catch (error) {
      console.error("Error fetching historical data:", error);
      message.warning("Could not load historical data for this stock");
      setHistoricalData([]); // Set empty array as fallback
    }
  };

  // Event handlers
  const handleViewStock = async (stock: Stock) => {
    setSelectedStock(stock);
    if (stock.id) {
      await fetchHistoricalData(stock.id);
    }
  };

  const handleQuickTrade = (stock: Stock) => {
    setSelectedStock(stock);
    setIsTradeModalVisible(true);
  };

  const handleTradeSubmit = (tradeData: any) => {
    console.log("Trade order submitted:", {
      stock: selectedStock,
      ...tradeData,
    });
    message.success(`Trade order submitted for ${selectedStock?.symbol}`);
    setIsTradeModalVisible(false);
  };

  const handleUpdateRealtimePrice = async (symbol: string) => {
    try {
      await StockService.updateRealtimeData(symbol);
      message.success(`Updated realtime price for ${symbol}`);
      await refreshStocks();
    } catch (error) {
      console.error("Error updating realtime price:", error);
      message.error(`Failed to update price for ${symbol}`);
    }
  };

  const handleBatchRefresh = async () => {
    await refreshAll();
    message.success("Data refreshed successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <HeaderSection />

        {/* Market Summary */}
        <MarketSummaryCard {...marketSummary} />

        {/* Batch Operations */}
        <BatchOperations
          selectedSymbols={selectedSymbols}
          onRefreshData={handleBatchRefresh}
        />

        {/* Top Movers and Chart */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} lg={8}>
            <TopMoversTable title="Top Gainers" data={topGainers} />
          </Col>
          <Col xs={24} lg={8}>
            <TopMoversTable title="Top Losers" data={topLosers} />
          </Col>
          <Col xs={24} lg={8}>
            <StockPriceChart stock={selectedStock} data={historicalData} />
          </Col>
        </Row>

        {/* Search and Filters */}
        <SearchAndFilters
          searchTerm={searchTerm}
          selectedIndustry={selectedIndustry}
          sortBy={sortBy}
          industries={industries}
          onSearchChange={setSearchTerm}
          onIndustryChange={setSelectedIndustry}
          onSortChange={setSortBy}
        />

        {/* Stocks Table */}
        <StocksTable
          loading={stocksLoading}
          data={stocks}
          selectedRowKeys={selectedStockIds}
          onSelectionChange={setSelectedStockIds}
          onView={handleViewStock}
          onTrade={handleQuickTrade}
          onUpdatePrice={handleUpdateRealtimePrice}
        />

        {/* Quick Trade Modal */}
        <QuickTradeModal
          visible={isTradeModalVisible}
          symbol={selectedStock?.symbol ?? null}
          price={selectedStock?.currentPrice ?? null}
          onSubmit={handleTradeSubmit}
          onCancel={() => setIsTradeModalVisible(false)}
        />
      </div>

      {/* Custom Styles */}
      <style>{`
        .stocks-table .ant-table-tbody > tr:hover > td,
        .top-movers-table .ant-table-tbody > tr:hover > td {
          background-color: #f9fafb !important;
        }
        
        .stocks-table .ant-table-thead > tr > th,
        .top-movers-table .ant-table-thead > tr > th {
          background-color: #f8fafc;
          font-weight: 600;
          color: #374151;
        }
        
        .stocks-table .ant-table-row.bg-green-50 {
          background-color: #f0fdf4 !important;
        }
        
        .stocks-table .ant-table-row.bg-red-50 {
          background-color: #fef2f2 !important;
        }
        
        .stocks-table .ant-table-row-selected {
          background-color: #e6f3ff !important;
        }
        
        .batch-operations-card {
          border-left: 4px solid #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default StocksMarketPage;
