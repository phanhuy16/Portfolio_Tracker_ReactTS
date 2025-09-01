import { Button, Form, Modal, Row, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { WatchlistItem } from "../../Models/Watchlist";
import { useWatchlistData } from "../../hooks/useWatchlistData";
import { WatchlistAlerts } from "../../Components/Watchlist/WatchlistAlerts";
import { WatchlistSummaryCard } from "../../Components/Watchlist/WatchlistSummaryCard";
import { WatchlistTable } from "../../Components/Watchlist/WatchlistTable";
import { WatchlistModals } from "../../Components/Watchlist/WatchlistModals";
const { Title, Text } = Typography;

const WatchlistPage = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WatchlistItem | null>(null);
  const [form] = Form.useForm();

  const { watchlistData, watchlistSummary, triggeredAlerts } =
    useWatchlistData();

  const handleAdd = () => setIsAddModalVisible(true);

  const handleEdit = (record: WatchlistItem) => {
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
      },
    });
  };

  const handleAddSubmit = () => {
    form.validateFields().then((values) => {
      console.log("Add to watchlist:", values);
      setIsAddModalVisible(false);
      form.resetFields();
    });
  };

  const handleEditSubmit = () => {
    form.validateFields().then((values) => {
      console.log("Update watchlist:", values);
      setIsEditModalVisible(false);
      form.resetFields();
      setSelectedItem(null);
    });
  };

  const clearTriggeredAlerts = () => {
    const triggeredIds = triggeredAlerts.map((alert) => alert.id);
    console.log("Clear alerts for:", triggeredIds);
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

        {/* Alerts */}
        <WatchlistAlerts
          triggeredAlerts={triggeredAlerts}
          onClearAlerts={clearTriggeredAlerts}
        />

        {/* Summary */}
        <Row gutter={[24, 24]} className="mb-8">
          <WatchlistSummaryCard summary={watchlistSummary} />
        </Row>

        {/* Table */}
        <WatchlistTable
          data={watchlistData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Modals */}
        <WatchlistModals
          isAddModalVisible={isAddModalVisible}
          isEditModalVisible={isEditModalVisible}
          selectedItem={selectedItem}
          form={form}
          onAddSubmit={handleAddSubmit}
          onEditSubmit={handleEditSubmit}
          onAddCancel={() => {
            setIsAddModalVisible(false);
            form.resetFields();
          }}
          onEditCancel={() => {
            setIsEditModalVisible(false);
            form.resetFields();
            setSelectedItem(null);
          }}
        />
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
