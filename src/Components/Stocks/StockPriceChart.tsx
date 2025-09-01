// components/StockPriceChart.tsx
import { LineChartOutlined } from "@ant-design/icons";
import { Card, Typography } from "antd";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const { Text } = Typography;

interface StockPriceChartProps {
  stock: any;
  data: any[];
}

export const StockPriceChart = ({ stock, data }: StockPriceChartProps) => {
  if (!stock) {
    return (
      <Card className="border-0 shadow-md h-full flex items-center justify-center">
        <div className="text-center text-gray-500">
          <LineChartOutlined className="text-4xl mb-4" />
          <Text>Select a stock to view price chart</Text>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title={`${stock.symbol} - Price Chart`}
      className="border-0 shadow-md h-full"
    >
      <div className="mb-4">
        <Text className="text-2xl font-bold">
          ${stock.currentPrice.toFixed(2)}
        </Text>
        <div
          className={`text-sm ${
            stock.change >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {stock.change >= 0 ? "+" : ""}
          {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin", "dataMax"]} />
          <RechartsTooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
