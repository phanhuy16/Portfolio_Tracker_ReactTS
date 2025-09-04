// src/components/TransactionTable/TransactionTable.tsx
import React from "react";
import { Table, Tag, Tooltip, Button, Space, Modal } from "antd";
import {
  ShoppingCartOutlined,
  BankOutlined,
  SwapOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import {
  Transaction,
  TRANSACTION_TYPE_DISPLAY,
} from "../../Models/Transaction";

interface TransactionTableProps {
  transactions: Transaction[];
  loading: boolean;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: number) => void;
}

const { confirm } = Modal;

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  loading,
  onEdit,
  onDelete,
}) => {
  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircleOutlined className="text-green-600" />;
      case "Pending":
        return <ClockCircleOutlined className="text-orange-500" />;
      case "Failed":
        return <ExclamationCircleOutlined className="text-red-600" />;
      default:
        return <CheckCircleOutlined className="text-green-600" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Buy":
        return <ShoppingCartOutlined className="text-green-600" />;
      case "Sell":
        return <BankOutlined className="text-blue-600" />;
      case "Dividend":
        return <DollarOutlined className="text-purple-600" />;
      default:
        return <SwapOutlined className="text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Buy":
        return "green";
      case "Sell":
        return "blue";
      case "Dividend":
        return "purple";
      default:
        return "default";
    }
  };

  const handleDelete = (id: number) => {
    onDelete(id);
  };

  const columns = [
    {
      title: "Hoạt động",
      key: "operation",
      width: 100,
      render: (record: Transaction) => (
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 mt-1">
            <Tag
              color={getTypeColor(
                TRANSACTION_TYPE_DISPLAY[record.transactionType]
              )}
            >
              {record.transactionType}
            </Tag>
          </div>
        </div>
      ),
    },
    {
      title: "Giao dịch",
      key: "transaction",
      width: 250,
      render: (record: Transaction) => (
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold shadow-lg">
              {record.symbol?.substring(0, 2) || "ST"}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
              {getTypeIcon(TRANSACTION_TYPE_DISPLAY[record.transactionType])}
            </div>
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-base">
              <span className="text-sm text-gray-500">#{record.id} </span>
              {record.symbol || `Stock #${record.stockId}`}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Ngày & Giờ",
      key: "date",
      width: 160,
      render: (record: Transaction) => {
        const date = new Date(record.transactionDate);
        return (
          <div>
            <div className="font-medium text-gray-900">
              {date.toLocaleDateString("vi-VN")}
            </div>
            <div className="text-sm text-gray-500">
              {date.toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        );
      },
      sorter: (a: Transaction, b: Transaction) =>
        new Date(a.transactionDate).getTime() -
        new Date(b.transactionDate).getTime(),
    },
    {
      title: "Số lượng & Giá",
      key: "quantity",
      width: 160,
      render: (record: Transaction) => (
        <div>
          <div className="font-semibold text-gray-900">
            {record.quantity.toLocaleString()}{" "}
            {record.transactionType === 3 ? "đơn vị" : "cổ phiếu"}
          </div>
          <div className="text-sm text-gray-500">
            @{" "}
            {record.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </div>
        </div>
      ),
    },
    {
      title: "Tổng giá trị",
      key: "total",
      width: 150,
      render: (record: Transaction) => (
        <div>
          <div className="font-bold text-gray-900 text-lg">
            {record.totalAmount.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </div>
          {(record.fees || record.commission) && (
            <div className="text-xs text-gray-500">
              Phí:{" "}
              {(record.fees || record.commission || 0).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </div>
          )}
        </div>
      ),
      sorter: (a: Transaction, b: Transaction) => a.totalAmount - b.totalAmount,
    },
    {
      title: "Trạng thái",
      key: "status",
      width: 120,
      render: (record: Transaction) => (
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            {getStatusIcon(record.status)}
          </div>
          <Tag
            color={
              record.status === "Completed"
                ? "success"
                : record.status === "Pending"
                ? "processing"
                : record.status === "Failed"
                ? "error"
                : "success"
            }
            className="text-xs"
          >
            {record.status === "Completed"
              ? "Hoàn thành"
              : record.status === "Pending"
              ? "Đang xử lý"
              : record.status === "Failed"
              ? "Thất bại"
              : "Hoàn thành"}
          </Tag>
        </div>
      ),
      filters: [
        { text: "Hoàn thành", value: "Completed" },
        { text: "Đang xử lý", value: "Pending" },
        { text: "Thất bại", value: "Failed" },
      ],
      onFilter: (value: any, record: Transaction) =>
        (record.status || "Completed") === value,
    },
    {
      title: "Thao tác",
      key: "actions",
      width: 120,
      render: (record: Transaction) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              className="text-blue-600 hover:bg-blue-50"
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={() =>
                confirm({
                  title: "Xác nhận xóa giao dịch",
                  content:
                    "Bạn có chắc chắn muốn xóa giao dịch này? Hành động này không thể hoàn tác.",
                  onOk: () => {
                    handleDelete(record.id);
                  },
                })
              }
              className="text-red-600 hover:bg-red-50"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={transactions}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 15,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} của ${total} giao dịch`,
          pageSizeOptions: ["10", "15", "25", "50"],
        }}
        scroll={{ x: 1200 }}
        className="transaction-table"
        rowClassName="hover:bg-gray-50 cursor-pointer"
      />

      <style>{`
        .transaction-table .ant-table-thead > tr > th {
          background-color: #f8fafc;
          font-weight: 600;
          color: #374151;
          border-bottom: 2px solid #e5e7eb;
        }
        .transaction-table .ant-table-tbody > tr:hover > td {
          background-color: #f9fafb !important;
        }
      `}</style>
    </>
  );
};
