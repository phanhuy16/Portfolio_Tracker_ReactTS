import {
  BarChartOutlined,
  FallOutlined,
  PieChartOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import { useState } from "react";
import { AnalyticsHeader } from "../../Components/Analytics/AnalyticsHeader";
import { MetricCard } from "../../Components/Analytics/MetricCard";
import { PerformanceChart } from "../../Components/Analytics/PerformanceChart";
import { AllocationPieChart } from "../../Components/Analytics/AllocationPieChart";
import { MonthlyReturnsChart } from "../../Components/Analytics/MonthlyReturnsChart";
import { SectorPerformanceTable } from "../../Components/Analytics/SectorPerformanceTable";
import { RiskMetricsDashboard } from "../../Components/Analytics/RiskMetricsDashboard";

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState("6M");

  // Data (same as before)
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
    {
      metric: "Sharpe Ratio",
      value: 1.45,
      benchmark: 1.2,
      status: "good" as const,
    },
    {
      metric: "Volatility",
      value: 12.3,
      benchmark: 15.2,
      status: "good" as const,
    },
    {
      metric: "Max Drawdown",
      value: 8.5,
      benchmark: 12.0,
      status: "good" as const,
    },
    { metric: "Beta", value: 0.85, benchmark: 1.0, status: "neutral" as const },
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
        <AnalyticsHeader
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
        />

        {/* Key Performance Metrics */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} sm={12} lg={6}>
            <MetricCard
              title="Total Return (6M)"
              value={25000}
              prefix="$"
              icon={<RiseOutlined className="text-blue-600 text-xl" />}
              iconBgColor="bg-blue-100"
              tagColor="green"
              tagText="+12.5%"
              subtitle="vs S&P 500: +18.2%"
            />
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <MetricCard
              title="Sharpe Ratio"
              value={1.45}
              precision={2}
              icon={<BarChartOutlined className="text-green-600 text-xl" />}
              iconBgColor="bg-green-100"
              tagColor="blue"
              tagText="Excellent"
              subtitle="Market avg: 1.20"
            />
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <MetricCard
              title="Volatility"
              value={12.3}
              precision={1}
              suffix="%"
              icon={<PieChartOutlined className="text-yellow-600 text-xl" />}
              iconBgColor="bg-yellow-100"
              tagColor="green"
              tagText="Low Risk"
              subtitle="Market avg: 15.2%"
            />
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <MetricCard
              title="Max Drawdown"
              value={8.5}
              precision={1}
              suffix="%"
              icon={<FallOutlined className="text-purple-600 text-xl" />}
              iconBgColor="bg-purple-100"
              tagColor="green"
              tagText="Low"
              subtitle="Market avg: 12.0%"
            />
          </Col>
        </Row>

        {/* Charts Row 1 */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} lg={16}>
            <PerformanceChart data={performanceData} />
          </Col>
          <Col xs={24} lg={8}>
            <AllocationPieChart data={allocationData} />
          </Col>
        </Row>

        {/* Charts Row 2 */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} lg={12}>
            <MonthlyReturnsChart data={monthlyReturns} />
          </Col>
          <Col xs={24} lg={12}>
            <RiskMetricsDashboard metrics={riskMetrics} />
          </Col>
        </Row>

        {/* Sector Performance Table */}
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <SectorPerformanceTable data={sectorPerformance} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AnalyticsPage;
