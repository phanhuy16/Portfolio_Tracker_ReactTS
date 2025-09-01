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

    // Check if it's a 401 error and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("401 Error detected, attempting token refresh...");

      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
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
        console.log("No refresh token found, redirecting to login");
        // Clear everything and redirect to login
        localStorage.clear();
        window.location.href = "/login";
        processQueue(error, null);
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        console.log("Attempting to refresh token with:", refreshToken);

        // Create a new axios instance without interceptors to avoid infinite loop
        const refreshAxios = axios.create();
        const response = await refreshAxios.post<UserProfileToken>(
          api + "/account/refresh-token",
          { refreshToken: refreshToken }  // Make sure key matches backend
        );

        console.log("Token refresh successful:", response.data);

        const { accessToken: newToken, refreshToken: newRefreshToken } = response.data;

        // Update tokens in localStorage
        localStorage.setItem("token", newToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // Update user info if available
        if (response.data.username && response.data.email) {
          const userData = {
            username: response.data.username,
            email: response.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userData));
        }

        // Update axios default header
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

        // Update UserContext if available
        if ((window as any).updateUserTokens) {
          const userData = response.data.username && response.data.email ? {
            username: response.data.username,
            email: response.data.email,
          } : undefined;
          (window as any).updateUserTokens(newToken, newRefreshToken, userData);
        }

        // Process queued requests
        processQueue(null, newToken);

        // Retry original request with new token
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axios(originalRequest);

      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        processQueue(refreshError, null);

        // Refresh failed, clear everything and redirect to login
        localStorage.clear();
        delete axios.defaults.headers.common["Authorization"];

        // Update UserContext to clear state
        if ((window as any).updateUserTokens) {
          (window as any).updateUserTokens("", "", null);
        }

        window.location.href = "/login";
        return Promise.reject(refreshError);
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
    const data = await refreshAxios.post<UserProfileToken>(api + "/account/refresh-token", {
      refreshToken: refreshToken
    });
    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
}

export const revokeTokenAPI = async (token: string) => {
  try {
    const data = await axios.post(api + "/account/revoke-token", {
      refreshToken: token  // Changed from 'token' to 'refreshToken' to match backend
    });
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