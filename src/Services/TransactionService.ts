// src/services/TransactionService.ts
import { CreateTransactionRequest, Transaction } from '../Models/Transaction';
import { get, post, put, deleted } from './ApiService';

export class TransactionService {
  private static readonly BASE_PATH = '/transaction';

  /**
   * Lấy tất cả transactions của user hiện tại
   */
  static async getUserTransactions(): Promise<Transaction[]> {
    try {
      return await get<Transaction[]>(`${this.BASE_PATH}/user`);
    } catch (error) {
      console.error('Failed to fetch user transactions:', error);
      throw new Error('Không thể tải danh sách giao dịch');
    }
  }

  /**
   * Lấy transaction theo ID
   */
  static async getTransactionById(id: number): Promise<Transaction> {
    try {
      return await get<Transaction>(`${this.BASE_PATH}/get-by-id/${id}`);
    } catch (error) {
      console.error(`Failed to fetch transaction ${id}:`, error);
      throw new Error('Không thể tải thông tin giao dịch');
    }
  }

  /**
   * Lấy transactions theo stockId của user
   */
  static async getUserTransactionsByStock(stockId: number): Promise<Transaction[]> {
    try {
      return await get<Transaction[]>(`${this.BASE_PATH}/user/stock/${stockId}`);
    } catch (error) {
      console.error(`Failed to fetch transactions for stock ${stockId}:`, error);
      throw new Error('Không thể tải giao dịch của cổ phiếu này');
    }
  }

  /**
   * Lấy transactions trong khoảng thời gian
   */
  static async getTransactionsByDateRange(startDate: string, endDate: string): Promise<Transaction[]> {
    try {
      return await get<Transaction[]>(
        `${this.BASE_PATH}/date-range?startDate=${startDate}&endDate=${endDate}`
      );
    } catch (error) {
      console.error('Failed to fetch transactions by date range:', error);
      throw new Error('Không thể tải giao dịch trong khoảng thời gian này');
    }
  }

  /**
   * Tạo transaction mới
   */
  static async createTransaction(transaction: CreateTransactionRequest): Promise<Transaction> {
    try {
      return await post<Transaction>(`${this.BASE_PATH}/add-transaction`, transaction);
    } catch (error) {
      console.error('Failed to create transaction:', error);
      throw new Error('Không thể tạo giao dịch mới');
    }
  }

  /**
   * Cập nhật transaction
   */
  static async updateTransaction(id: number, transaction: CreateTransactionRequest): Promise<Transaction> {
    try {
      return await put<Transaction>(`${this.BASE_PATH}/update-transaction/${id}`, transaction);
    } catch (error) {
      console.error(`Failed to update transaction ${id}:`, error);
      throw new Error('Không thể cập nhật giao dịch');
    }
  }

  /**
   * Xóa transaction
   */
  static async deleteTransaction(id: number): Promise<void> {
    try {
      await deleted(`${this.BASE_PATH}/delete-transaction/${id}`);
    } catch (error) {
      console.error(`Failed to delete transaction ${id}:`, error);
      throw new Error('Không thể xóa giao dịch');
    }
  }
}