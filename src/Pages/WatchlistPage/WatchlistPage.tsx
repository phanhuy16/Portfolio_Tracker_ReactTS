import {
  BellOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FallOutlined,
  PlusOutlined,
  RiseOutlined,
  ShoppingCartOutlined,
  StarFilled,
  WarningOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Progress,
  Row,
  Select,
  Space,
  Statistic,
  Switch,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { useState } from "react";

const { Title, Text } = Typography;
const { Option } = Select;

const WatchlistPage = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [form] = Form.useForm();

  // Mock data from WatchlistController endpoints
  const watchlistSummary = {
    totalItems: 12,
    triggeredAlerts: 3,
    highPriority: 4,
    totalValue: 245670.5,
    todayChange: 2.34,
  };

  const watchlistData = [
    {
      id: 1,
      stockId: 1,
      symbol: "AAPL",
      companyName: "Apple Inc",
      currentPrice: 182.52,
      targetPrice: 190.0,
      stopLoss: 170.0,
      priority: 3,
      alertTriggered: false,
      change: 1.25,
      changePercent: 0.69,
      volume: "52.3M",
      notes: "Waiting for earnings report",
      dateAdded: "2024-01-10",
      color: "#A6AAAE",
    },
    {
      id: 2,
      stockId: 2,
      symbol: "TSLA",
      companyName: "Tesla Inc",
      currentPrice: 248.5,
      targetPrice: 300.0,
      stopLoss: 220.0,
      priority: 5,
      alertTriggered: true,
      change: 8.75,
      changePercent: 3.65,
      volume: "32.1M",
      notes: "Strong momentum",
      dateAdded: "2024-01-08",
      color: "#CC0000",
    },
    {
      id: 3,
      stockId: 3,
      symbol: "NVDA",
      companyName: "NVIDIA Corp",
      currentPrice: 875.28,
      targetPrice: 900.0,
      stopLoss: 800.0,
      priority: 4,
      alertTriggered: true,
      change: 12.34,
      changePercent: 1.43,
      volume: "45.2M",
      notes: "AI sector leader",
      dateAdded: "2024-01-05",
      color: "#76B900",
    },
    {
      id: 4,
      stockId: 4,
      symbol: "META",
      companyName: "Meta Platforms Inc",
      currentPrice: 485.75,
      targetPrice: 520.0,
      stopLoss: 450.0,
      priority: 2,
      alertTriggered: false,
      change: -15.82,
      changePercent: -3.15,
      volume: "22.4M",
      notes: "Metaverse potential",
      dateAdded: "2024-01-03",
      color: "#4267B2",
    },
  ];

  const triggeredAlerts = watchlistData.filter((item) => item.alertTriggered);

  const getPriorityColor = (priority: number) => {
    if (priority >= 4) return "#f5222d"; // High - Red
    if (priority === 3) return "#fa8c16"; // Medium - Orange
    return "#52c41a"; // Low - Green
  };

  const getPriorityText = (priority: number) => {
    if (priority >= 4) return "High";
    if (priority === 3) return "Medium";
    return "Low";
  };

  const columns = [
    {
      title: "Asset",
      key: "asset",
      width: 200,
      render: (record: any) => (
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
      render: (record: any) => (
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
      render: (record: any) => (
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
      render: (record: any) => (
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
      render: (record: any) => (
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
      render: (record: any) => (
        <Space>
          <Tooltip title="Edit Watchlist Item">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
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
              onClick={() => handleDelete(record.id)}
              className="text-red-600 hover:bg-red-50"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setIsAddModalVisible(true);
  };

  const handleEdit = (record: any) => {
    setSelectedItem(record);
    setIsEditModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Remove from Watchlist",
      content: "Are you sure you want to remove this item from your watchlist?",
      onOk() {
        console.log("Delete watchlist item:", id);
        // Call WatchlistController delete endpoint
      },
    });
  };

  const handleAddSubmit = () => {
    form.validateFields().then((values) => {
      console.log("Add to watchlist:", values);
      setIsAddModalVisible(false);
      form.resetFields();
      // Call WatchlistController add endpoint
    });
  };

  const handleEditSubmit = () => {
    form.validateFields().then((values) => {
      console.log("Update watchlist:", values);
      setIsEditModalVisible(false);
      form.resetFields();
      setSelectedItem(null);
      // Call WatchlistController update endpoint
    });
  };

  const clearTriggeredAlerts = () => {
    const triggeredIds = triggeredAlerts.map((alert) => alert.id);
    console.log("Clear alerts for:", triggeredIds);
    // Call WatchlistController clear alerts endpoint
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Title level={2} className="!mb-2 text-gray-900">
              My Watchlist
            </Title>
            <Text className="text-gray-600 text-lg">
              Monitor your favorite stocks and set price alerts
            </Text>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 shadow-md"
          >
            Add to Watchlist
          </Button>
        </div>

        {/* Triggered Alerts */}
        {triggeredAlerts.length > 0 && (
          <Alert
            message={`You have ${triggeredAlerts.length} triggered alert(s)`}
            description={
              <div>
                <div className="mb-3">
                  {triggeredAlerts.map((alert) => (
                    <Tag key={alert.id} color="orange" className="mb-1">
                      {alert.symbol} - ${alert.currentPrice.toFixed(2)}
                    </Tag>
                  ))}
                </div>
                <Button
                  size="small"
                  onClick={clearTriggeredAlerts}
                  icon={<CheckCircleOutlined />}
                >
                  Clear All Alerts
                </Button>
              </div>
            }
            type="warning"
            showIcon
            closable
            className="mb-6"
          />
        )}

        {/* Summary Statistics */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} sm={6}>
            <Card className="border-0 shadow-md text-center">
              <div className="p-4">
                <div className="flex items-center justify-center mb-3">
                  <Avatar
                    size={48}
                    className="bg-blue-100"
                    icon={<EyeOutlined className="text-blue-600" />}
                  />
                </div>
                <Statistic
                  title="Total Watchlist"
                  value={watchlistSummary.totalItems}
                  valueStyle={{ fontSize: "20px", fontWeight: "bold" }}
                />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="border-0 shadow-md text-center">
              <div className="p-4">
                <div className="flex items-center justify-center mb-3">
                  <Badge count={watchlistSummary.triggeredAlerts}>
                    <Avatar
                      size={48}
                      className="bg-orange-100"
                      icon={<BellOutlined className="text-orange-600" />}
                    />
                  </Badge>
                </div>
                <Statistic
                  title="Active Alerts"
                  value={watchlistSummary.triggeredAlerts}
                  valueStyle={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#D97706",
                  }}
                />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="border-0 shadow-md text-center">
              <div className="p-4">
                <div className="flex items-center justify-center mb-3">
                  <Avatar
                    size={48}
                    className="bg-red-100"
                    icon={<WarningOutlined className="text-red-600" />}
                  />
                </div>
                <Statistic
                  title="High Priority"
                  value={watchlistSummary.highPriority}
                  valueStyle={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#DC2626",
                  }}
                />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="border-0 shadow-md text-center">
              <div className="p-4">
                <div className="flex items-center justify-center mb-3">
                  <Avatar
                    size={48}
                    className="bg-green-100"
                    icon={<RiseOutlined className="text-green-600" />}
                  />
                </div>
                <Statistic
                  title="Total Value"
                  value={watchlistSummary.totalValue}
                  precision={2}
                  prefix="$"
                  valueStyle={{ fontSize: "20px", fontWeight: "bold" }}
                />
              </div>
            </Card>
          </Col>
        </Row>

        {/* Watchlist Table */}
        <Card className="border-0 shadow-md">
          <Table
            columns={columns}
            dataSource={watchlistData}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }}
            scroll={{ x: 1200 }}
            className="watchlist-table"
          />
        </Card>

        {/* Add to Watchlist Modal */}
        <Modal
          title="Add to Watchlist"
          visible={isAddModalVisible}
          onOk={handleAddSubmit}
          onCancel={() => {
            setIsAddModalVisible(false);
            form.resetFields();
          }}
          width={600}
        >
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="stockId"
                  label="Select Stock"
                  rules={[{ required: true, message: "Please select a stock" }]}
                >
                  <Select placeholder="Search and select stock" showSearch>
                    <Option value={1}>AAPL - Apple Inc</Option>
                    <Option value={2}>TSLA - Tesla Inc</Option>
                    <Option value={3}>NVDA - NVIDIA Corp</Option>
                    <Option value={4}>META - Meta Platforms</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="priority"
                  label="Priority Level"
                  rules={[{ required: true, message: "Please set priority" }]}
                >
                  <Select placeholder="Select priority">
                    <Option value={1}>Low (1)</Option>
                    <Option value={2}>Low-Medium (2)</Option>
                    <Option value={3}>Medium (3)</Option>
                    <Option value={4}>High (4)</Option>
                    <Option value={5}>Very High (5)</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="targetPrice" label="Target Price">
                  <InputNumber
                    placeholder="0.00"
                    style={{ width: "100%" }}
                    min={0}
                    step={0.01}
                    addonBefore="$"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="stopLoss" label="Stop Loss">
                  <InputNumber
                    placeholder="0.00"
                    style={{ width: "100%" }}
                    min={0}
                    step={0.01}
                    addonBefore="$"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="notes" label="Notes">
              <Input.TextArea
                placeholder="Add your notes about this stock..."
                rows={3}
              />
            </Form.Item>
          </Form>
        </Modal>

        {/* Edit Watchlist Modal */}
        <Modal
          title="Edit Watchlist Item"
          visible={isEditModalVisible}
          onOk={handleEditSubmit}
          onCancel={() => {
            setIsEditModalVisible(false);
            form.resetFields();
            setSelectedItem(null);
          }}
          width={600}
        >
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="priority" label="Priority Level">
                  <Select placeholder="Select priority">
                    <Option value={1}>Low (1)</Option>
                    <Option value={2}>Low-Medium (2)</Option>
                    <Option value={3}>Medium (3)</Option>
                    <Option value={4}>High (4)</Option>
                    <Option value={5}>Very High (5)</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="alertTriggered" label="Alert Status">
                  <Switch
                    checkedChildren="Triggered"
                    unCheckedChildren="Watching"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="targetPrice" label="Target Price">
                  <InputNumber
                    style={{ width: "100%" }}
                    min={0}
                    step={0.01}
                    addonBefore="$"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="stopLoss" label="Stop Loss">
                  <InputNumber
                    style={{ width: "100%" }}
                    min={0}
                    step={0.01}
                    addonBefore="$"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="notes" label="Notes">
              <Input.TextArea rows={3} />
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <style>{`
        .watchlist-table .ant-table-tbody > tr:hover > td {
          background-color: #f9fafb !important;
        }
        .watchlist-table .ant-table-thead > tr > th {
          background-color: #f8fafc;
          font-weight: 600;
          color: #374151;
        }
      `}</style>
    </div>
  );
};

export default WatchlistPage;
