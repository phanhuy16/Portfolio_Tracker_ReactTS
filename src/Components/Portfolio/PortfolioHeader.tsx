import { Typography, Space, Button } from "antd";
import { ReloadOutlined, CalculatorOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface PortfolioHeaderProps {
  onRefreshPrices: () => void;
  onRecalculate: () => void;
  refreshing: boolean;
  recalculating: boolean;
}

export const PortfolioHeader = ({
  onRefreshPrices,
  onRecalculate,
  refreshing,
  recalculating,
}: PortfolioHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <Title level={2} className="!mb-2 text-gray-900">
          Portfolio Holdings
        </Title>
        <Text className="text-gray-600 text-lg">
          Manage and track your investment holdings in detail
        </Text>
      </div>
      <Space>
        <Button
          icon={<ReloadOutlined />}
          onClick={onRefreshPrices}
          loading={refreshing}
          className="shadow-md"
        >
          Refresh Prices
        </Button>
        <Button
          icon={<CalculatorOutlined />}
          onClick={onRecalculate}
          loading={recalculating}
          className="shadow-md"
        >
          Recalculate
        </Button>
      </Space>
    </div>
  );
};
