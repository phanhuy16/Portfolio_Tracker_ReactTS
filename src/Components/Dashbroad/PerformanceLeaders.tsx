import { Card, Table, Typography } from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

interface Performer {
  symbol: string;
  profitLoss: number;
  profitLossPercentage: number;
}

interface PerformanceLeadersProps {
  topPerformers: Performer[];
  worstPerformers: Performer[];
}

export const PerformanceLeaders = ({
  topPerformers,
  worstPerformers,
}: PerformanceLeadersProps) => {
  const performerColumns = [
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      render: (text: string) => (
        <span className="font-bold text-blue-600">{text}</span>
      ),
    },
    {
      title: "P&L",
      key: "pnl",
      render: (record: Performer) => (
        <div
          className={`font-semibold ${
            record.profitLoss >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {record.profitLoss >= 0 ? "+" : ""}$
          {Math.abs(record.profitLoss).toFixed(2)}
        </div>
      ),
    },
    {
      title: "Return",
      key: "return",
      render: (record: Performer) => (
        <div
          className={`flex items-center space-x-1 ${
            record.profitLossPercentage >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {record.profitLossPercentage >= 0 ? (
            <ArrowUpOutlined />
          ) : (
            <ArrowDownOutlined />
          )}
          <span className="font-medium">
            {Math.abs(record.profitLossPercentage).toFixed(1)}%
          </span>
        </div>
      ),
    },
  ];

  return (
    <Card title="Performance Leaders" className="h-full border-0 shadow-md">
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-3">
          <TrophyOutlined className="text-green-600" />
          <Text className="font-medium text-green-600">Top Performers</Text>
        </div>
        <Table
          columns={performerColumns}
          dataSource={topPerformers}
          pagination={false}
          size="small"
          showHeader={false}
        />
      </div>

      {worstPerformers.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <ArrowDownOutlined className="text-red-600" />
            <Text className="font-medium text-red-600">Needs Attention</Text>
          </div>
          <Table
            columns={performerColumns}
            dataSource={worstPerformers}
            pagination={false}
            size="small"
            showHeader={false}
          />
        </div>
      )}
    </Card>
  );
};
