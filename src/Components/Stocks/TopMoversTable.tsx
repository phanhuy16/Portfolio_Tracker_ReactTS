// components/TopMoversTable.tsx
import { Card, Table, Typography, Avatar } from "antd";
import { RiseOutlined, FallOutlined } from "@ant-design/icons";

const { Title } = Typography;

const topMoversColumns = [
  {
    title: "Symbol",
    key: "symbol",
    render: (record: any) => (
      <div className="flex items-center space-x-2">
        <Avatar size={24} className="bg-blue-500">
          {record.symbol.charAt(0)}
        </Avatar>
        <span className="font-bold">{record.symbol}</span>
      </div>
    ),
  },
  {
    title: "Price",
    key: "price",
    render: (record: any) => `$${record.currentPrice.toFixed(2)}`,
  },
  {
    title: "Change",
    key: "change",
    render: (record: any) => (
      <div
        className={`flex items-center space-x-1 ${
          record.change >= 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        {record.change >= 0 ? <RiseOutlined /> : <FallOutlined />}
        <span>
          {record.change >= 0 ? "+" : ""}
          {record.changePercent.toFixed(2)}%
        </span>
      </div>
    ),
  },
];

interface TopMoversTableProps {
  title: string;
  data: any[];
}

export const TopMoversTable = ({ title, data }: TopMoversTableProps) => {
  return (
    <Card title={title} className="border-0 shadow-md h-full">
      <Table
        columns={topMoversColumns}
        dataSource={data}
        pagination={false}
        size="small"
        className="top-movers-table"
      />
    </Card>
  );
};
