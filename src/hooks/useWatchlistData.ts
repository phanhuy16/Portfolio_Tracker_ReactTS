import { useState } from 'react';
import { WatchlistItem, WatchlistSummary } from '../Models/Watchlist';

export const useWatchlistData = () => {
  // Mock data - trong thực tế sẽ fetch từ API
  const [watchlistData] = useState<WatchlistItem[]>([
    {
      id: 1,
      stockId: 1,
      symbol: "AAPL",
      companyName: "Apple Inc",
      currentPrice: 182.52,
      targetPrice: 190.0,
      stopLoss: 170.0,
      priority: 3,
      alertTriggered: false,
      change: 1.25,
      changePercent: 0.69,
      volume: "52.3M",
      notes: "Waiting for earnings report",
      dateAdded: "2024-01-10",
      color: "#A6AAAE",
    },
    {
      id: 2,
      stockId: 2,
      symbol: "TSLA",
      companyName: "Tesla Inc",
      currentPrice: 248.5,
      targetPrice: 300.0,
      stopLoss: 220.0,
      priority: 5,
      alertTriggered: true,
      change: 8.75,
      changePercent: 3.65,
      volume: "32.1M",
      notes: "Strong momentum",
      dateAdded: "2024-01-08",
      color: "#CC0000",
    },
    {
      id: 3,
      stockId: 3,
      symbol: "NVDA",
      companyName: "NVIDIA Corp",
      currentPrice: 875.28,
      targetPrice: 900.0,
      stopLoss: 800.0,
      priority: 4,
      alertTriggered: true,
      change: 12.34,
      changePercent: 1.43,
      volume: "45.2M",
      notes: "AI sector leader",
      dateAdded: "2024-01-05",
      color: "#76B900",
    },
    {
      id: 4,
      stockId: 4,
      symbol: "META",
      companyName: "Meta Platforms Inc",
      currentPrice: 485.75,
      targetPrice: 520.0,
      stopLoss: 450.0,
      priority: 2,
      alertTriggered: false,
      change: -15.82,
      changePercent: -3.15,
      volume: "22.4M",
      notes: "Metaverse potential",
      dateAdded: "2024-01-03",
      color: "#4267B2",
    },
  ]);

  const [watchlistSummary] = useState<WatchlistSummary>({
    totalItems: 12,
    triggeredAlerts: 3,
    highPriority: 4,
    totalValue: 245670.5,
    todayChange: 2.34,
  });

  const triggeredAlerts = watchlistData.filter(item => item.alertTriggered);

  return {
    watchlistData,
    watchlistSummary,
    triggeredAlerts,
  };
};
