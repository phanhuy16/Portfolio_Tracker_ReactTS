import React, { useState } from "react";
import {
  Card,
  Col,
  Row,
  Statistic,
  Typography,
  Table,
  Tag,
  Progress,
  Select,
  Space,
  Button,
  Avatar,
} from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DollarCircleOutlined,
  PieChartOutlined,
  RiseOutlined,
  WalletOutlined,
  BankOutlined,
  FundOutlined,
  StockOutlined,
  CommentOutlined,
  TrophyOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

const { Title, Text } = Typography;
const { Option } = Select;

const DashboardPage = () => {
  const [performancePeriod, setPerformancePeriod] = useState(30);

  // Mock data from DashboardController.GetDashboardOverview
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

  // Mock data from DashboardController.GetPortfolioAllocation
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

  // Mock data from DashboardController.GetPerformanceChart
  const performanceData = [
    { date: "Jan 01", value: 120000, transactionCount: 2 },
    { date: "Jan 05", value: 125000, transactionCount: 3 },
    { date: "Jan 10", value: 128500, transactionCount: 1 },
    { date: "Jan 15", value: 135000, transactionCount: 4 },
    { date: "Jan 20", value: 138200, transactionCount: 2 },
    { date: "Jan 25", value: 141800, transactionCount: 3 },
    { date: "Jan 30", value: 142750, transactionCount: 1 },
  ];

  // Mock data from DashboardController.GetMarketMovers
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

  const transactionColumns = [
    {
      title: "Asset",
      key: "asset",
      render: (record: any) => (
        <div className="flex items-center space-x-2">
          <Avatar size={24} className="bg-blue-500">
            {record.symbol.charAt(0)}
          </Avatar>
          <span className="font-medium">{record.symbol}</span>
        </div>
      ),
    },
    {
      title: "Type",
      key: "type",
      render: (record: any) => (
        <Tag color={record.type === "Buy" ? "green" : "red"}>{record.type}</Tag>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      key: "price",
      render: (record: any) => `$${record.price.toLocaleString()}`,
    },
    {
      title: "Total",
      key: "total",
      render: (record: any) => (
        <span className="font-semibold">
          ${record.totalAmount.toLocaleString()}
        </span>
      ),
    },
  ];

  const performerColumns = [
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      render: (text: string) => (
        <span className="font-bold text-blue-600">{text}</span>
      ),
    },
    {
      title: "P&L",
      key: "pnl",
      render: (record: any) => (
        <div
          className={`font-semibold ${
            record.profitLoss >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {record.profitLoss >= 0 ? "+" : ""}$
          {Math.abs(record.profitLoss).toFixed(2)}
        </div>
      ),
    },
    {
      title: "Return",
      key: "return",
      render: (record: any) => (
        <div
          className={`flex items-center space-x-1 ${
            record.profitLossPercentage >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {record.profitLossPercentage >= 0 ? (
            <ArrowUpOutlined />
          ) : (
            <ArrowDownOutlined />
          )}
          <span className="font-medium">
            {Math.abs(record.profitLossPercentage).toFixed(1)}%
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Title level={2} className="!mb-2 text-gray-900">
            Portfolio Dashboard
          </Title>
          <Text className="text-gray-600 text-lg">
            Welcome back! Here's an overview of your investment portfolio
          </Text>
        </div>

        {/* Key Performance Metrics */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} sm={12} lg={6}>
            <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <WalletOutlined className="text-blue-600 text-xl" />
                </div>
                <Tag color="blue">Current</Tag>
              </div>
              <Statistic
                title="Portfolio Value"
                value={portfolioSummary.totalCurrentValue}
                precision={2}
                prefix="$"
                valueStyle={{
                  color: "#1f2937",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              />
              <Text className="text-gray-500">
                Investment: ${portfolioSummary.totalInvestment.toLocaleString()}
              </Text>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <RiseOutlined className="text-green-600 text-xl" />
                </div>
                <Tag color="green">
                  +{portfolioSummary.totalProfitLossPercentage.toFixed(1)}%
                </Tag>
              </div>
              <Statistic
                title="Total Profit/Loss"
                value={portfolioSummary.totalProfitLoss}
                precision={2}
                prefix="$"
                valueStyle={{
                  color:
                    portfolioSummary.totalProfitLoss >= 0
                      ? "#059669"
                      : "#dc2626",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              />
              <Text className="text-gray-500">
                Return: {portfolioSummary.totalProfitLossPercentage.toFixed(2)}%
              </Text>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <StockOutlined className="text-purple-600 text-xl" />
                </div>
                <Tag color="purple">Assets</Tag>
              </div>
              <Statistic
                title="Total Stocks"
                value={userStats.totalStocks}
                valueStyle={{
                  color: "#1f2937",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              />
              <Text className="text-gray-500">
                Transactions: {userStats.totalTransactions}
              </Text>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <CommentOutlined className="text-yellow-600 text-xl" />
                </div>
                <Tag color="gold">Activity</Tag>
              </div>
              <Statistic
                title="Comments"
                value={userStats.totalComments}
                valueStyle={{
                  color: "#1f2937",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              />
              <Text className="text-gray-500">
                Member since: {userStats.memberSince}
              </Text>
            </Card>
          </Col>
        </Row>

        {/* Charts Row */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} lg={16}>
            <Card
              title={
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">
                    Portfolio Performance
                  </span>
                  <Select
                    value={performancePeriod}
                    onChange={setPerformancePeriod}
                    size="small"
                  >
                    <Option value={7}>7 Days</Option>
                    <Option value={30}>30 Days</Option>
                    <Option value={90}>3 Months</Option>
                    <Option value={365}>1 Year</Option>
                  </Select>
                </div>
              }
              className="h-full border-0 shadow-md"
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#F9FAFB",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                    formatter={(value, name) => [
                      `${value.toLocaleString()}`,
                      "Portfolio Value",
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card
              title="Portfolio Allocation"
              className="h-full border-0 shadow-md"
            >
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={portfolioAllocation}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    paddingAngle={2}
                    dataKey="percentage"
                  >
                    {portfolioAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [
                      `${value.toFixed(1)}%`,
                      "Allocation",
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {portfolioAllocation.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-700">{item.industry}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">{item.percentage}%</span>
                      <div className="text-xs text-gray-500">
                        {item.stockCount} stocks
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>

        {/* Recent Activity and Performance */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} lg={12}>
            <Card
              title={
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">
                    Recent Transactions
                  </span>
                  <Button type="link" size="small">
                    View All
                  </Button>
                </div>
              }
              className="h-full border-0 shadow-md"
            >
              <Table
                columns={transactionColumns}
                dataSource={recentTransactions.slice(0, 5)}
                pagination={false}
                size="small"
                className="recent-transactions-table"
              />
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title="Performance Leaders"
              className="h-full border-0 shadow-md"
            >
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-3">
                  <TrophyOutlined className="text-green-600" />
                  <Text className="font-medium text-green-600">
                    Top Performers
                  </Text>
                </div>
                <Table
                  columns={performerColumns}
                  dataSource={portfolioSummary.topPerformers}
                  pagination={false}
                  size="small"
                  showHeader={false}
                />
              </div>

              {portfolioSummary.worstPerformers.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <ArrowDownOutlined className="text-red-600" />
                    <Text className="font-medium text-red-600">
                      Needs Attention
                    </Text>
                  </div>
                  <Table
                    columns={performerColumns}
                    dataSource={portfolioSummary.worstPerformers}
                    pagination={false}
                    size="small"
                    showHeader={false}
                  />
                </div>
              )}
            </Card>
          </Col>
        </Row>

        {/* Market Movers */}
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card
              title={
                <div className="flex items-center space-x-2">
                  <ArrowUpOutlined className="text-green-600" />
                  <span className="text-lg font-semibold text-gray-900">
                    Your Top Movers (Today)
                  </span>
                </div>
              }
              className="border-0 shadow-md"
            >
              <div className="space-y-4">
                {marketMovers.topMovers.map((stock, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-green-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="bg-green-100 text-green-600">
                        {stock.symbol.charAt(0)}
                      </Avatar>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {stock.symbol}
                        </div>
                        <div className="text-sm text-gray-500">
                          {stock.companyName}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">
                        ${stock.currentPrice.toFixed(2)}
                      </div>
                      <div className="text-green-600 font-medium">
                        +{stock.changePercentage.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title={
                <div className="flex items-center space-x-2">
                  <ArrowDownOutlined className="text-red-600" />
                  <span className="text-lg font-semibold text-gray-900">
                    Your Declining Holdings
                  </span>
                </div>
              }
              className="border-0 shadow-md"
            >
              <div className="space-y-4">
                {marketMovers.topLosers.map((stock, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-red-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="bg-red-100 text-red-600">
                        {stock.symbol.charAt(0)}
                      </Avatar>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {stock.symbol}
                        </div>
                        <div className="text-sm text-gray-500">
                          {stock.companyName}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">
                        ${stock.currentPrice.toFixed(2)}
                      </div>
                      <div className="text-red-600 font-medium">
                        {stock.changePercentage.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <style>{`
        .recent-transactions-table .ant-table-tbody > tr:hover > td {
          background-color: #f9fafb !important;
        }
        .recent-transactions-table .ant-table-thead > tr > th {
          background-color: #f8fafc;
          font-weight: 600;
          color: #374151;
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
