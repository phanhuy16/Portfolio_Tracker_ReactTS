import {
  BarChartOutlined,
  CalendarOutlined,
  FallOutlined,
  PieChartOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Progress,
  Row,
  Select,
  Space,
  Statistic,
  Tag,
  Typography,
} from "antd";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const { Title, Text } = Typography;
const { Option } = Select;

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState("6M");

  // Enhanced mock data
  const performanceData = [
    { date: "Jan", value: 100000, benchmark: 95000, month: "Jan 2024" },
    { date: "Feb", value: 105000, benchmark: 98000, month: "Feb 2024" },
    { date: "Mar", value: 110000, benchmark: 102000, month: "Mar 2024" },
    { date: "Apr", value: 115000, benchmark: 108000, month: "Apr 2024" },
    { date: "May", value: 120000, benchmark: 115000, month: "May 2024" },
    { date: "Jun", value: 125000, benchmark: 118000, month: "Jun 2024" },
  ];

  const allocationData = [
    { name: "Technology Stocks", value: 35, color: "#3B82F6" },
    { name: "Cryptocurrency", value: 30, color: "#F59E0B" },
    { name: "Government Bonds", value: 15, color: "#10B981" },
    { name: "Real Estate", value: 12, color: "#8B5CF6" },
    { name: "Cash & Equivalents", value: 8, color: "#6B7280" },
  ];

  const riskMetrics = [
    { metric: "Sharpe Ratio", value: 1.45, benchmark: 1.2, status: "good" },
    { metric: "Volatility", value: 12.3, benchmark: 15.2, status: "good" },
    { metric: "Max Drawdown", value: 8.5, benchmark: 12.0, status: "good" },
    { metric: "Beta", value: 0.85, benchmark: 1.0, status: "neutral" },
  ];

  const monthlyReturns = [
    { month: "Jan", returns: 5.2 },
    { month: "Feb", returns: 4.8 },
    { month: "Mar", returns: 4.5 },
    { month: "Apr", returns: 4.3 },
    { month: "May", returns: 4.2 },
    { month: "Jun", returns: 4.0 },
  ];

  const sectorPerformance = [
    { sector: "Technology", allocation: 35, performance: 18.5, ytd: 24.2 },
    { sector: "Crypto", allocation: 30, performance: 12.3, ytd: -8.7 },
    { sector: "Bonds", allocation: 15, performance: 3.2, ytd: 5.1 },
    { sector: "Real Estate", allocation: 12, performance: 8.9, ytd: 11.3 },
    { sector: "Cash", allocation: 8, performance: 0.5, ytd: 2.1 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Title level={2} className="!mb-2 text-gray-900">
              Analytics & Performance Reports
            </Title>
            <Text className="text-gray-600 text-lg">
              Deep insights into your portfolio performance and risk metrics
            </Text>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={timeRange} onChange={setTimeRange} className="w-24">
              <Option value="1M">1M</Option>
              <Option value="3M">3M</Option>
              <Option value="6M">6M</Option>
              <Option value="1Y">1Y</Option>
              <Option value="ALL">ALL</Option>
            </Select>
            <Button icon={<CalendarOutlined />}>Custom Range</Button>
          </div>
        </div>

        {/* Key Performance Metrics */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} sm={12} lg={6}>
            <Card className="h-full border-0 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <RiseOutlined className="text-blue-600 text-xl" />
                </div>
                <Tag color="green">+12.5%</Tag>
              </div>
              <Statistic
                title="Total Return (6M)"
                value={25000}
                precision={0}
                prefix="$"
                valueStyle={{ fontSize: "24px", fontWeight: "bold" }}
              />
              <Text className="text-gray-500">vs S&P 500: +18.2%</Text>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card className="h-full border-0 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <BarChartOutlined className="text-green-600 text-xl" />
                </div>
                <Tag color="blue">Excellent</Tag>
              </div>
              <Statistic
                title="Sharpe Ratio"
                value={1.45}
                precision={2}
                valueStyle={{ fontSize: "24px", fontWeight: "bold" }}
              />
              <Text className="text-gray-500">Market avg: 1.20</Text>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card className="h-full border-0 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <PieChartOutlined className="text-yellow-600 text-xl" />
                </div>
                <Tag color="green">Low Risk</Tag>
              </div>
              <Statistic
                title="Volatility"
                value={12.3}
                precision={1}
                suffix="%"
                valueStyle={{ fontSize: "24px", fontWeight: "bold" }}
              />
              <Text className="text-gray-500">Market avg: 15.2%</Text>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card className="h-full border-0 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FallOutlined className="text-purple-600 text-xl" />
                </div>
                <Tag color="green">Low</Tag>
              </div>
              <Statistic
                title="Max Drawdown"
                value={8.5}
                precision={1}
                suffix="%"
                valueStyle={{ fontSize: "24px", fontWeight: "bold" }}
              />
              <Text className="text-gray-500">Market avg: 12.0%</Text>
            </Card>
          </Col>
        </Row>

        {/* Charts Row 1 */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} lg={16}>
            <Card
              title={
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">
                    Portfolio Performance vs Benchmark
                  </span>
                  <Space>
                    <Tag color="blue">Portfolio</Tag>
                    <Tag color="gray">S&P 500</Tag>
                  </Space>
                </div>
              }
              className="h-full border-0 shadow-md"
            >
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient
                      id="portfolioGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="benchmarkGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#6B7280" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6B7280" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#F9FAFB",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#portfolioGradient)"
                    name="Portfolio"
                  />
                  <Area
                    type="monotone"
                    dataKey="benchmark"
                    stroke="#6B7280"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    fillOpacity={1}
                    fill="url(#benchmarkGradient)"
                    name="S&P 500"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card
              title="Asset Allocation"
              className="h-full border-0 shadow-md"
            >
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Allocation"]}
                    contentStyle={{
                      backgroundColor: "#F9FAFB",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {allocationData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-700">{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>

        {/* Charts Row 2 */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} lg={12}>
            <Card title="Monthly Returns" className="h-full border-0 shadow-md">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyReturns}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Returns"]}
                    contentStyle={{
                      backgroundColor: "#F9FAFB",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="returns" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title="Risk Metrics Dashboard"
              className="h-full border-0 shadow-md"
            >
              <div className="space-y-6">
                {riskMetrics.map((metric, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-700">
                        {metric.metric}
                      </span>
                      <div className="text-right">
                        <span className="font-bold text-gray-900">
                          {metric.value}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">
                          (vs {metric.benchmark})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Progress
                        percent={
                          (metric.value / (metric.benchmark * 1.5)) * 100
                        }
                        showInfo={false}
                        strokeColor={
                          metric.status === "good"
                            ? "#10B981"
                            : metric.status === "neutral"
                            ? "#F59E0B"
                            : "#EF4444"
                        }
                        className="flex-1"
                      />
                      <Tag
                        color={
                          metric.status === "good"
                            ? "green"
                            : metric.status === "neutral"
                            ? "orange"
                            : "red"
                        }
                        className="min-w-16 text-center"
                      >
                        {metric.status === "good"
                          ? "Good"
                          : metric.status === "neutral"
                          ? "Fair"
                          : "Poor"}
                      </Tag>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>

        {/* Sector Performance Table */}
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Card
              title="Sector Performance Analysis"
              className="border-0 shadow-md"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Sector
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Allocation
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        6M Return
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        YTD Return
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Performance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sectorPerformance.map((sector, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-4 px-4 font-medium text-gray-900">
                          {sector.sector}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <span>{sector.allocation}%</span>
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{
                                  width: `${(sector.allocation / 35) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`font-medium ${
                              sector.performance >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {sector.performance >= 0 ? "+" : ""}
                            {sector.performance}%
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`font-medium ${
                              sector.ytd >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {sector.ytd >= 0 ? "+" : ""}
                            {sector.ytd}%
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <Tag
                            color={
                              sector.performance > 10
                                ? "green"
                                : sector.performance > 5
                                ? "blue"
                                : sector.performance > 0
                                ? "orange"
                                : "red"
                            }
                          >
                            {sector.performance > 10
                              ? "Excellent"
                              : sector.performance > 5
                              ? "Good"
                              : sector.performance > 0
                              ? "Fair"
                              : "Poor"}
                          </Tag>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AnalyticsPage;
