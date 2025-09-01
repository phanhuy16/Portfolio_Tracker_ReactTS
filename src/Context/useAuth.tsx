import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserProfile } from "../Models/User";
import { loginAPI, registerAPI, revokeTokenAPI } from "../Services/AuthService";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  refreshToken: string | null;
  registerUser: (
    email: string,
    username: string,
    password: string
  ) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: () => boolean;
  updateTokens: (
    newToken: string,
    newRefreshToken: string,
    userData?: UserProfile
  ) => void;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Function to update tokens from interceptor
  const updateTokens = (
    newToken: string,
    newRefreshToken: string,
    userData?: UserProfile
  ) => {
    setToken(newToken);
    setRefreshToken(newRefreshToken);

    if (userData) {
      setUser(userData);
    }
  };

  // Expose updateTokens function globally for interceptor to use
  useEffect(() => {
    (window as any).updateUserTokens = updateTokens;

    return () => {
      delete (window as any).updateUserTokens;
    };
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (storedUser && storedToken && storedRefreshToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setRefreshToken(storedRefreshToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    await registerAPI(email, username, password)
      .then((res) => {
        if (res) {
          // Store both token and refresh token
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);

          const userObj = {
            username: res?.data.username,
            email: res?.data.email,
          };

          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.accessToken!);
          setRefreshToken(res?.data.refreshToken!);
          setUser(userObj!);

          // Set default authorization header
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.accessToken}`;

          toast.success("Đăng ký thành công!");
          navigate("/");
        }
      })
      .catch((error: any) => {
        let errorMessage = "Đăng ký thất bại!";

        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response?.data?.errors) {
          // Handle validation errors
          const errors = Object.values(error.response.data.errors).flat();
          errorMessage = errors.join(", ");
        } else if (error.message) {
          errorMessage = error.message;
        }

        toast.warn(errorMessage);
        throw new Error(errorMessage);
      });
  };

  const loginUser = async (email: string, password: string) => {
    await loginAPI(email, password)
      .then((res) => {
        if (res) {
          console.log("Login successful, storing tokens:", {
            accessToken: res.data.accessToken.substring(0, 20) + "...",
            refreshToken: res.data.refreshToken.substring(0, 20) + "...",
          });

          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);

          const userObj = {
            username: res?.data.username,
            email: res?.data.email,
          };

          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.accessToken!);
          setRefreshToken(res?.data.refreshToken!);
          setUser(userObj!);

          // Set default authorization header
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.accessToken}`;

          toast.success("Login successful!");
          navigate("/");
        }
      })
      .catch((e) => {
        console.error("Login failed:", e);
        toast.error("Login failed!");
      });
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = async () => {
    console.log("Logging out user");

    // Revoke token before clearing
    if (refreshToken) {
      try {
        await revokeTokenAPI(refreshToken);
      } catch (error) {
        console.error("Error revoking token:", error);
      }
    }

    // Clear after revoking
    localStorage.clear(); // Use clear() instead of individual removes

    // Clear axios default headers
    delete axios.defaults.headers.common["Authorization"];

    setToken(null);
    setRefreshToken(null);
    setUser(null);

    navigate("/login");
    toast.info("Logged out successfully!");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        refreshToken,
        registerUser,
        loginUser,
        logout,
        isLoggedIn,
        updateTokens,
      }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
