import {
  Avatar,
  Badge,
  Button,
  Progress,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import {
  BellOutlined,
  DeleteOutlined,
  EditOutlined,
  FallOutlined,
  RiseOutlined,
  ShoppingCartOutlined,
  StarFilled,
} from "@ant-design/icons";
import { WatchlistItem } from "../../Models/Watchlist";

const { Text } = Typography;

interface WatchlistTableColumnsProps {
  onEdit: (record: WatchlistItem) => void;
  onDelete: (id: number) => void;
}

export const useWatchlistTableColumns = ({
  onEdit,
  onDelete,
}: WatchlistTableColumnsProps) => {
  const getPriorityColor = (priority: number) => {
    if (priority >= 4) return "#f5222d";
    if (priority === 3) return "#fa8c16";
    return "#52c41a";
  };

  const getPriorityText = (priority: number) => {
    if (priority >= 4) return "High";
    if (priority === 3) return "Medium";
    return "Low";
  };

  return [
    {
      title: "Asset",
      key: "asset",
      width: 200,
      render: (record: WatchlistItem) => (
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar
              size={40}
              style={{ backgroundColor: record.color }}
              className="text-white font-bold"
            >
              {record.symbol.charAt(0)}
            </Avatar>
            <StarFilled className="absolute -top-1 -right-1 text-yellow-500 text-xs" />
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-base">
              {record.symbol}
            </div>
            <div className="text-sm text-gray-500">{record.companyName}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Current Price",
      key: "price",
      width: 130,
      render: (record: WatchlistItem) => (
        <div>
          <div className="font-bold text-gray-900">
            ${record.currentPrice.toFixed(2)}
          </div>
          <div
            className={`text-sm flex items-center space-x-1 ${
              record.change >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {record.change >= 0 ? <RiseOutlined /> : <FallOutlined />}
            <span>
              {record.change >= 0 ? "+" : ""}
              {record.changePercent.toFixed(2)}%
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Target / Stop Loss",
      key: "targets",
      width: 150,
      render: (record: WatchlistItem) => (
        <div>
          <div className="text-sm">
            <span className="text-green-600 font-medium">
              Target: ${record.targetPrice.toFixed(2)}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-red-600 font-medium">
              Stop: ${record.stopLoss.toFixed(2)}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Priority",
      key: "priority",
      width: 100,
      render: (record: WatchlistItem) => (
        <div className="text-center">
          <Tag
            color={
              record.priority >= 4
                ? "red"
                : record.priority === 3
                ? "orange"
                : "green"
            }
            className="font-medium"
          >
            {getPriorityText(record.priority)}
          </Tag>
          <div className="mt-1">
            <Progress
              type="circle"
              percent={record.priority * 20}
              width={24}
              strokeColor={getPriorityColor(record.priority)}
              showInfo={false}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Alert Status",
      key: "alert",
      width: 120,
      render: (record: WatchlistItem) => (
        <div className="text-center">
          {record.alertTriggered ? (
            <div>
              <Badge status="processing" />
              <Tag color="orange" icon={<BellOutlined />}>
                Triggered
              </Tag>
            </div>
          ) : (
            <div>
              <Badge status="default" />
              <Tag color="default">Watching</Tag>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      width: 150,
      render: (text: string) => (
        <Tooltip title={text}>
          <Text className="text-gray-600" ellipsis>
            {text}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (record: WatchlistItem) => (
        <Space>
          <Tooltip title="Edit Watchlist Item">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              className="text-blue-600 hover:bg-blue-50"
            />
          </Tooltip>
          <Tooltip title="Quick Trade">
            <Button
              type="text"
              icon={<ShoppingCartOutlined />}
              className="text-green-600 hover:bg-green-50"
            />
          </Tooltip>
          <Tooltip title="Remove from Watchlist">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => onDelete(record.id)}
              className="text-red-600 hover:bg-red-50"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
};
