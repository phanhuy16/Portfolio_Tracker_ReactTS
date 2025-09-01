import React, { useState } from "react";
import { Col, Row, Modal } from "antd";
import {
  WalletOutlined,
  RiseOutlined,
  ArrowDownOutlined,
  PieChartOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { PortfolioHeader } from "../../Components/Portfolio/PortfolioHeader";
import { PortfolioSummaryCard } from "../../Components/Portfolio/PortfolioSummaryCard";
import { TopPerformersCard } from "../../Components/Portfolio/TopPerformersCard";
import { HoldingsTable } from "../../Components/Portfolio/HoldingsTable";
import { PortfolioActionsCard } from "../../Components/Portfolio/PortfolioActionsCard";

const PortfolioPage = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [recalculating, setRecalculating] = useState(false);

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
    ],
  };

  const portfolioHoldings = [
    {
      id: 1,
      stockId: 1,
      stock: {
        symbol: "AAPL",
        companyName: "Apple Inc",
        industry: "Technology",
      },
      quantity: 100,
      averageCostBasis: 175.5,
      currentPrice: 182.52,
      currentValue: 18252.0,
      totalInvestment: 17550.0,
      profitLoss: 702.0,
      profitLossPercentage: 4.0,
      lastUpdated: "2024-01-15T10:30:00Z",
    },
    {
      id: 2,
      stockId: 2,
      stock: {
        symbol: "TSLA",
        companyName: "Tesla Inc",
        industry: "Automotive",
      },
      quantity: 50,
      averageCostBasis: 220.5,
      currentPrice: 248.5,
      currentValue: 12425.0,
      totalInvestment: 11025.0,
      profitLoss: 1400.0,
      profitLossPercentage: 12.7,
      lastUpdated: "2024-01-15T10:30:00Z",
    },
    {
      id: 3,
      stockId: 3,
      stock: {
        symbol: "NVDA",
        companyName: "NVIDIA Corp",
        industry: "Technology",
      },
      quantity: 25,
      averageCostBasis: 750.0,
      currentPrice: 875.28,
      currentValue: 21882.0,
      totalInvestment: 18750.0,
      profitLoss: 3132.0,
      profitLossPercentage: 16.7,
      lastUpdated: "2024-01-15T10:30:00Z",
    },
    {
      id: 4,
      stockId: 4,
      stock: {
        symbol: "META",
        companyName: "Meta Platforms Inc",
        industry: "Technology",
      },
      quantity: 30,
      averageCostBasis: 520.0,
      currentPrice: 485.75,
      currentValue: 14572.5,
      totalInvestment: 15600.0,
      profitLoss: -1027.5,
      profitLossPercentage: -6.58,
      lastUpdated: "2024-01-15T10:30:00Z",
    },
    {
      id: 5,
      stockId: 5,
      stock: {
        symbol: "BTC",
        companyName: "Bitcoin",
        industry: "Cryptocurrency",
      },
      quantity: 2.5,
      averageCostBasis: 42000.0,
      currentPrice: 45000.0,
      currentValue: 112500.0,
      totalInvestment: 105000.0,
      profitLoss: 7500.0,
      profitLossPercentage: 7.14,
      lastUpdated: "2024-01-15T10:30:00Z",
    },
  ];

  const handleRefreshPrices = async () => {
    setRefreshing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Portfolio prices refreshed");
    } finally {
      setRefreshing(false);
    }
  };

  const handleRecalculate = async () => {
    setRecalculating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Portfolio recalculated");
    } finally {
      setRecalculating(false);
    }
  };

  const handleDeleteHolding = (stockId: number) => {
    Modal.confirm({
      title: "Delete Portfolio Holding",
      content:
        "Are you sure you want to delete this holding? This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      onOk() {
        console.log("Delete holding:", stockId);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <PortfolioHeader
          onRefreshPrices={handleRefreshPrices}
          onRecalculate={handleRecalculate}
          refreshing={refreshing}
          recalculating={recalculating}
        />

        {/* Portfolio Summary */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} sm={12} lg={6}>
            <PortfolioSummaryCard
              title="Portfolio Value"
              value={portfolioSummary.totalCurrentValue}
              precision={2}
              prefix="$"
              icon={<WalletOutlined className="text-blue-600 text-xl" />}
              iconBgColor="bg-blue-100"
              tagColor="blue"
              tagText="Current Value"
              subtitle={`Total Investment: $${portfolioSummary.totalInvestment.toLocaleString()}`}
            />
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <PortfolioSummaryCard
              title="Total P&L"
              value={Math.abs(portfolioSummary.totalProfitLoss)}
              precision={2}
              prefix={portfolioSummary.totalProfitLoss >= 0 ? "+$" : "-$"}
              icon={
                portfolioSummary.totalProfitLoss >= 0 ? (
                  <RiseOutlined className="text-green-600 text-xl" />
                ) : (
                  <ArrowDownOutlined className="text-red-600 text-xl" />
                )
              }
              iconBgColor={
                portfolioSummary.totalProfitLoss >= 0
                  ? "bg-green-100"
                  : "bg-red-100"
              }
              tagColor={portfolioSummary.totalProfitLoss >= 0 ? "green" : "red"}
              tagText={`${
                portfolioSummary.totalProfitLoss >= 0 ? "+" : ""
              }${portfolioSummary.totalProfitLossPercentage.toFixed(2)}%`}
              subtitle={`Return: ${portfolioSummary.totalProfitLossPercentage.toFixed(
                2
              )}%`}
              valueColor={
                portfolioSummary.totalProfitLoss >= 0 ? "#059669" : "#dc2626"
              }
            />
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <PortfolioSummaryCard
              title="Total Assets"
              value={portfolioSummary.totalStocks}
              icon={<PieChartOutlined className="text-purple-600 text-xl" />}
              iconBgColor="bg-purple-100"
              tagColor="purple"
              tagText="Holdings"
              subtitle="Diversified Portfolio"
            />
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <PortfolioSummaryCard
              title="Avg. Return"
              value={portfolioSummary.totalProfitLossPercentage}
              precision={2}
              suffix="%"
              icon={
                <DollarCircleOutlined className="text-yellow-600 text-xl" />
              }
              iconBgColor="bg-yellow-100"
              tagColor="gold"
              tagText="Average"
              subtitle="Portfolio Performance"
              valueColor={
                portfolioSummary.totalProfitLossPercentage >= 0
                  ? "#059669"
                  : "#dc2626"
              }
            />
          </Col>
        </Row>

        {/* Holdings Table */}
        <HoldingsTable
          holdings={portfolioHoldings}
          onDeleteHolding={handleDeleteHolding}
          refreshing={refreshing}
        />

        {/* Performance Summary */}
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <TopPerformersCard performers={portfolioSummary.topPerformers} />
          </Col>

          <Col xs={24} lg={12}>
            <PortfolioActionsCard
              totalProfitLossPercentage={
                portfolioSummary.totalProfitLossPercentage
              }
              worstPerformersCount={portfolioSummary.worstPerformers.length}
              onRefreshPrices={handleRefreshPrices}
              onRecalculate={handleRecalculate}
              refreshing={refreshing}
              recalculating={recalculating}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PortfolioPage;
