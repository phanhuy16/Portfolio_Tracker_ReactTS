// src/pages/TransactionsPage.tsx
import React, { useState } from "react";
import { Button, Typography, Space, Tag, Spin, Alert } from "antd";
import {
  PlusOutlined,
  DownloadOutlined,
  CalendarOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import {
  CreateTransactionRequest,
  Transaction,
} from "../../Models/Transaction";
import { useTransactions } from "../../hooks/useTransactions";
import { TransactionSummaryComponent } from "../../Components/Transactions/TransactionSummary";
import { TransactionFiltersComponent } from "../../Components/Transactions/TransactionFilters";
import { TransactionTable } from "../../Components/Transactions/TransactionTable";
import { TransactionFormModal } from "../../Components/Transactions/TransactionFormModal";

const { Title, Text } = Typography;

const TransactionsPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const {
    // Data
    transactions,
    transactionSummary,

    // State
    loading,
    error,
    filters,

    // Actions
    createTransaction,
    updateTransaction,
    deleteTransaction,

    // Filter actions
    updateFilters,
    clearFilters,
    handleDateRangeFilter,
  } = useTransactions();

  // Modal handlers
  const handleOpenModal = (transaction?: Transaction) => {
    setEditingTransaction(transaction || null);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingTransaction(null);
  };

  const handleSubmit = async (values: CreateTransactionRequest) => {
    try {
      if (editingTransaction) {
        await updateTransaction(editingTransaction.id, values);
      } else {
        await createTransaction(values);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error saving transaction:", error);
      throw error; // Let the modal handle the error display
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTransaction(id);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const handleExportReport = () => {
    // TODO: Implement export functionality
    console.log("Export report functionality to be implemented");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <TrophyOutlined className="text-2xl text-white" />
            </div>
            <div>
              <Title
                level={1}
                className="!mb-2 text-gray-900 !text-3xl font-bold"
              >
                Lịch sử giao dịch
              </Title>
              <Text className="text-gray-600 text-lg">
                Theo dõi tất cả hoạt động giao dịch và đầu tư của bạn
              </Text>
            </div>
          </div>

          <Space size="middle">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => handleOpenModal()}
              className="h-12 px-6 bg-gradient-to-r from-blue-500 to-blue-600 border-0 shadow-lg hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Giao dịch mới
            </Button>
            <Button
              icon={<DownloadOutlined />}
              size="large"
              onClick={handleExportReport}
              className="h-12 px-6 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Xuất báo cáo
            </Button>
          </Space>
        </div>

        {/* Error Display */}
        {error && (
          <Alert
            message="Có lỗi xảy ra"
            description={error}
            type="error"
            showIcon
            className="mb-6"
            closable
          />
        )}

        {/* Summary Statistics */}
        <TransactionSummaryComponent
          summary={transactionSummary}
          loading={loading}
        />

        {/* Filters */}
        <TransactionFiltersComponent
          filters={filters}
          onFiltersChange={updateFilters}
          onClearFilters={clearFilters}
          onDateRangeChange={handleDateRangeFilter}
          loading={loading}
        />

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl border-0 overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CalendarOutlined className="text-xl text-gray-500" />
                <div>
                  <Text className="text-gray-900 font-semibold text-lg">
                    Danh sách giao dịch
                  </Text>
                  <Text className="block text-gray-500 text-sm">
                    Hiển thị {transactions.length} giao dịch
                  </Text>
                </div>
              </div>

              <Space size="middle">
                <Tag color="success" className="px-3 py-1">
                  {transactionSummary.completedCount} Hoàn thành
                </Tag>
                {transactionSummary.pendingCount > 0 && (
                  <Tag color="processing" className="px-3 py-1">
                    {transactionSummary.pendingCount} Đang xử lý
                  </Tag>
                )}
                {transactionSummary.failedCount > 0 && (
                  <Tag color="error" className="px-3 py-1">
                    {transactionSummary.failedCount} Thất bại
                  </Tag>
                )}
              </Space>
            </div>
          </div>

          {/* Table Content */}
          <div className="p-6">
            <Spin spinning={loading} size="large">
              <TransactionTable
                transactions={transactions}
                loading={loading}
                onEdit={handleOpenModal}
                onDelete={handleDelete}
              />
            </Spin>
          </div>
        </div>

        {/* Transaction Form Modal */}
        <TransactionFormModal
          visible={isModalVisible}
          onCancel={handleCloseModal}
          onSubmit={handleSubmit}
          editingTransaction={editingTransaction}
          loading={loading}
        />
      </div>

      {/* Global Styles */}
      <style>{`
        .ant-table-thead > tr > th {
          background-color: #f8fafc !important;
          font-weight: 600 !important;
          color: #374151 !important;
          border-bottom: 2px solid #e5e7eb !important;
        }

        .ant-table-tbody > tr:hover > td {
          background-color: #f9fafb !important;
        }

        .ant-card {
          border-radius: 16px !important;
        }

        .ant-btn-primary {
          border-radius: 10px !important;
        }

        .ant-input,
        .ant-select-selector,
        .ant-picker {
          border-radius: 8px !important;
        }

        /* Custom scrollbar */
        .ant-table-body::-webkit-scrollbar {
          height: 8px;
        }

        .ant-table-body::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }

        .ant-table-body::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 4px;
        }

        .ant-table-body::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }

        /* Animation for cards */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 40px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        .ant-card {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TransactionsPage;
