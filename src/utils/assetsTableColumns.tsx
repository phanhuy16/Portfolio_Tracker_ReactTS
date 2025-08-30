// utils/assetsTableColumns.tsx
import { Button, Dropdown, Progress, Space, Tag, Tooltip } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  FallOutlined,
  MoreOutlined,
  RiseOutlined,
  ShoppingCartOutlined,
  StarOutlined,
} from "@ant-design/icons";

export const getRiskColor = (risk: string) => {
  switch (risk) {
    case "low":
      return "#10B981";
    case "medium":
      return "#F59E0B";
    case "high":
      return "#EF4444";
    default:
      return "#6B7280";
  }
};

export const getMoreActions = (record: any) => [
  {
    key: "edit",
    icon: <EditOutlined />,
    label: "Edit Holdings",
  },
  {
    key: "favorite",
    icon: <StarOutlined />,
    label: record.favorite ? "Remove from Favorites" : "Add to Favorites",
  },
  {
    key: "delete",
    icon: <DeleteOutlined />,
    label: "Remove Asset",
    danger: true,
  },
];

export const assetsTableColumns = [
  {
    title: "Asset",
    key: "asset",
    width: 200,
    render: (record: any) => (
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md"
            style={{ backgroundColor: record.color }}
          >
            {record.icon}
          </div>
          {record.favorite && (
            <StarOutlined className="absolute -top-1 -right-1 text-yellow-500 text-xs bg-white rounded-full p-1" />
          )}
        </div>
        <div>
          <div className="font-semibold text-gray-900 text-base">
            {record.name}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">{record.symbol}</span>
            <Tag
              color={
                record.type === "Crypto"
                  ? "purple"
                  : record.type === "Stock"
                  ? "blue"
                  : "green"
              }
            >
              {record.type}
            </Tag>
          </div>
        </div>
      </div>
    ),
    sorter: (a: any, b: any) => a.name.localeCompare(b.name),
  },
  {
    title: "Holdings",
    key: "holdings",
    width: 150,
    render: (record: any) => (
      <div>
        <div className="font-semibold text-gray-900">
          {record.quantity} {record.type === "Stock" ? "shares" : record.symbol}
        </div>
        <div className="text-sm text-gray-500">
          Avg: ${record.avgPrice.toLocaleString()}
        </div>
      </div>
    ),
    sorter: (a: any, b: any) => a.quantity - b.quantity,
  },
  {
    title: "Current Price",
    key: "currentPrice",
    width: 130,
    render: (record: any) => (
      <div>
        <div className="font-semibold text-gray-900">
          ${record.currentPrice.toLocaleString()}
        </div>
        <div className="text-xs text-gray-500">Vol: {record.volume24h}</div>
      </div>
    ),
    sorter: (a: any, b: any) => a.currentPrice - b.currentPrice,
  },
  {
    title: "Total Value",
    key: "value",
    width: 150,
    render: (record: any) => (
      <div>
        <div className="font-bold text-gray-900 text-lg">
          ${record.value.toLocaleString()}
        </div>
        <div className="flex items-center space-x-2">
          <Progress
            percent={record.allocation}
            size="small"
            showInfo={false}
            strokeColor={record.color}
            className="w-16"
          />
          <span className="text-sm text-gray-500">{record.allocation}%</span>
        </div>
      </div>
    ),
    sorter: (a: any, b: any) => a.value - b.value,
    defaultSortOrder: "descend" as const,
  },
  {
    title: "P&L",
    key: "pnl",
    width: 120,
    render: (record: any) => (
      <div className="text-center">
        <div
          className={`flex items-center justify-center space-x-1 font-bold ${
            record.pnl >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {record.pnl >= 0 ? <RiseOutlined /> : <FallOutlined />}
          <span>
            {record.pnl >= 0 ? "+" : ""}
            {record.pnl.toFixed(2)}%
          </span>
        </div>
        <div
          className={`text-sm font-medium ${
            record.pnlValue >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {record.pnlValue >= 0 ? "+$" : "-$"}
          {Math.abs(record.pnlValue).toLocaleString()}
        </div>
      </div>
    ),
    sorter: (a: any, b: any) => a.pnl - b.pnl,
  },
  {
    title: "Risk Level",
    key: "risk",
    width: 100,
    render: (record: any) => (
      <div className="text-center">
        <Tag
          color={
            record.risk === "low"
              ? "green"
              : record.risk === "medium"
              ? "orange"
              : "red"
          }
          className="capitalize font-medium"
        >
          {record.risk}
        </Tag>
        <div className="mt-1">
          <Progress
            type="circle"
            percent={
              record.risk === "low" ? 30 : record.risk === "medium" ? 60 : 90
            }
            width={24}
            strokeColor={getRiskColor(record.risk)}
            showInfo={false}
          />
        </div>
      </div>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    width: 120,
    render: (record: any) => (
      <Space>
        <Tooltip title="Quick Trade">
          <Button
            type="text"
            icon={<ShoppingCartOutlined />}
            className="text-blue-600 hover:bg-blue-50"
          />
        </Tooltip>
        <Dropdown menu={{ items: getMoreActions(record) }} trigger={["click"]}>
          <Button
            type="text"
            icon={<MoreOutlined />}
            className="text-gray-600 hover:bg-gray-50"
          />
        </Dropdown>
      </Space>
    ),
  },
];
