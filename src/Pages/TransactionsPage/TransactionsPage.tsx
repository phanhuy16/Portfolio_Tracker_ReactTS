import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  DatePicker,
  Tag,
  Select,
  Input,
  Button,
  Typography,
  Row,
  Col,
  Statistic,
  Space,
  Tooltip,
  Badge,
  Avatar,
  Modal,
  Form,
  InputNumber,
  message,
  Spin,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
  ShoppingCartOutlined,
  BankOutlined,
  SwapOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;
const { Option } = Select;

// Type definitions matching backend
interface TransactionDto {
  id: number;
  stockId: number;
  stockSymbol?: string;
  stockName?: string;
  transactionType: "Buy" | "Sell";
  quantity: number;
  price: number;
  totalAmount: number;
  transactionDate: string;
  userId: string;
  fees?: number;
  status?: "Completed" | "Pending" | "Failed";
}

interface CreateTransactionDto {
  stockId: number;
  transactionType: "Buy" | "Sell";
  quantity: number;
  price: number;
  transactionDate: string;
}

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<TransactionDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [dateRange, setDateRange] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<TransactionDto | null>(null);
  const [form] = Form.useForm();

  // API calls
  const api = axios.create({
    baseURL: "https://localhost:7007/api/client/transaction",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await api.get("/user");
      setTransactions(response.data);
    } catch (error) {
      message.error("Failed to fetch transactions");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactionsByDateRange = async (
    startDate: string,
    endDate: string
  ) => {
    setLoading(true);
    try {
      const response = await api.get(
        `/date-range?startDate=${startDate}&endDate=${endDate}`
      );
      setTransactions(response.data);
    } catch (error) {
      message.error("Failed to fetch transactions by date range");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (values: CreateTransactionDto) => {
    try {
      const response = await api.post("/add-transaction", values);
      message.success("Transaction created successfully");
      fetchTransactions();
      return response.data;
    } catch (error) {
      message.error("Failed to create transaction");
      throw error;
    }
  };

  const updateTransaction = async (
    id: number,
    values: CreateTransactionDto
  ) => {
    try {
      const response = await api.put(`/update-transaction/${id}`, values);
      message.success("Transaction updated successfully");
      fetchTransactions();
      return response.data;
    } catch (error) {
      message.error("Failed to update transaction");
      throw error;
    }
  };

  const deleteTransaction = async (id: number) => {
    try {
      await api.delete(`/delete-transaction/${id}`);
      message.success("Transaction deleted successfully");
      fetchTransactions();
    } catch (error) {
      message.error("Failed to delete transaction");
      throw error;
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (dateRange && dateRange.length === 2) {
      const startDate = dateRange[0].format("YYYY-MM-DD");
      const endDate = dateRange[1].format("YYYY-MM-DD");
      fetchTransactionsByDateRange(startDate, endDate);
    } else if (!dateRange) {
      fetchTransactions();
    }
  }, [dateRange]);

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
      default:
        return <SwapOutlined className="text-gray-500" />;
    }
  };

  const handleEdit = (transaction: TransactionDto) => {
    setEditingTransaction(transaction);
    form.setFieldsValue({
      stockId: transaction.stockId,
      transactionType: transaction.transactionType,
      quantity: transaction.quantity,
      price: transaction.price,
      transactionDate: new Date(transaction.transactionDate),
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this transaction?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => deleteTransaction(id),
    });
  };

  const handleSubmit = async (values: any) => {
    try {
      const transactionData: CreateTransactionDto = {
        ...values,
        transactionDate: values.transactionDate.toISOString(),
      };

      if (editingTransaction) {
        await updateTransaction(editingTransaction.id, transactionData);
      } else {
        await createTransaction(transactionData);
      }

      setIsModalVisible(false);
      setEditingTransaction(null);
      form.resetFields();
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  const columns = [
    {
      title: "Transaction",
      key: "transaction",
      width: 200,
      render: (record: TransactionDto) => (
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500 text-white font-bold shadow-md">
              {record.stockSymbol?.substring(0, 2) || "ST"}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
              {getTypeIcon(record.transactionType)}
            </div>
          </div>
          <div>
            <div className="font-semibold text-gray-900">
              {record.stockName ||
                record.stockSymbol ||
                `Stock #${record.stockId}`}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">#{record.id}</span>
              <Tag color={record.transactionType === "Buy" ? "green" : "blue"}>
                {record.transactionType}
              </Tag>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Date & Time",
      key: "date",
      width: 160,
      render: (record: TransactionDto) => {
        const date = new Date(record.transactionDate);
        return (
          <div>
            <div className="font-medium text-gray-900">
              {date.toLocaleDateString()}
            </div>
            <div className="text-sm text-gray-500">
              {date.toLocaleTimeString()}
            </div>
          </div>
        );
      },
      sorter: (a: TransactionDto, b: TransactionDto) =>
        new Date(a.transactionDate).getTime() -
        new Date(b.transactionDate).getTime(),
    },
    {
      title: "Quantity & Price",
      key: "quantity",
      width: 150,
      render: (record: TransactionDto) => (
        <div>
          <div className="font-semibold text-gray-900">
            {record.quantity} shares
          </div>
          <div className="text-sm text-gray-500">
            @ ${record.price.toLocaleString()}
          </div>
        </div>
      ),
    },
    {
      title: "Total Value",
      key: "total",
      width: 130,
      render: (record: TransactionDto) => (
        <div>
          <div className="font-bold text-gray-900 text-lg">
            ${record.totalAmount.toLocaleString()}
          </div>
          {record.fees && (
            <div className="text-xs text-gray-500">Fees: ${record.fees}</div>
          )}
        </div>
      ),
      sorter: (a: TransactionDto, b: TransactionDto) =>
        a.totalAmount - b.totalAmount,
    },
    {
      title: "Status",
      key: "status",
      width: 100,
      render: (record: TransactionDto) => (
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
            {record.status || "Completed"}
          </Tag>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (record: TransactionDto) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              className="text-blue-600"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
              className="text-red-600"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const filteredData = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.stockName?.toLowerCase().includes(searchText.toLowerCase()) ||
      transaction.stockSymbol
        ?.toLowerCase()
        .includes(searchText.toLowerCase()) ||
      transaction.id.toString().includes(searchText.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (transaction.status || "Completed") === filterStatus;
    const matchesType =
      filterType === "all" || transaction.transactionType === filterType;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Summary calculations
  const totalVolume = filteredData.reduce((sum, tx) => sum + tx.totalAmount, 0);
  const totalFees = filteredData.reduce((sum, tx) => sum + (tx.fees || 0), 0);
  const completedTransactions = filteredData.filter(
    (tx) => (tx.status || "Completed") === "Completed"
  ).length;
  const pendingTransactions = filteredData.filter(
    (tx) => tx.status === "Pending"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Title level={2} className="!mb-2 text-gray-900">
              Transaction History
            </Title>
            <Text className="text-gray-600 text-lg">
              Track all your trading activities and transactions
            </Text>
          </div>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => {
                setEditingTransaction(null);
                form.resetFields();
                setIsModalVisible(true);
              }}
            >
              New Transaction
            </Button>
            <Button
              icon={<DownloadOutlined />}
              size="large"
              className="shadow-md"
            >
              Export Report
            </Button>
          </Space>
        </div>

        {/* Summary Statistics */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} sm={6}>
            <Card className="border-0 shadow-md text-center">
              <div className="p-4">
                <div className="flex items-center justify-center mb-3">
                  <Avatar
                    size={48}
                    className="bg-blue-100"
                    icon={<SwapOutlined className="text-blue-600" />}
                  />
                </div>
                <Statistic
                  title="Total Volume"
                  value={totalVolume}
                  precision={0}
                  prefix="$"
                  valueStyle={{ fontSize: "20px", fontWeight: "bold" }}
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
                    icon={<CheckCircleOutlined className="text-green-600" />}
                  />
                </div>
                <Statistic
                  title="Completed"
                  value={completedTransactions}
                  valueStyle={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#059669",
                  }}
                />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card className="border-0 shadow-md text-center">
              <div className="p-4">
                <div className="flex items-center justify-center mb-3">
                  <Badge count={pendingTransactions} offset={[8, -8]}>
                    <Avatar
                      size={48}
                      className="bg-orange-100"
                      icon={<ClockCircleOutlined className="text-orange-500" />}
                    />
                  </Badge>
                </div>
                <Statistic
                  title="Pending"
                  value={pendingTransactions}
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
                    className="bg-purple-100"
                    icon={<BankOutlined className="text-purple-600" />}
                  />
                </div>
                <Statistic
                  title="Total Fees"
                  value={totalFees}
                  precision={2}
                  prefix="$"
                  valueStyle={{ fontSize: "20px", fontWeight: "bold" }}
                />
              </div>
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Card className="mb-6 border-0 shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Input
                placeholder="Search transactions..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full sm:w-64"
              />
              <Select
                value={filterType}
                onChange={setFilterType}
                className="w-full sm:w-32"
                placeholder="Type"
              >
                <Option value="all">All Types</Option>
                <Option value="Buy">Buy</Option>
                <Option value="Sell">Sell</Option>
              </Select>
              <Select
                value={filterStatus}
                onChange={setFilterStatus}
                className="w-full sm:w-36"
                placeholder="Status"
              >
                <Option value="all">All Status</Option>
                <Option value="Completed">Completed</Option>
                <Option value="Pending">Pending</Option>
                <Option value="Failed">Failed</Option>
              </Select>
            </div>
            <div className="flex items-center space-x-4">
              <RangePicker
                value={dateRange}
                onChange={setDateRange}
                className="w-full sm:w-auto"
              />
              <Button
                icon={<FilterOutlined />}
                onClick={() => {
                  setSearchText("");
                  setFilterType("all");
                  setFilterStatus("all");
                  setDateRange(null);
                }}
              >
                Clear
              </Button>
            </div>
          </div>
        </Card>

        {/* Transactions Table */}
        <Card className="border-0 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CalendarOutlined className="text-gray-500" />
              <Text className="text-gray-600">
                Showing {filteredData.length} transactions
              </Text>
            </div>
            <Space>
              <Tag color="success">{completedTransactions} Completed</Tag>
              <Tag color="processing">{pendingTransactions} Pending</Tag>
            </Space>
          </div>

          <Spin spinning={loading}>
            <Table
              columns={columns}
              dataSource={filteredData}
              rowKey="id"
              pagination={{
                pageSize: 15,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} transactions`,
              }}
              scroll={{ x: 1000 }}
              className="transactions-table"
            />
          </Spin>
        </Card>

        {/* Transaction Modal */}
        <Modal
          title={editingTransaction ? "Edit Transaction" : "New Transaction"}
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            setEditingTransaction(null);
            form.resetFields();
          }}
          footer={null}
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="mt-4"
          >
            <Form.Item
              name="stockId"
              label="Stock ID"
              rules={[{ required: true, message: "Please enter stock ID" }]}
            >
              <InputNumber
                min={1}
                className="w-full"
                placeholder="Enter stock ID"
              />
            </Form.Item>

            <Form.Item
              name="transactionType"
              label="Transaction Type"
              rules={[
                { required: true, message: "Please select transaction type" },
              ]}
            >
              <Select placeholder="Select transaction type">
                <Option value="Buy">Buy</Option>
                <Option value="Sell">Sell</Option>
              </Select>
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="quantity"
                  label="Quantity"
                  rules={[{ required: true, message: "Please enter quantity" }]}
                >
                  <InputNumber
                    min={0.01}
                    step={0.01}
                    className="w-full"
                    placeholder="Enter quantity"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="price"
                  label="Price per Share"
                  rules={[{ required: true, message: "Please enter price" }]}
                >
                  <InputNumber
                    min={0.01}
                    step={0.01}
                    className="w-full"
                    placeholder="Enter price"
                    prefix="$"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="transactionDate"
              label="Transaction Date"
              rules={[
                { required: true, message: "Please select transaction date" },
              ]}
            >
              <DatePicker showTime className="w-full" />
            </Form.Item>

            <Form.Item className="mb-0 text-right">
              <Space>
                <Button
                  onClick={() => {
                    setIsModalVisible(false);
                    setEditingTransaction(null);
                    form.resetFields();
                  }}
                >
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  {editingTransaction ? "Update" : "Create"} Transaction
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <style>{`
        .transactions-table .ant-table-tbody > tr:hover > td {
          background-color: #f9fafb !important;
        }
        .transactions-table .ant-table-thead > tr > th {
          background-color: #f8fafc;
          font-weight: 600;
          color: #374151;
        }
        .transactions-table .ant-table-row {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default TransactionsPage;
