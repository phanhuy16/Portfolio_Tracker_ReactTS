import { Card, Tag, Avatar } from "antd";

interface Performer {
  symbol: string;
  profitLoss: number;
  profitLossPercentage: number;
}

interface TopPerformersCardProps {
  performers: Performer[];
}

export const TopPerformersCard = ({ performers }: TopPerformersCardProps) => {
  return (
    <Card
      title="Top Performers"
      className="border-0 shadow-md h-full"
      extra={<Tag color="green">Winning Positions</Tag>}
    >
      <div className="space-y-4">
        {performers.map((performer, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <Avatar className="bg-green-100 text-green-600 font-bold">
                {performer.symbol.charAt(0)}
              </Avatar>
              <div>
                <div className="font-semibold text-gray-900">
                  {performer.symbol}
                </div>
                <div className="text-sm text-gray-500">Strong Performance</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-green-600">
                +{performer.profitLossPercentage.toFixed(1)}%
              </div>
              <div className="text-sm text-green-600">
                +${performer.profitLoss.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
