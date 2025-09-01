import { Card, Statistic, Tag, Typography } from "antd";
import { ReactNode } from "react";

const { Text } = Typography;

interface PortfolioSummaryCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  precision?: number;
  icon: ReactNode;
  iconBgColor: string;
  tagColor: string;
  tagText: string;
  subtitle: string;
  valueColor?: string;
}

export const PortfolioSummaryCard = ({
  title,
  value,
  prefix,
  suffix,
  precision,
  icon,
  iconBgColor,
  tagColor,
  tagText,
  subtitle,
  valueColor = "#1f2937",
}: PortfolioSummaryCardProps) => {
  return (
    <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 ${iconBgColor} rounded-lg`}>{icon}</div>
        <Tag color={tagColor}>{tagText}</Tag>
      </div>
      <Statistic
        title={title}
        value={value}
        precision={precision}
        prefix={prefix}
        suffix={suffix}
        valueStyle={{
          color: valueColor,
          fontSize: "24px",
          fontWeight: "bold",
        }}
      />
      <div className="mt-2 p-2 bg-gray-50 rounded">
        <Text className="text-xs text-gray-600">{subtitle}</Text>
      </div>
    </Card>
  );
};
