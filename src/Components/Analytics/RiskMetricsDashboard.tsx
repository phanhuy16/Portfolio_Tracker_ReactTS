import { Card, Progress, Tag } from "antd";

interface RiskMetric {
  metric: string;
  value: number;
  benchmark: number;
  status: "good" | "neutral" | "poor";
}

interface RiskMetricsDashboardProps {
  metrics: RiskMetric[];
}

export const RiskMetricsDashboard = ({
  metrics,
}: RiskMetricsDashboardProps) => {
  return (
    <Card title="Risk Metrics Dashboard" className="h-full border-0 shadow-md">
      <div className="space-y-6">
        {metrics.map((metric, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-700">{metric.metric}</span>
              <div className="text-right">
                <span className="font-bold text-gray-900">{metric.value}</span>
                <span className="text-sm text-gray-500 ml-2">
                  (vs {metric.benchmark})
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Progress
                percent={(metric.value / (metric.benchmark * 1.5)) * 100}
                showInfo={false}
                strokeColor={
                  metric.status === "good"
                    ? "#10B981"
                    : metric.status === "neutral"
                    ? "#F59E0B"
                    : "#EF4444"
                }
                className="flex-1"
              />
              <Tag
                color={
                  metric.status === "good"
                    ? "green"
                    : metric.status === "neutral"
                    ? "orange"
                    : "red"
                }
                className="min-w-16 text-center"
              >
                {metric.status === "good"
                  ? "Good"
                  : metric.status === "neutral"
                  ? "Fair"
                  : "Poor"}
              </Tag>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
