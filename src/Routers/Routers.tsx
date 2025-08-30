import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import PortfolioPage from "../Pages/PortfolioPage/PortfolioPage";
import AnalyticsPage from "../Pages/AnalyticsPage/AnalyticsPage";
import PublicLayout from "../Components/Layout/PublicLayout";
import MainLayout from "../Components/Layout/MainLayout";
import ForgotPasswordPage from "../Pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "../Pages/Auth/ResetPasswordPage";
import AssetsPage from "../Pages/AssetsPage/AssetsPage";
import TransactionsPage from "../Pages/TransactionsPage/TransactionsPage";
import SettingsPage from "../Pages/SettingsPage/SettingsPage";
import DashboardPage from "../Pages/DashboardPage/DashboardPage";
import StocksMarketPage from "../Pages/StocksMarketPage/StocksMarketPage";
import WatchlistPage from "../Pages/WatchlistPage/WatchlistPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Public routes với PublicLayout
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "/",
        element: <PublicLayout />,
        children: [
          {
            index: true,
            element: <HomePage />, // Trang home public
          },
        ],
      },

      // Protected routes với MainLayout (có sidebar)
      {
        path: "/portfolio",
        element: (
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <PortfolioPage />, // Dashboard chính
          },
          {
            path: "assets",
            element: <AssetsPage />,
          },
          {
            path: "transactions",
            element: <TransactionsPage />,
          },
          {
            path: "analytics",
            element: <AnalyticsPage />,
          },
          {
            path: "settings",
            element: <SettingsPage />,
          },
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "stocks",
            element: <StocksMarketPage />,
          },
          {
            path: "watchlist",
            element: <WatchlistPage />,
          },
        ],
      },
    ],
  },
]);
