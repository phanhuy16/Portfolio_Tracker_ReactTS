// src/Services/ApiService.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Config base
const BASE_URL = 'https://localhost:7007/api/client';

// Tạo instance Axios - SỬ DỤNG axios global instance để dùng chung interceptor
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// XÓA TẤT CẢ INTERCEPTOR - để AuthService.ts xử lý
// Không cần interceptor ở đây vì AuthService.ts đã có interceptor toàn cục

// Export các method chung để gọi API
export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.get<T>(url, config);
  return response.data;
};

export const post = async <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.post<T>(url, data, config);
  return response.data;
};

export const put = async <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.put<T>(url, data, config);
  return response.data;
};

export const del = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.delete<T>(url, config);
  return response.data;
};

export default apiClient;