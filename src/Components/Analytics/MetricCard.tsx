import { Card, Statistic, Tag } from "antd";
import { ReactNode } from "react";

interface MetricCardProps {
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
}

export const MetricCard = ({
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
}: MetricCardProps) => {
  return (
    <Card className="h-full border-0 shadow-md">
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
        valueStyle={{ fontSize: "24px", fontWeight: "bold" }}
      />
      <div className="text-gray-500">{subtitle}</div>
    </Card>
  );
};
