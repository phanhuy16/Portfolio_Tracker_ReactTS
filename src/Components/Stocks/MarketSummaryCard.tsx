// components/MarketSummaryCard.tsx
import { Card, Statistic, Typography, Avatar, Row, Col } from "antd";
import {
  BarChartOutlined,
  TrophyOutlined,
  FundOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

interface MarketSummaryProps {
  totalStocks: number;
  gainers: number;
  losers: number;
  totalVolume: string;
  marketCap: string;
}

export const MarketSummaryCard = ({
  totalStocks,
  gainers,
  losers,
  totalVolume,
  marketCap,
}: MarketSummaryProps) => {
  return (
    <Row gutter={[24, 24]} className="mb-8">
      <Col xs={24} sm={8}>
        <Card className="border-0 shadow-md text-center">
          <div className="p-4">
            <div className="flex items-center justify-center mb-3">
              <Avatar
                size={48}
                className="bg-blue-100"
                icon={<BarChartOutlined className="text-blue-600" />}
              />
            </div>
            <Statistic
              title="Total Stocks"
              value={totalStocks}
              valueStyle={{ fontSize: "20px", fontWeight: "bold" }}
            />
            <Text className="text-gray-500">Active securities</Text>
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card className="border-0 shadow-md text-center">
          <div className="p-4">
            <div className="flex items-center justify-center mb-3">
              <Avatar
                size={48}
                className="bg-green-100"
                icon={<TrophyOutlined className="text-green-600" />}
              />
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Statistic
                title="Gainers"
                value={gainers}
                valueStyle={{ color: "#059669", fontSize: "16px" }}
              />
              <Statistic
                title="Losers"
                value={losers}
                valueStyle={{ color: "#dc2626", fontSize: "16px" }}
              />
            </div>
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card className="border-0 shadow-md text-center">
          <div className="p-4">
            <div className="flex items-center justify-center mb-3">
              <Avatar
                size={48}
                className="bg-purple-100"
                icon={<FundOutlined className="text-purple-600" />}
              />
            </div>
            <Statistic
              title="Total Volume"
              value={totalVolume}
              valueStyle={{ fontSize: "20px", fontWeight: "bold" }}
            />
            <Text className="text-gray-500">Market Cap: {marketCap}</Text>
          </div>
        </Card>
      </Col>
    </Row>
  );
};
