export interface Stock {
  id: number
  companyName: string
  symbol: string
  purchase: number
  currentPrice: number
  previousClose: number
  openPrice: number
  dayHigh: number
  dayLow: number
  change: number
  changePercent: number
  marketCap: number
  volume: number
  averageVolume: number
  lastDiv: number
  peRatio: number
  dividendYield: number
  eps: number
  beta: number
  industry: string
  sector: string
  country: string
  description: string
  website: string
  lastUpdated: string
  lastPriceUpdate: string
  marketStatus: string
  dayChangeValue: number
  dayChangePercent: number
  isGainer: boolean
  isLoser: boolean
  formattedMarketCap: string
  comments: any[]
}

export interface MarketSummary {
  totalStocks: number;
  gainers: number;
  losers: number;
  unchanged: number;
  totalVolume: string;
  marketCap: string;
}

export interface HistoricalPrice {
  date: string;
  price: number;
}


export interface QueryParams {
  searchTerm?: string;
  industry?: string;
  SortBy?: string;
  IsDescending?: boolean;
  PageNumber?: number;
  PageSize?: number;
}

export interface StockSummary {
  id: number;
  symbol: string;
  companyName: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  formattedMarketCap: string;
  isGainer: boolean;
  isLoser: boolean;
}

export interface HistoricalPrice {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface BulkHistoricalRequest {
  Symbols: string[];
  FromDate?: string;
  ToDate?: string;
}

export interface RealtimePrice {
  symbol: string;
  price: number;
  timestamp: string;
}

export interface UseStocksOptions {
  initialPageSize?: number;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export interface UseStocksReturn {
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
