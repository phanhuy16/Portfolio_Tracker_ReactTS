import { useEffect, useCallback } from "react";
import { refreshTokenAPI } from "../Services/AuthService";
import { useAuth } from "../Context/useAuth";

export const useTokenRefresh = () => {
  const { updateTokens, logout, token, refreshToken } = useAuth();

  const refreshAccessToken = useCallback(async () => {
    const storedRefreshToken = refreshToken || localStorage.getItem("refreshToken");

    if (!storedRefreshToken) {
      logout();
      return false;
    }

    try {
      const response = await refreshTokenAPI(storedRefreshToken);

      if (response?.data) {
        const { accessToken, refreshToken: newRefreshToken, username, email } = response.data;

        // Update localStorage
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        const userData = username && email ? { username, email } : undefined;
        if (userData) {
          localStorage.setItem("user", JSON.stringify(userData));
        }

        // Update context
        updateTokens(accessToken, newRefreshToken, userData);

        return true;
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
      logout();
      return false;
    }

    return false;
  }, [refreshToken, updateTokens, logout]);

  const checkTokenExpiry = useCallback(async () => {
    const currentToken = token || localStorage.getItem("token");
    if (!currentToken) {
      console.log("No token found");
      return;
    }

    try {
      // Decode JWT token để kiểm tra thời gian hết hạn
      const payload = JSON.parse(atob(currentToken.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      const timeUntilExpiry = payload.exp - currentTime;

      // Nếu token đã hết hạn hoặc sắp hết hạn trong vòng 30 giây
      if (timeUntilExpiry <= 30) {
        await refreshAccessToken();
      } else if (timeUntilExpiry <= 0) {
        await refreshAccessToken();
      }
    } catch (error) {
      console.error('Error checking token expiry:', error);
      await refreshAccessToken();
    }
  }, [token, refreshAccessToken]);

  useEffect(() => {
    // Chỉ chạy nếu có token
    if (!token && !localStorage.getItem("token")) {
      return;
    }

    // Kiểm tra ngay lập tức khi component mount
    checkTokenExpiry();

    // Thiết lập interval để kiểm tra mỗi 30 giây
    const interval = setInterval(checkTokenExpiry, 30 * 1000);

    return () => clearInterval(interval);
  }, [checkTokenExpiry, token]);

  // Return function để có thể gọi manual refresh
  return {
    refreshToken: refreshAccessToken,
    checkExpiry: checkTokenExpiry
  };
};