// components/PortfolioSummary.tsx
import { Card, Col, Row, Typography } from "antd";
import {
  BankOutlined,
  DollarCircleOutlined,
  FallOutlined,
  RiseOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface PortfolioSummaryProps {
  totalValue: number;
  totalPnL: number;
  avgPnL: number;
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({
  totalValue,
  totalPnL,
  avgPnL,
}) => {
  return (
    <Row gutter={[24, 24]} className="mb-8">
      <Col xs={24} sm={8}>
        <Card className="border-0 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-gray-600 text-sm font-medium block">
                Total Portfolio Value
              </Text>
              <Title level={3} className="!mb-0 text-gray-900">
                ${totalValue.toLocaleString()}
              </Title>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <DollarCircleOutlined className="text-blue-600 text-2xl" />
            </div>
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={8}>
        <Card className="border-0 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-gray-600 text-sm font-medium block">
                Total P&L
              </Text>
              <Title
                level={3}
                className={`!mb-0 ${
                  totalPnL >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {totalPnL >= 0 ? "+ " : "- "}$
                {Math.abs(totalPnL).toLocaleString()}
              </Title>
            </div>
            <div
              className={`p-3 rounded-lg ${
                totalPnL >= 0 ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {totalPnL >= 0 ? (
                <RiseOutlined className="text-green-600 text-2xl" />
              ) : (
                <FallOutlined className="text-red-600 text-2xl" />
              )}
            </div>
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={8}>
        <Card className="border-0 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-gray-600 text-sm font-medium block">
                Average Return
              </Text>
              <Title
                level={3}
                className={`!mb-0 ${
                  avgPnL >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {avgPnL >= 0 ? "+" : ""}
                {avgPnL.toFixed(2)}%
              </Title>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <BankOutlined className="text-purple-600 text-2xl" />
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default PortfolioSummary;
