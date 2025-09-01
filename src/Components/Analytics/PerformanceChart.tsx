import { Card, Space, Tag } from "antd";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface PerformanceData {
  date: string;
  value: number;
  benchmark: number;
  month: string;
}

interface PerformanceChartProps {
  data: PerformanceData[];
}

export const PerformanceChart = ({ data }: PerformanceChartProps) => {
  return (
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
        <AreaChart data={data}>
          <defs>
            <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
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
  );
};
