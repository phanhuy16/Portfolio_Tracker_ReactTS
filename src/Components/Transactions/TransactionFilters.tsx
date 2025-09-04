// src/components/TransactionFilters/TransactionFilters.tsx
import React from "react";
import { Card, Input, Select, Button, DatePicker, Space } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { TransactionFilters } from "../../Models/Transaction";

const { RangePicker } = DatePicker;
const { Option } = Select;

interface TransactionFiltersProps {
  filters: TransactionFilters;
  onFiltersChange: (filters: Partial<TransactionFilters>) => void;
  onClearFilters: () => void;
  onDateRangeChange: (dateRange: [string, string] | null) => void;
  loading?: boolean;
}

export const TransactionFiltersComponent: React.FC<TransactionFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  onDateRangeChange,
  loading = false,
}) => {
  const handleDateRangeChange = (dates: any) => {
    if (dates && dates.length === 2) {
      const dateRange: [string, string] = [
        dates[0].format("YYYY-MM-DD"),
        dates[1].format("YYYY-MM-DD"),
      ];
      onDateRangeChange(dateRange);
    } else {
      onDateRangeChange(null);
    }
  };

  const dateRangeValue = filters.dateRange
    ? [dayjs(filters.dateRange[0]), dayjs(filters.dateRange[1])]
    : null;

  return (
    <Card className="mb-6 border-0 shadow-lg">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left side filters */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
          <Input
            placeholder="Tìm kiếm giao dịch..."
            prefix={<SearchOutlined className="text-gray-400" />}
            value={filters.searchText}
            onChange={(e) => onFiltersChange({ searchText: e.target.value })}
            className="w-full sm:w-64 h-10"
            allowClear
          />

          <Select
            value={filters.type}
            onChange={(value) => onFiltersChange({ type: value })}
            className="w-full sm:w-40 h-10"
            placeholder="Loại giao dịch"
          >
            <Option value="all">Tất cả loại</Option>
            <Option value="Buy">Mua</Option>
            <Option value="Sell">Bán</Option>
            <Option value="Dividend">Cổ tức</Option>
          </Select>

          <Select
            value={filters.status}
            onChange={(value) => onFiltersChange({ status: value })}
            className="w-full sm:w-40 h-10"
            placeholder="Trạng thái"
          >
            <Option value="all">Tất cả trạng thái</Option>
            <Option value="Completed">Hoàn thành</Option>
            <Option value="Pending">Đang xử lý</Option>
            <Option value="Failed">Thất bại</Option>
          </Select>
        </div>

        {/* Right side filters */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <RangePicker
            value={dateRangeValue as any}
            onChange={handleDateRangeChange}
            className="w-full sm:w-auto h-10"
            placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
            format="DD/MM/YYYY"
            allowClear
          />

          <Space>
            <Button
              icon={<FilterOutlined />}
              onClick={onClearFilters}
              className="h-10"
              disabled={loading}
            >
              Xóa bộ lọc
            </Button>
          </Space>
        </div>
      </div>

      {/* Active filters indicator */}
      {(filters.searchText ||
        filters.type !== "all" ||
        filters.status !== "all" ||
        filters.dateRange) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Bộ lọc đang áp dụng:</span>
            {filters.searchText && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md">
                "{filters.searchText}"
              </span>
            )}
            {filters.type !== "all" && (
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md">
                {filters.type === "Buy"
                  ? "Mua"
                  : filters.type === "Sell"
                  ? "Bán"
                  : filters.type === "Dividend"
                  ? "Cổ tức"
                  : filters.type}
              </span>
            )}
            {filters.status !== "all" && (
              <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-md">
                {filters.status === "Completed"
                  ? "Hoàn thành"
                  : filters.status === "Pending"
                  ? "Đang xử lý"
                  : filters.status === "Failed"
                  ? "Thất bại"
                  : filters.status}
              </span>
            )}
            {filters.dateRange && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-md">
                {dayjs(filters.dateRange[0]).format("DD/MM/YYYY")} -{" "}
                {dayjs(filters.dateRange[1]).format("DD/MM/YYYY")}
              </span>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};
