import {
  ArrowDownOutlined,
  DeleteOutlined,
  EyeOutlined,
  RiseOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Space,
  Spin,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";

const { Title, Text } = Typography;

interface Holding {
  id: number;
  stockId: number;
  stock: {
    symbol: string;
    companyName: string;
    industry: string;
  };
  quantity: number;
  averageCostBasis: number;
  currentPrice: number;
  currentValue: number;
  totalInvestment: number;
  profitLoss: number;
  profitLossPercentage: number;
  lastUpdated: string;
}

interface HoldingsTableProps {
  holdings: Holding[];
  onDeleteHolding: (stockId: number) => void;
  refreshing: boolean;
}

export const HoldingsTable = ({
  holdings,
  onDeleteHolding,
  refreshing,
}: HoldingsTableProps) => {
  const columns = [
    {
      title: "Asset",
      key: "asset",
      width: 200,
      render: (record: Holding) => (
        <div className="flex items-center space-x-3">
          <Avatar size={40} className="bg-blue-500 text-white font-bold">
            {record.stock.symbol.charAt(0)}
          </Avatar>
          <div>
            <div className="font-semibold text-gray-900 text-base">
              {record.stock.symbol}
            </div>
            <div className="text-sm text-gray-500">
              {record.stock.companyName}
            </div>
            <Tag color="blue">{record.stock.industry}</Tag>
          </div>
        </div>
      ),
    },
    {
      title: "Holdings",
      key: "holdings",
      width: 150,
      render: (record: Holding) => (
        <div>
          <div className="font-semibold text-gray-900">
            {record.quantity} {record.stock.symbol === "BTC" ? "BTC" : "shares"}
          </div>
          <div className="text-sm text-gray-500">
            Avg Cost: ${record.averageCostBasis.toFixed(2)}
          </div>
        </div>
      ),
    },
    {
      title: "Current Price",
      key: "currentPrice",
      width: 130,
      render: (record: Holding) => (
        <div>
          <div className="font-bold text-gray-900">
            ${record.currentPrice.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">
            Last updated: {new Date(record.lastUpdated).toLocaleTimeString()}
          </div>
        </div>
      ),
    },
    {
      title: "Market Value",
      key: "marketValue",
      width: 150,
      render: (record: Holding) => (
        <div>
          <div className="font-bold text-gray-900 text-lg">
            ${record.currentValue.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">
            Cost: ${record.totalInvestment.toLocaleString()}
          </div>
        </div>
      ),
      sorter: (a: Holding, b: Holding) => a.currentValue - b.currentValue,
    },
    {
      title: "P&L",
      key: "pnl",
      width: 140,
      render: (record: Holding) => (
        <div className="text-center">
          <div
            className={`flex items-center justify-center space-x-1 font-bold ${
              record.profitLoss >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {record.profitLoss >= 0 ? <RiseOutlined /> : <ArrowDownOutlined />}
            <span>
              {record.profitLoss >= 0 ? "+" : ""}
              {record.profitLossPercentage.toFixed(2)}%
            </span>
          </div>
          <div
            className={`text-sm font-medium ${
              record.profitLoss >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {record.profitLoss >= 0 ? "+$" : "-$"}
            {Math.abs(record.profitLoss).toLocaleString()}
          </div>
        </div>
      ),
      sorter: (a: Holding, b: Holding) =>
        a.profitLossPercentage - b.profitLossPercentage,
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (record: Holding) => (
        <Space>
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              className="text-blue-600 hover:bg-blue-50"
            />
          </Tooltip>
          <Tooltip title="Trade">
            <Button
              type="text"
              icon={<ShoppingCartOutlined />}
              className="text-green-600 hover:bg-green-50"
            />
          </Tooltip>
          <Tooltip title="Remove Holding">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => onDeleteHolding(record.stockId)}
              className="text-red-600 hover:bg-red-50"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Card className="mb-6 border-0 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Title level={4} className="!mb-0 text-gray-900">
            Portfolio Holdings
          </Title>
          <Tag color="blue">{holdings.length} Assets</Tag>
        </div>
        <Space>
          {refreshing && <Spin size="small" />}
          <Text className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </Text>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={holdings}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} holdings`,
        }}
        scroll={{ x: 1200 }}
        className="portfolio-table"
      />

      <style>{`
        .portfolio-table .ant-table-tbody > tr:hover > td {
          background-color: #f9fafb !important;
        }
        .portfolio-table .ant-table-thead > tr > th {
          background-color: #f8fafc;
          font-weight: 600;
          color: #374151;
        }
      `}</style>
    </Card>
  );
};
