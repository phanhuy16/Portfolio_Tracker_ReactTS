import { Avatar, Card, Col, Statistic, Badge } from "antd";
import {
  EyeOutlined,
  BellOutlined,
  WarningOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { WatchlistSummary } from "../../Models/Watchlist";

interface WatchlistSummaryCardProps {
  summary: WatchlistSummary;
}

export const WatchlistSummaryCard: React.FC<WatchlistSummaryCardProps> = ({
  summary,
}) => {
  return (
    <>
      <Col xs={24} sm={6}>
        <Card className="border-0 shadow-md text-center">
          <div className="p-4">
            <div className="flex items-center justify-center mb-3">
              <Avatar
                size={48}
                className="bg-blue-100"
                icon={<EyeOutlined className="text-blue-600" />}
              />
            </div>
            <Statistic
              title="Total Watchlist"
              value={summary.totalItems}
              valueStyle={{ fontSize: "20px", fontWeight: "bold" }}
            />
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={6}>
        <Card className="border-0 shadow-md text-center">
          <div className="p-4">
            <div className="flex items-center justify-center mb-3">
              <Badge count={summary.triggeredAlerts}>
                <Avatar
                  size={48}
                  className="bg-orange-100"
                  icon={<BellOutlined className="text-orange-600" />}
                />
              </Badge>
            </div>
            <Statistic
              title="Active Alerts"
              value={summary.triggeredAlerts}
              valueStyle={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#D97706",
              }}
            />
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={6}>
        <Card className="border-0 shadow-md text-center">
          <div className="p-4">
            <div className="flex items-center justify-center mb-3">
              <Avatar
                size={48}
                className="bg-red-100"
                icon={<WarningOutlined className="text-red-600" />}
              />
            </div>
            <Statistic
              title="High Priority"
              value={summary.highPriority}
              valueStyle={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#DC2626",
              }}
            />
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={6}>
        <Card className="border-0 shadow-md text-center">
          <div className="p-4">
            <div className="flex items-center justify-center mb-3">
              <Avatar
                size={48}
                className="bg-green-100"
                icon={<RiseOutlined className="text-green-600" />}
              />
            </div>
            <Statistic
              title="Total Value"
              value={summary.totalValue}
              precision={2}
              prefix="$"
              valueStyle={{ fontSize: "20px", fontWeight: "bold" }}
            />
          </div>
        </Card>
      </Col>
    </>
  );
};
