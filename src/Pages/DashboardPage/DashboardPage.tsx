import React, { useState } from "react";
import { Col, Row } from "antd";
import {
  WalletOutlined,
  RiseOutlined,
  StockOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { DashboardHeader } from "./Components/DashboardHeader";
import { DashboardMetricCard } from "./Components/DashboardMetricCard";
import { PerformanceLineChart } from "./Components/PerformanceLineChart";
import { AllocationPieChart } from "./Components/AllocationPieChart";
import { RecentTransactionsTable } from "./Components/RecentTransactionsTable";
import { PerformanceLeaders } from "./Components/PerformanceLeaders";
import { MarketMoverCard } from "./Components/MarketMoverCard";

const DashboardPage = () => {
  const [performancePeriod, setPerformancePeriod] = useState(30);

  // Mock data (same as before)
  const portfolioSummary = {
    totalStocks: 8,
    totalInvestment: 125000.0,
    totalCurrentValue: 142750.5,
    totalProfitLoss: 17750.5,
    totalProfitLossPercentage: 14.2,
    topPerformers: [
      { symbol: "NVDA", profitLoss: 8500.25, profitLossPercentage: 24.3 },
      { symbol: "TSLA", profitLoss: 5200.75, profitLossPercentage: 18.7 },
      { symbol: "AAPL", profitLoss: 3800.0, profitLossPercentage: 12.5 },
    ],
    worstPerformers: [
      { symbol: "META", profitLoss: -1200.5, profitLossPercentage: -4.2 },
      { symbol: "NFLX", profitLoss: -800.25, profitLossPercentage: -2.8 },
    ],
  };

  const recentTransactions = [
    {
      id: "TXN-001",
      symbol: "BTC",
      type: "Buy",
      quantity: 0.5,
      price: 45000,
      transactionDate: "2024-01-15T10:30:00",
      totalAmount: 22500,
    },
    {
      id: "TXN-002",
      symbol: "AAPL",
      type: "Sell",
      quantity: 50,
      price: 180.25,
      transactionDate: "2024-01-14T14:15:00",
      totalAmount: 9012.5,
    },
    {
      id: "TXN-003",
      symbol: "ETH",
      type: "Buy",
      quantity: 2,
      price: 3100,
      transactionDate: "2024-01-13T09:45:00",
      totalAmount: 6200,
    },
    {
      id: "TXN-004",
      symbol: "TSLA",
      type: "Buy",
      quantity: 25,
      price: 235.8,
      transactionDate: "2024-01-12T16:20:00",
      totalAmount: 5895,
    },
    {
      id: "TXN-005",
      symbol: "NVDA",
      type: "Sell",
      quantity: 10,
      price: 875.28,
      transactionDate: "2024-01-11T11:10:00",
      totalAmount: 8752.8,
    },
  ];

  const userStats = {
    totalStocks: portfolioSummary.totalStocks,
    totalTransactions: 47,
    totalComments: 23,
    memberSince: "January 2023",
  };

  const portfolioAllocation = [
    {
      industry: "Technology",
      value: 85500,
      percentage: 59.9,
      stockCount: 4,
      color: "#3B82F6",
    },
    {
      industry: "Cryptocurrency",
      value: 35200,
      percentage: 24.7,
      stockCount: 2,
      color: "#F59E0B",
    },
    {
      industry: "Healthcare",
      value: 15750,
      percentage: 11.0,
      stockCount: 1,
      color: "#10B981",
    },
    {
      industry: "Finance",
      value: 6300,
      percentage: 4.4,
      stockCount: 1,
      color: "#8B5CF6",
    },
  ];

  const performanceData = [
    { date: "Jan 01", value: 120000, transactionCount: 2 },
    { date: "Jan 05", value: 125000, transactionCount: 3 },
    { date: "Jan 10", value: 128500, transactionCount: 1 },
    { date: "Jan 15", value: 135000, transactionCount: 4 },
    { date: "Jan 20", value: 138200, transactionCount: 2 },
    { date: "Jan 25", value: 141800, transactionCount: 3 },
    { date: "Jan 30", value: 142750, transactionCount: 1 },
  ];

  const marketMovers = {
    topMovers: [
      {
        symbol: "NVDA",
        companyName: "NVIDIA Corp",
        currentPrice: 875.28,
        change: 12.34,
        changePercentage: 1.43,
        volume: 850,
        industry: "Technology",
      },
      {
        symbol: "TSLA",
        companyName: "Tesla Inc",
        currentPrice: 248.5,
        change: 8.75,
        changePercentage: 3.65,
        volume: 1200,
        industry: "Automotive",
      },
    ],
    topLosers: [
      {
        symbol: "META",
        companyName: "Meta Platforms Inc",
        currentPrice: 485.75,
        change: -15.82,
        changePercentage: -3.15,
        volume: 650,
        industry: "Technology",
      },
      {
        symbol: "NFLX",
        companyName: "Netflix Inc",
        currentPrice: 425.3,
        change: -12.45,
        changePercentage: -2.84,
        volume: 450,
        industry: "Entertainment",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />

        {/* Key Performance Metrics */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} sm={12} lg={6}>
            <DashboardMetricCard
              title="Portfolio Value"
              value={portfolioSummary.totalCurrentValue}
              precision={2}
              prefix="$"
              icon={<WalletOutlined className="text-blue-600 text-xl" />}
              iconBgColor="bg-blue-100"
              tagColor="blue"
              tagText="Current"
              subtitle={`Investment: $${portfolioSummary.totalInvestment.toLocaleString()}`}
            />
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <DashboardMetricCard
              title="Total Profit/Loss"
              value={portfolioSummary.totalProfitLoss}
              precision={2}
              prefix="$"
              icon={<RiseOutlined className="text-green-600 text-xl" />}
              iconBgColor="bg-green-100"
              tagColor="green"
              tagText={`+${portfolioSummary.totalProfitLossPercentage.toFixed(
                1
              )}%`}
              subtitle={`Return: ${portfolioSummary.totalProfitLossPercentage.toFixed(
                2
              )}%`}
              valueColor={
                portfolioSummary.totalProfitLoss >= 0 ? "#059669" : "#dc2626"
              }
            />
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <DashboardMetricCard
              title="Total Stocks"
              value={userStats.totalStocks}
              icon={<StockOutlined className="text-purple-600 text-xl" />}
              iconBgColor="bg-purple-100"
              tagColor="purple"
              tagText="Assets"
              subtitle={`Transactions: ${userStats.totalTransactions}`}
            />
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <DashboardMetricCard
              title="Comments"
              value={userStats.totalComments}
              icon={<CommentOutlined className="text-yellow-600 text-xl" />}
              iconBgColor="bg-yellow-100"
              tagColor="gold"
              tagText="Activity"
              subtitle={`Member since: ${userStats.memberSince}`}
            />
          </Col>
        </Row>

        {/* Charts Row */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} lg={16}>
            <PerformanceLineChart
              data={performanceData}
              performancePeriod={performancePeriod}
              onPerformancePeriodChange={setPerformancePeriod}
            />
          </Col>

          <Col xs={24} lg={8}>
            <AllocationPieChart data={portfolioAllocation} />
          </Col>
        </Row>

        {/* Recent Activity and Performance */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} lg={12}>
            <RecentTransactionsTable transactions={recentTransactions} />
          </Col>

          <Col xs={24} lg={12}>
            <PerformanceLeaders
              topPerformers={portfolioSummary.topPerformers}
              worstPerformers={portfolioSummary.worstPerformers}
            />
          </Col>
        </Row>

        {/* Market Movers */}
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <MarketMoverCard
              title="Your Top Movers (Today)"
              stocks={marketMovers.topMovers}
              isPositive={true}
            />
          </Col>

          <Col xs={24} lg={12}>
            <MarketMoverCard
              title="Your Declining Holdings"
              stocks={marketMovers.topLosers}
              isPositive={false}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DashboardPage;
