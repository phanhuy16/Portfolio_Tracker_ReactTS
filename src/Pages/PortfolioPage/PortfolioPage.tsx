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
  Button,
  Space,
  Avatar,
  Tooltip,
  Modal,
  Alert,
  Spin,
} from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DollarCircleOutlined,
  PieChartOutlined,
  RiseOutlined,
  WalletOutlined,
  ReloadOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
  CalculatorOutlined,
  SyncOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const PortfolioPage = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [recalculating, setRecalculating] = useState(false);

  // Mock data from PortfolioController.GetPortfolioSummary
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

  // Mock data from PortfolioController.GetUserPortfolio
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
      // Call PortfolioController.RefreshPortfolioPrices
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Portfolio prices refreshed");
    } finally {
      setRefreshing(false);
    }
  };

  const handleRecalculate = async () => {
    setRecalculating(true);
    try {
      // Call PortfolioController.RecalculatePortfolio
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
        // Call PortfolioController.DeletePortfolio
      },
    });
  };

  const columns = [
    {
      title: "Asset",
      key: "asset",
      width: 200,
      render: (record: any) => (
        <div className="flex items-center space-x-3">
          <Avatar size={40} className="bg-blue-500 text-white font-bold">
            {record.stock.symbol.charAt(0)}
          </Avatar>
          <div>
            <div className="font-semibold text-gray-900 text-base">
              {record.stock.symbol}
            </div>
            <div className="text-sm text-gray-500">
              {record.stock.companyName}
            </div>
            <Tag color="blue">{record.stock.industry}</Tag>
          </div>
        </div>
      ),
    },
    {
      title: "Holdings",
      key: "holdings",
      width: 150,
      render: (record: any) => (
        <div>
          <div className="font-semibold text-gray-900">
            {record.quantity} {record.stock.symbol === "BTC" ? "BTC" : "shares"}
          </div>
          <div className="text-sm text-gray-500">
            Avg Cost: ${record.averageCostBasis.toFixed(2)}
          </div>
        </div>
      ),
    },
    {
      title: "Current Price",
      key: "currentPrice",
      width: 130,
      render: (record: any) => (
        <div>
          <div className="font-bold text-gray-900">
            ${record.currentPrice.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">
            Last updated: {new Date(record.lastUpdated).toLocaleTimeString()}
          </div>
        </div>
      ),
    },
    {
      title: "Market Value",
      key: "marketValue",
      width: 150,
      render: (record: any) => (
        <div>
          <div className="font-bold text-gray-900 text-lg">
            ${record.currentValue.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">
            Cost: ${record.totalInvestment.toLocaleString()}
          </div>
        </div>
      ),
      sorter: (a: any, b: any) => a.currentValue - b.currentValue,
    },
    {
      title: "P&L",
      key: "pnl",
      width: 140,
      render: (record: any) => (
        <div className="text-center">
          <div
            className={`flex items-center justify-center space-x-1 font-bold ${
              record.profitLoss >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {record.profitLoss >= 0 ? <RiseOutlined /> : <ArrowDownOutlined />}
            <span>
              {record.profitLoss >= 0 ? "+" : ""}
              {record.profitLossPercentage.toFixed(2)}%
            </span>
          </div>
          <div
            className={`text-sm font-medium ${
              record.profitLoss >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {record.profitLoss >= 0 ? "+$" : "-$"}
            {Math.abs(record.profitLoss).toLocaleString()}
          </div>
        </div>
      ),
      sorter: (a: any, b: any) =>
        a.profitLossPercentage - b.profitLossPercentage,
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (record: any) => (
        <Space>
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              className="text-blue-600 hover:bg-blue-50"
            />
          </Tooltip>
          <Tooltip title="Trade">
            <Button
              type="text"
              icon={<ShoppingCartOutlined />}
              className="text-green-600 hover:bg-green-50"
            />
          </Tooltip>
          <Tooltip title="Remove Holding">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteHolding(record.stockId)}
              className="text-red-600 hover:bg-red-50"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Title level={2} className="!mb-2 text-gray-900">
              Portfolio Holdings
            </Title>
            <Text className="text-gray-600 text-lg">
              Manage and track your investment holdings in detail
            </Text>
          </div>
          <Space>
            <Button
              icon={<ReloadOutlined />}
              onClick={handleRefreshPrices}
              loading={refreshing}
              className="shadow-md"
            >
              Refresh Prices
            </Button>
            <Button
              icon={<CalculatorOutlined />}
              onClick={handleRecalculate}
              loading={recalculating}
              className="shadow-md"
            >
              Recalculate
            </Button>
          </Space>
        </div>

        {/* Portfolio Summary */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} sm={12} lg={6}>
            <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <WalletOutlined className="text-blue-600 text-xl" />
                </div>
                <Tag color="blue">Current Value</Tag>
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
              <div className="mt-2 p-2 bg-gray-50 rounded">
                <Text className="text-xs text-gray-600">
                  Total Investment: $
                  {portfolioSummary.totalInvestment.toLocaleString()}
                </Text>
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-lg ${
                    portfolioSummary.totalProfitLoss >= 0
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {portfolioSummary.totalProfitLoss >= 0 ? (
                    <RiseOutlined className="text-green-600 text-xl" />
                  ) : (
                    <ArrowDownOutlined className="text-red-600 text-xl" />
                  )}
                </div>
                <Tag
                  color={
                    portfolioSummary.totalProfitLoss >= 0 ? "green" : "red"
                  }
                >
                  {portfolioSummary.totalProfitLoss >= 0 ? "+" : ""}
                  {portfolioSummary.totalProfitLossPercentage.toFixed(2)}%
                </Tag>
              </div>
              <Statistic
                title="Total P&L"
                value={Math.abs(portfolioSummary.totalProfitLoss)}
                precision={2}
                prefix={portfolioSummary.totalProfitLoss >= 0 ? "+$" : "-$"}
                valueStyle={{
                  color:
                    portfolioSummary.totalProfitLoss >= 0
                      ? "#059669"
                      : "#dc2626",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              />
              <div className="mt-2 p-2 bg-gray-50 rounded">
                <Text className="text-xs text-gray-600">
                  Return:{" "}
                  {portfolioSummary.totalProfitLossPercentage.toFixed(2)}%
                </Text>
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <PieChartOutlined className="text-purple-600 text-xl" />
                </div>
                <Tag color="purple">Holdings</Tag>
              </div>
              <Statistic
                title="Total Assets"
                value={portfolioSummary.totalStocks}
                valueStyle={{
                  color: "#1f2937",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              />
              <div className="mt-2 p-2 bg-gray-50 rounded">
                <Text className="text-xs text-gray-600">
                  Diversified Portfolio
                </Text>
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <DollarCircleOutlined className="text-yellow-600 text-xl" />
                </div>
                <Tag color="gold">Average</Tag>
              </div>
              <Statistic
                title="Avg. Return"
                value={portfolioSummary.totalProfitLossPercentage}
                precision={2}
                suffix="%"
                valueStyle={{
                  color:
                    portfolioSummary.totalProfitLossPercentage >= 0
                      ? "#059669"
                      : "#dc2626",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              />
              <div className="mt-2 p-2 bg-gray-50 rounded">
                <Text className="text-xs text-gray-600">
                  Portfolio Performance
                </Text>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Holdings Table */}
        <Card className="mb-6 border-0 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Title level={4} className="!mb-0 text-gray-900">
                Portfolio Holdings
              </Title>
              <Tag color="blue">{portfolioHoldings.length} Assets</Tag>
            </div>
            <Space>
              {refreshing && <Spin size="small" />}
              <Text className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </Text>
            </Space>
          </div>

          <Table
            columns={columns}
            dataSource={portfolioHoldings}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} holdings`,
            }}
            scroll={{ x: 1200 }}
            className="portfolio-table"
          />
        </Card>

        {/* Performance Summary */}
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card
              title="Top Performers"
              className="border-0 shadow-md h-full"
              extra={<Tag color="green">Winning Positions</Tag>}
            >
              <div className="space-y-4">
                {portfolioSummary.topPerformers.map((performer, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="bg-green-100 text-green-600 font-bold">
                        {performer.symbol.charAt(0)}
                      </Avatar>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {performer.symbol}
                        </div>
                        <div className="text-sm text-gray-500">
                          Strong Performance
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">
                        +{performer.profitLossPercentage.toFixed(1)}%
                      </div>
                      <div className="text-sm text-green-600">
                        +${performer.profitLoss.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title="Portfolio Actions"
              className="border-0 shadow-md h-full"
              extra={<Tag color="blue">Quick Actions</Tag>}
            >
              <div className="space-y-4">
                <Alert
                  message="Portfolio Status"
                  description="Your portfolio is performing well with a positive return of 14.2%"
                  type="success"
                  showIcon
                />

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    size="large"
                    icon={<SyncOutlined />}
                    onClick={handleRefreshPrices}
                    loading={refreshing}
                    className="h-16 flex flex-col items-center justify-center"
                  >
                    <div>Refresh</div>
                    <div className="text-xs">Prices</div>
                  </Button>

                  <Button
                    size="large"
                    icon={<CalculatorOutlined />}
                    onClick={handleRecalculate}
                    loading={recalculating}
                    className="h-16 flex flex-col items-center justify-center"
                  >
                    <div>Recalculate</div>
                    <div className="text-xs">Portfolio</div>
                  </Button>
                </div>

                {portfolioSummary.worstPerformers.length > 0 && (
                  <Alert
                    message="Attention Required"
                    description={`${portfolioSummary.worstPerformers.length} holdings are underperforming. Consider reviewing these positions.`}
                    type="warning"
                    showIcon
                    action={
                      <Button size="small" type="text">
                        Review
                      </Button>
                    }
                  />
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <style>{`
        .portfolio-table .ant-table-tbody > tr:hover > td {
          background-color: #f9fafb !important;
        }
        .portfolio-table .ant-table-thead > tr > th {
          background-color: #f8fafc;
          font-weight: 600;
          color: #374151;
        }
      `}</style>
    </div>
  );
};

export default PortfolioPage;
