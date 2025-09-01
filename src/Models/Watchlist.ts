export interface WatchlistItem {
  id: number;
  stockId: number;
  symbol: string;
  companyName: string;
  currentPrice: number;
  targetPrice: number;
  stopLoss: number;
  priority: number;
  alertTriggered: boolean;
  change: number;
  changePercent: number;
  volume: string;
  notes: string;
  dateAdded: string;
  color: string;
}

export interface WatchlistSummary {
  totalItems: number;
  triggeredAlerts: number;
  highPriority: number;
  totalValue: number;
  todayChange: number;
}
