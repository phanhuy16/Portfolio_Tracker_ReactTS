// src/types/Transaction.ts

export interface Transaction {
  id: number;
  stockId: number;
  symbol?: string;
  companyName?: string;
  // transactionType: "Buy" | "Sell" | "Dividend";
  transactionType: number;
  quantity: number;
  price: number;
  totalAmount: number;
  totalCost: number; // Tổng chi phí (totalAmount + commission cho Buy, totalAmount - commission cho Sell)
  transactionDate: string;
  userId: string;
  fees?: number;
  commission?: number;
  status?: "Completed" | "Pending" | "Failed";
  notes?: string;
}

export interface CreateTransactionRequest {
  stockId: number;
  // transactionType: "Buy" | "Sell" | "Dividend";
  transactionType: number;
  quantity: number;
  price: number;
  commission: number;
  transactionDate: string;
  notes?: string;
}

export interface UpdateTransactionRequest extends CreateTransactionRequest {
  id: number;
}

export interface TransactionFilters {
  searchText: string;
  status: string;
  type: string;
  dateRange: [string, string] | null;
}

export interface TransactionSummary {
  totalVolume: number;
  totalFees: number;
  totalCommission: number; // Tổng phí hoa hồng
  completedCount: number;
  pendingCount: number;
  failedCount: number;
}

// Utility functions cho tính toán phí
export const calculateTotalAmount = (quantity: number, price: number): number => {
  return quantity * price;
};

export const calculateTotalCost = (
  quantity: number,
  price: number,
  commission: number,
  // transactionType: "Buy" | "Sell" | "Dividend"
  transactionType: number
): number => {
  const totalAmount = calculateTotalAmount(quantity, price);

  switch (transactionType) {
    case 1: // Buy
      return totalAmount + commission;
    case 2: // Sell
      return totalAmount - commission;
    case 3: // Dividend
      return totalAmount;
    default:
      return totalAmount;
  }
};

// Tính phí hoa hồng theo tỷ lệ % (nếu cần)
export const calculateCommissionByPercentage = (
  totalAmount: number,
  commissionRate: number // VD: 0.15 cho 0.15%
): number => {
  return Math.round(totalAmount * (commissionRate / 100));
};

export const TRANSACTION_TYPE_MAP: { [key: string]: number } = {
  Buy: 1,
  Sell: 2,
  Dividend: 3,
};

// Reverse map for display
export const TRANSACTION_TYPE_DISPLAY: { [key: number]: string } = {
  1: "Mua",
  2: "Bán",
  3: "Cổ tức",
};


// Các mức phí hoa hồng thông dụng tại Việt Nam
export const COMMISSION_RATES = {
  VPS: 0.15, // 0.15%
  SSI: 0.15,
  VNDIRECT: 0.15,
  HSC: 0.18,
  TCBS: 0.15,
  MBS: 0.18,
} as const;