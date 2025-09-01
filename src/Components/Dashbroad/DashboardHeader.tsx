import { Typography } from "antd";

const { Title, Text } = Typography;

export const DashboardHeader = () => {
  return (
    <div className="mb-8">
      <Title level={2} className="!mb-2 text-gray-900">
        Portfolio Dashboard
      </Title>
      <Text className="text-gray-600 text-lg">
        Welcome back! Here's an overview of your investment portfolio
      </Text>
    </div>
  );
};
