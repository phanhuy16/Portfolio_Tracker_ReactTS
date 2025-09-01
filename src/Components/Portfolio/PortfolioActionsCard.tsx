import { Card, Tag, Alert, Button } from "antd";
import { SyncOutlined, CalculatorOutlined } from "@ant-design/icons";

interface PortfolioActionsCardProps {
  totalProfitLossPercentage: number;
  worstPerformersCount: number;
  onRefreshPrices: () => void;
  onRecalculate: () => void;
  refreshing: boolean;
  recalculating: boolean;
}

export const PortfolioActionsCard = ({
  totalProfitLossPercentage,
  worstPerformersCount,
  onRefreshPrices,
  onRecalculate,
  refreshing,
  recalculating,
}: PortfolioActionsCardProps) => {
  return (
    <Card
      title="Portfolio Actions"
      className="border-0 shadow-md h-full"
      extra={<Tag color="blue">Quick Actions</Tag>}
    >
      <div className="space-y-4">
        <Alert
          message="Portfolio Status"
          description={`Your portfolio is performing well with a positive return of ${totalProfitLossPercentage.toFixed(
            1
          )}%`}
          type="success"
          showIcon
        />

        <div className="grid grid-cols-2 gap-4">
          <Button
            size="large"
            icon={<SyncOutlined />}
            onClick={onRefreshPrices}
            loading={refreshing}
            className="h-16 flex flex-col items-center justify-center"
          >
            <div>Refresh</div>
            <div className="text-xs">Prices</div>
          </Button>

          <Button
            size="large"
            icon={<CalculatorOutlined />}
            onClick={onRecalculate}
            loading={recalculating}
            className="h-16 flex flex-col items-center justify-center"
          >
            <div>Recalculate</div>
            <div className="text-xs">Portfolio</div>
          </Button>
        </div>

        {worstPerformersCount > 0 && (
          <Alert
            message="Attention Required"
            description={`${worstPerformersCount} holdings are underperforming. Consider reviewing these positions.`}
            type="warning"
            showIcon
            action={
              <Button size="small" type="text">
                Review
              </Button>
            }
          />
        )}
      </div>
    </Card>
  );
};
