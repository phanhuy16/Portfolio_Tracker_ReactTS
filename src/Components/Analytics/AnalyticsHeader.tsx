import { Button, Select, Typography } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

interface AnalyticsHeaderProps {
  timeRange: string;
  onTimeRangeChange: (value: string) => void;
}

export const AnalyticsHeader = ({
  timeRange,
  onTimeRangeChange,
}: AnalyticsHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <Title level={2} className="!mb-2 text-gray-900">
          Analytics & Performance Reports
        </Title>
        <Text className="text-gray-600 text-lg">
          Deep insights into your portfolio performance and risk metrics
        </Text>
      </div>
      <div className="flex items-center space-x-4">
        <Select value={timeRange} onChange={onTimeRangeChange} className="w-24">
          <Option value="1M">1M</Option>
          <Option value="3M">3M</Option>
          <Option value="6M">6M</Option>
          <Option value="1Y">1Y</Option>
          <Option value="ALL">ALL</Option>
        </Select>
        <Button icon={<CalendarOutlined />}>Custom Range</Button>
      </div>
    </div>
  );
};
