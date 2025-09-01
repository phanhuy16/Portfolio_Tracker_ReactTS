import { Alert, Button, Tag } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { WatchlistItem } from "../../Models/Watchlist";

interface WatchlistAlertsProps {
  triggeredAlerts: WatchlistItem[];
  onClearAlerts: () => void;
}

export const WatchlistAlerts: React.FC<WatchlistAlertsProps> = ({
  triggeredAlerts,
  onClearAlerts,
}) => {
  if (triggeredAlerts.length === 0) return null;

  return (
    <Alert
      message={`You have ${triggeredAlerts.length} triggered alert(s)`}
      description={
        <div>
          <div className="mb-3">
            {triggeredAlerts.map((alert) => (
              <Tag key={alert.id} color="orange" className="mb-1">
                {alert.symbol} - ${alert.currentPrice.toFixed(2)}
              </Tag>
            ))}
          </div>
          <Button
            size="small"
            onClick={onClearAlerts}
            icon={<CheckCircleOutlined />}
          >
            Clear All Alerts
          </Button>
        </div>
      }
      type="warning"
      showIcon
      closable
      className="mb-6"
    />
  );
};
