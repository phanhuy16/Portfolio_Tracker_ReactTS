// components/HeaderSection.tsx
import { Button, Badge, Typography } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export const HeaderSection = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <Title level={2} className="!mb-2 text-gray-900">
          Stock Market
        </Title>
        <Text className="text-gray-600 text-lg">
          Discover and track stocks across global markets
        </Text>
      </div>
      <div className="flex items-center space-x-4">
        <Button icon={<ReloadOutlined />} className="flex items-center">
          Refresh Prices
        </Button>
        <Badge dot status="processing">
          <Button type="primary">Live Market</Button>
        </Badge>
      </div>
    </div>
  );
};
