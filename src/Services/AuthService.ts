import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";

const api = "https://localhost:7007/api/client";

// Setup axios interceptor for automatic token refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });

  failedQueue = [];
};

// Request interceptor to add token to headers
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        // Redirect to login if no refresh token
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const refreshAxios = axios.create();
        const response = await refreshAxios.post<UserProfileToken>(
          api + "/account/refresh-token", { refreshToken }
        );

        const { accessToken: newToken, refreshToken: newRefreshToken } = response.data;


        // Cập nhật tokens
        localStorage.setItem("token", newToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // Cập nhật user info nếu có
        const userData = {
          username: response.data.username,
          email: response.data.email,
        };
        localStorage.setItem("user", JSON.stringify(userData));

        // Cập nhật default header
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

        // Xử lý các request đang chờ
        processQueue(null, newToken);

        // Retry original request với token mới
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (error) {
        console.error("Token refresh failed:", error);
        processQueue(error, null);

        // Refresh failed, redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        // Clear axios default headers
        delete axios.defaults.headers.common["Authorization"];

        window.location.href = "/login";

        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "/account/login", {
      username: username,
      password: password,
    });

    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const registerAPI = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "/account/register", {
      email: email,
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const refreshTokenAPI = async (refreshToken: string) => {
  try {
    const refreshAxios = axios.create();
    const data = await refreshAxios.post<UserProfileToken>(api + "/account/refresh-token", { refreshToken });
    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
}

export const revokeTokenAPI = async (token: string) => {
  try {
    const data = await axios.post(api + "/account/revoke-token", { token });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const forgotPasswordAPI = async (email: string) => {
  try {
    const data = await axios.post(api + "/account/forgot-password", { email: email });
    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const resetPasswordAPI = async (email: string, token: string, newPassword: string) => {
  try {
    const data = await axios.post(api + "/account/reset-password", {
      email: email,
      token: token,
      newPassword: newPassword,
    });
    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
}