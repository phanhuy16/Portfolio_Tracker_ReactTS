import { useEffect } from "react"
import { refreshTokenAPI } from "../Services/AuthService";

export const useTokenRefresh = () => {
  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        // Decode JWT token to check expiry
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        // Check if token expires in next 5 minutes
        if (payload.exp < currentTime) {
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            refreshTokenAPI(refreshToken)
          }
        }
      } catch (error) {
        console.error('Error checking token expiry:', error);
      }
    };

    // Check token expiry every 15 minutes
    const interval = setInterval(checkTokenExpiry, 15 * 60 * 1000);

    // Check immediately
    checkTokenExpiry();

    return () => clearInterval(interval);

  }, []);
};