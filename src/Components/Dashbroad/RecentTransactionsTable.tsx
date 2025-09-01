import { Card, Table, Tag, Avatar, Button } from "antd";

interface Transaction {
  id: string;
  symbol: string;
  type: string;
  quantity: number;
  price: number;
  transactionDate: string;
  totalAmount: number;
}

interface RecentTransactionsTableProps {
  transactions: Transaction[];
  onViewAll?: () => void;
}

export const RecentTransactionsTable = ({
  transactions,
  onViewAll,
}: RecentTransactionsTableProps) => {
  const transactionColumns = [
    {
      title: "Asset",
      key: "asset",
      render: (record: Transaction) => (
        <div className="flex items-center space-x-2">
          <Avatar size={24} className="bg-blue-500">
            {record.symbol.charAt(0)}
          </Avatar>
          <span className="font-medium">{record.symbol}</span>
        </div>
      ),
    },
    {
      title: "Type",
      key: "type",
      render: (record: Transaction) => (
        <Tag color={record.type === "Buy" ? "green" : "red"}>{record.type}</Tag>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      key: "price",
      render: (record: Transaction) => `$${record.price.toLocaleString()}`,
    },
    {
      title: "Total",
      key: "total",
      render: (record: Transaction) => (
        <span className="font-semibold">
          ${record.totalAmount.toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <Card
      title={
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">
            Recent Transactions
          </span>
          <Button type="link" size="small" onClick={onViewAll}>
            View All
          </Button>
        </div>
      }
      className="h-full border-0 shadow-md"
    >
      <Table
        columns={transactionColumns}
        dataSource={transactions.slice(0, 5)}
        pagination={false}
        size="small"
        className="recent-transactions-table"
      />
      <style>{`
        .recent-transactions-table .ant-table-tbody > tr:hover > td {
          background-color: #f9fafb !important;
        }
        .recent-transactions-table .ant-table-thead > tr > th {
          background-color: #f8fafc;
          font-weight: 600;
          color: #374151;
        }
      `}</style>
    </Card>
  );
};
