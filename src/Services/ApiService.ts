// src/Services/ApiService.ts
import axios, { AxiosRequestConfig } from 'axios';

// QUAN TRỌNG: SỬ DỤNG axios GLOBAL thay vì tạo instance mới
// Để tận dụng interceptors đã được setup trong AuthService.ts

const BASE_URL = 'https://localhost:7007/api/client';

// Cấu hình default cho axios global (nếu chưa có)
if (!axios.defaults.baseURL) {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.timeout = 10000;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
}

// Export các method chung để gọi API - SỬ DỤNG AXIOS GLOBAL
export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await axios.get<T>(url, config);
  return response.data;
};

export const post = async <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> => {
  const response = await axios.post<T>(url, data, config);
  return response.data;
};

export const put = async <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> => {
  const response = await axios.put<T>(url, data, config);
  return response.data;
};

export const deleted = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await axios.delete<T>(url, config);
  return response.data;
};

// Export axios global để có thể sử dụng trực tiếp nếu cần
export default axios;