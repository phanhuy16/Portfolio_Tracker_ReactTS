import { Card } from "antd";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface AllocationData {
  industry: string;
  value: number;
  percentage: number;
  stockCount: number;
  color: string;
}

interface AllocationPieChartProps {
  data: AllocationData[];
}

export const AllocationPieChart = ({ data }: AllocationPieChartProps) => {
  return (
    <Card title="Portfolio Allocation" className="h-full border-0 shadow-md">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={40}
            paddingAngle={2}
            dataKey="percentage"
          >
            {data.map((entry, index) => (
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
        {data.map((item, index) => (
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
  );
};
