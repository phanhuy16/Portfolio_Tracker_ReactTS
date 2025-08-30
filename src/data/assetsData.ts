// data/assetsData.ts
export interface Asset {
  key: string;
  name: string;
  symbol: string;
  type: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
  pnl: number;
  pnlValue: number;
  allocation: number;
  color: string;
  icon: string;
  marketCap: string;
  volume24h: string;
  risk: string;
  favorite: boolean;
}

export const mockAssetsData: Asset[] = [
  {
    key: "1",
    name: "Bitcoin",
    symbol: "BTC",
    type: "Crypto",
    quantity: 2.5,
    avgPrice: 42000,
    currentPrice: 45000,
    value: 112500,
    pnl: 7.14,
    pnlValue: 7500,
    allocation: 36.1,
    color: "#F7931A",
    icon: "₿",
    marketCap: "850B",
    volume24h: "12.5B",
    risk: "high",
    favorite: true,
  },
  {
    key: "2",
    name: "Apple Inc.",
    symbol: "AAPL",
    type: "Stock",
    quantity: 100,
    avgPrice: 175.5,
    currentPrice: 180.25,
    value: 18025,
    pnl: 2.71,
    pnlValue: 475,
    allocation: 14.4,
    color: "#A6AAAE",
    icon: "🍎",
    marketCap: "2.8T",
    volume24h: "45.2M",
    risk: "low",
    favorite: false,
  },
  {
    key: "3",
    name: "Ethereum",
    symbol: "ETH",
    type: "Crypto",
    quantity: 10,
    avgPrice: 3200,
    currentPrice: 3100,
    value: 31000,
    pnl: -3.13,
    pnlValue: -1000,
    allocation: 22.9,
    color: "#627EEA",
    icon: "Ξ",
    marketCap: "370B",
    volume24h: "8.2B",
    risk: "high",
    favorite: true,
  },
  {
    key: "4",
    name: "Tesla Inc.",
    symbol: "TSLA",
    type: "Stock",
    quantity: 50,
    avgPrice: 220.5,
    currentPrice: 235.8,
    value: 11790,
    pnl: 6.94,
    pnlValue: 765,
    allocation: 9.8,
    color: "#CC0000",
    icon: "🚗",
    marketCap: "750B",
    volume24h: "25.1M",
    risk: "medium",
    favorite: false,
  },
  {
    key: "5",
    name: "US Treasury Bond",
    symbol: "UST10Y",
    type: "Bond",
    quantity: 20,
    avgPrice: 950,
    currentPrice: 965,
    value: 19300,
    pnl: 1.58,
    pnlValue: 300,
    allocation: 7.5,
    color: "#10B981",
    icon: "🏛️",
    marketCap: "23T",
    volume24h: "150M",
    risk: "low",
    favorite: false,
  },
];

// Helper functions
export const filterAssets = (
  assets: Asset[],
  searchText: string,
  filterType: string
): Asset[] => {
  return assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchText.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchText.toLowerCase());
    const matchesType =
      filterType === "all" || asset.type.toLowerCase() === filterType;
    return matchesSearch && matchesType;
  });
};

export const calculateSummary = (assets: Asset[]) => {
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalPnL = assets.reduce((sum, asset) => sum + asset.pnlValue, 0);
  const avgPnL = totalValue > 0 ? (totalPnL / totalValue) * 100 : 0;

  return {
    totalValue,
    totalPnL,
    avgPnL,
  };
};