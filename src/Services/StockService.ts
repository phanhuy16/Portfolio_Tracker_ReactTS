// src/Services/StockService.ts
import { get, post } from './ApiService';
import { BulkHistoricalRequest, HistoricalPrice, QueryParams, RealtimePrice, Stock, StockSummary } from '../Models/Stock';

export class StockService {
  // Get all stocks with optional filtering and pagination
  static async getAllStocks(params?: QueryParams): Promise<Stock[]> {
    const queryString = new URLSearchParams();

    if (params?.searchTerm) queryString.append('searchTerm', params.searchTerm);
    if (params?.industry) queryString.append('industry', params.industry);
    if (params?.SortBy) queryString.append('SortBy', params.SortBy);
    if (params?.IsDescending) queryString.append('IsDescending', params.IsDescending.toString());
    if (params?.PageNumber) queryString.append('PageNumber', params.PageNumber.toString());
    if (params?.PageSize) queryString.append('PageSize', params.PageSize.toString());

    const url = `/stock/get-all${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    return await get<Stock[]>(url);
  }

  // Get stocks by industry
  static async getStocksByIndustry(industry: string): Promise<Stock[]> {
    return await get<Stock[]>(`/stock/get-all?industry=${encodeURIComponent(industry)}`);
  }

  // Get single stock by ID
  static async getStockById(id: number): Promise<Stock> {
    return await get<Stock>(`/stock/get-by-id/${id}`);
  }

  // Get single stock by symbol
  static async getStockBySymbol(symbol: string): Promise<Stock> {
    return await get<Stock>(`/stock/symbol/${symbol}`);
  }

  // Get stocks summary (lightweight version)
  static async getStocksSummary(params?: QueryParams): Promise<StockSummary[]> {
    const queryString = new URLSearchParams();

    if (params?.searchTerm) queryString.append('searchTerm', params.searchTerm);
    if (params?.SortBy) queryString.append('SortBy', params.SortBy);
    if (params?.IsDescending) queryString.append('IsDescending', params.IsDescending.toString());
    if (params?.PageNumber) queryString.append('PageNumber', params.PageNumber.toString());
    if (params?.PageSize) queryString.append('PageSize', params.PageSize.toString());

    const url = `/stock/summary${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    return await get<StockSummary[]>(url);
  }

  // Get top gainers
  static async getTopGainers(count: number = 10): Promise<StockSummary[]> {
    return await get<StockSummary[]>(`/stock/top-gainers?count=${count}`);
  }

  // Get top losers  
  static async getTopLosers(count: number = 10): Promise<StockSummary[]> {
    return await get<StockSummary[]>(`/stock/top-losers?count=${count}`);
  }

  // Get most active stocks
  static async getMostActive(count: number = 10): Promise<StockSummary[]> {
    return await get<StockSummary[]>(`/stock/most-active?count=${count}`);
  }

  // Get realtime summary for a stock
  static async getRealtimeSummary(symbol: string): Promise<any> {
    return await get(`/stock/${symbol}/realtime-summary`);
  }

  // Get current price for a stock
  static async getCurrentPrice(symbol: string): Promise<RealtimePrice> {
    return await get<RealtimePrice>(`/stock/${symbol}/current-price`);
  }

  // Get historical prices
  static async getHistoricalPrices(stockId: number, days: number = 30): Promise<HistoricalPrice[]> {
    return await get<HistoricalPrice[]>(`/stock/${stockId}/historical/${days}`);
  }

  // Batch update prices for multiple stocks
  static async batchUpdatePrices(symbols: string[]): Promise<any> {
    return await post('/stock/batch-update-prices', symbols);
  }

  // Update all realtime prices
  static async updateAllRealtimePrices(): Promise<string> {
    return await post('/stock/update-all-realtime', {});
  }

  // Update all daily OHLCV data
  static async updateAllDailyOHLCV(): Promise<string> {
    return await post('/stock/update-all-ohlcv', {});
  }

  // Bulk update historical data
  static async bulkUpdateHistoricalData(request: BulkHistoricalRequest): Promise<string> {
    return await post('/stock/bulk-historical', request);
  }

  // Update realtime data for single stock
  static async updateRealtimeData(symbol: string): Promise<any> {
    return await post(`/stock/${symbol}/update-realtime`, {});
  }

  // Utility methods
  static formatMarketCap(marketCap: number): string {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap.toLocaleString()}`;
  }

  static formatVolume(volume: number): string {
    if (volume >= 1e9) return `${(volume / 1e9).toFixed(1)}B`;
    if (volume >= 1e6) return `${(volume / 1e6).toFixed(1)}M`;
    if (volume >= 1e3) return `${(volume / 1e3).toFixed(1)}K`;
    return volume.toLocaleString();
  }

  static calculateChangePercent(currentPrice: number, previousClose: number): number {
    return ((currentPrice - previousClose) / previousClose) * 100;
  }
}