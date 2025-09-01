import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { UserProvider } from "./Context/useAuth";
import { Outlet } from "react-router-dom";
import { useTokenRefresh } from "./hooks/useTokenRefresh";
import React from "react";

// Component wrapper để sử dụng hook bên trong UserProvider
const TokenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Sử dụng hook để tự động refresh token
  useTokenRefresh();
  return <>{children}</>;
};

function App() {
  return (
    <UserProvider>
      <TokenProvider>
        <Outlet />
        <ToastContainer />
      </TokenProvider>
    </UserProvider>
  );
}

export default App;
