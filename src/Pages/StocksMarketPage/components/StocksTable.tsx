// components/StocksTable.tsx
import {
  EyeOutlined,
  FallOutlined,
  RiseOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Space, Table, Tooltip } from "antd";

interface StocksTableProps {
  data: any[];
  onView: (stock: any) => void;
  onTrade: (stock: any) => void;
  onUpdatePrice?: (symbol: string) => Promise<void>;
  loading: boolean;
  selectedRowKeys?: number[];
  onSelectionChange?: (selectedKeys: number[]) => void;
}

const getColumns = (
  onView: (stock: any) => void,
  onTrade: (stock: any) => void,
  onUpdatePrice?: (symbol: string) => Promise<void>
) => [
  {
    title: "Symbol",
    key: "symbol",
    width: 120,
    render: (record: any) => (
      <div className="flex items-center space-x-2">
        <Avatar size={32} className="bg-blue-500">
          {record.symbol.charAt(0)}
        </Avatar>
        <div>
          <div className="font-bold text-gray-900">{record.symbol}</div>
          <div className="text-xs text-gray-500">{record.industry}</div>
        </div>
      </div>
    ),
  },
  {
    title: "Company",
    dataIndex: "companyName",
    key: "company",
    width: 200,
    render: (text: string) => (
      <div className="font-medium text-gray-700">{text}</div>
    ),
    ellipsis: true,
  },
  {
    title: "Price",
    key: "price",
    width: 140,
    render: (record: any) => (
      <div>
        <div className="font-bold text-gray-900">
          ${record.currentPrice?.toFixed(2) || "0.00"}
        </div>
        <div
          className={`text-sm flex items-center space-x-1 ${
            record.change >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {record.change >= 0 ? <RiseOutlined /> : <FallOutlined />}
          <span>
            {record.change >= 0 ? "+" : ""}
            {record.change?.toFixed(2) || "0.00"} (
            {record.changePercent?.toFixed(2) || "0.00"}%)
          </span>
        </div>
      </div>
    ),
    sorter: (a: any, b: any) => (a.currentPrice || 0) - (b.currentPrice || 0),
  },
  {
    title: "Volume",
    key: "volume",
    width: 100,
    render: (record: any) => {
      const volume = record.volume || 0;
      if (volume >= 1e6) return `${(volume / 1e6).toFixed(1)}M`;
      if (volume >= 1e3) return `${(volume / 1e3).toFixed(1)}K`;
      return volume.toLocaleString();
    },
    sorter: (a: any, b: any) => (a.volume || 0) - (b.volume || 0),
  },
  {
    title: "Market Cap",
    key: "marketCap",
    width: 120,
    render: (record: any) => {
      if (record.formattedMarketCap) return record.formattedMarketCap;

      const marketCap = record.marketCap || 0;
      if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
      if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
      if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
      return `$${marketCap.toLocaleString()}`;
    },
    sorter: (a: any, b: any) => (a.marketCap || 0) - (b.marketCap || 0),
  },
  {
    title: "P/E Ratio",
    dataIndex: "peRatio",
    key: "peRatio",
    width: 100,
    render: (value: number) => value?.toFixed(2) || "N/A",
    sorter: (a: any, b: any) => (a.peRatio || 0) - (b.peRatio || 0),
  },
  {
    title: "Actions",
    key: "actions",
    width: 180,
    fixed: "right" as const,
    render: (record: any) => (
      <Space>
        <Tooltip title="View Details">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => onView(record)}
            className="text-blue-600 hover:bg-blue-50"
          />
        </Tooltip>

        <Tooltip title="Add to Watchlist">
          <Button
            type="text"
            icon={<StarOutlined />}
            className="text-yellow-600 hover:bg-yellow-50"
          />
        </Tooltip>

        <Tooltip title="Quick Trade">
          <Button
            type="text"
            icon={<ShoppingCartOutlined />}
            onClick={() => onTrade(record)}
            className="text-green-600 hover:bg-green-50"
          />
        </Tooltip>

        {onUpdatePrice && (
          <Tooltip title="Update Realtime Price">
            <Button
              type="text"
              icon={<ReloadOutlined />}
              onClick={() => onUpdatePrice(record.symbol)}
              className="text-purple-600 hover:bg-purple-50"
            />
          </Tooltip>
        )}
      </Space>
    ),
  },
];

export const StocksTable = ({
  data,
  onView,
  onTrade,
  onUpdatePrice,
  loading,
  selectedRowKeys = [],
  onSelectionChange,
}: StocksTableProps) => {
  const rowSelection = onSelectionChange
    ? {
        selectedRowKeys,
        onChange: (selectedKeys: React.Key[]) => {
          onSelectionChange(selectedKeys as number[]);
        },
        getCheckboxProps: (record: any) => ({
          disabled: false,
          name: record.symbol,
        }),
      }
    : undefined;

  return (
    <Card className="border-0 shadow-md">
      <Table
        columns={getColumns(onView, onTrade, onUpdatePrice)}
        dataSource={data}
        loading={loading}
        rowKey="id"
        rowSelection={rowSelection}
        pagination={{
          pageSize: 20,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} stocks`,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        scroll={{ x: 1200 }}
        className="stocks-table"
        size="middle"
        rowClassName={(record) =>
          record.isGainer ? "bg-green-50" : record.isLoser ? "bg-red-50" : ""
        }
      />
    </Card>
  );
};
