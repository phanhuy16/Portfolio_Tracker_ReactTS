import { Card } from "antd";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface MonthlyReturnsData {
  month: string;
  returns: number;
}

interface MonthlyReturnsChartProps {
  data: MonthlyReturnsData[];
}

export const MonthlyReturnsChart = ({ data }: MonthlyReturnsChartProps) => {
  return (
    <Card title="Monthly Returns" className="h-full border-0 shadow-md">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
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
  );
};
