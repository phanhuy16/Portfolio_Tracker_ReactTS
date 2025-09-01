import { Card, Avatar } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

interface Stock {
  symbol: string;
  companyName: string;
  currentPrice: number;
  change: number;
  changePercentage: number;
  volume: number;
  industry: string;
}

interface MarketMoverCardProps {
  title: string;
  stocks: Stock[];
  isPositive: boolean;
}

export const MarketMoverCard = ({
  title,
  stocks,
  isPositive,
}: MarketMoverCardProps) => {
  const IconComponent = isPositive ? ArrowUpOutlined : ArrowDownOutlined;
  const iconColor = isPositive ? "text-green-600" : "text-red-600";
  const bgColor = isPositive ? "bg-green-50" : "bg-red-50";
  const avatarBgColor = isPositive ? "bg-green-100" : "bg-red-100";
  const avatarTextColor = isPositive ? "text-green-600" : "text-red-600";
  const textColor = isPositive ? "text-green-600" : "text-red-600";

  return (
    <Card
      title={
        <div className="flex items-center space-x-2">
          <IconComponent className={iconColor} />
          <span className="text-lg font-semibold text-gray-900">{title}</span>
        </div>
      }
      className="border-0 shadow-md"
    >
      <div className="space-y-4">
        {stocks.map((stock, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 ${bgColor} rounded-lg`}
          >
            <div className="flex items-center space-x-3">
              <Avatar className={`${avatarBgColor} ${avatarTextColor}`}>
                {stock.symbol.charAt(0)}
              </Avatar>
              <div>
                <div className="font-semibold text-gray-900">
                  {stock.symbol}
                </div>
                <div className="text-sm text-gray-500">{stock.companyName}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-gray-900">
                ${stock.currentPrice.toFixed(2)}
              </div>
              <div className={`${textColor} font-medium`}>
                {isPositive ? "+" : ""}
                {stock.changePercentage.toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
