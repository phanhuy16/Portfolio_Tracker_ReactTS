import { Card, Select } from "antd";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const { Option } = Select;

interface PerformanceData {
  date: string;
  value: number;
  transactionCount: number;
}

interface PerformanceLineChartProps {
  data: PerformanceData[];
  performancePeriod: number;
  onPerformancePeriodChange: (value: number) => void;
}

export const PerformanceLineChart = ({
  data,
  performancePeriod,
  onPerformancePeriodChange,
}: PerformanceLineChartProps) => {
  return (
    <Card
      title={
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">
            Portfolio Performance
          </span>
          <Select
            value={performancePeriod}
            onChange={onPerformancePeriodChange}
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
        <LineChart data={data}>
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
  );
};
