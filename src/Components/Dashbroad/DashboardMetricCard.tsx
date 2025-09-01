import { Card, Statistic, Tag } from "antd";
import { ReactNode } from "react";

interface DashboardMetricCardProps {
  title: string;
  value: number | string;
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

export const DashboardMetricCard = ({
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
}: DashboardMetricCardProps) => {
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
      <div className="text-gray-500">{subtitle}</div>
    </Card>
  );
};
