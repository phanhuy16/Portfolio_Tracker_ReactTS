// components/BatchOperations.tsx
import { useState } from "react";
import {
  Button,
  Card,
  Select,
  Space,
  Typography,
  message,
  Popconfirm,
  Tag,
} from "antd";
import {
  ReloadOutlined,
  BarChartOutlined,
  ClockCircleOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { StockService } from "../../../Services/StockService";

const { Title, Text } = Typography;
const { Option } = Select;

interface BatchOperationsProps {
  selectedSymbols?: string[];
  onRefreshData: () => void;
}

export const BatchOperations = ({
  selectedSymbols = [],
  onRefreshData,
}: BatchOperationsProps) => {
  const [loading, setLoading] = useState({
    batchUpdate: false,
    updateAll: false,
    updateOHLCV: false,
    bulkHistorical: false,
  });

  const [historicalDays, setHistoricalDays] = useState<number>(30);

  // Update prices for selected stocks
  const handleBatchUpdatePrices = async () => {
    if (selectedSymbols.length === 0) {
      message.warning("Please select at least one stock to update");
      return;
    }

    setLoading((prev) => ({ ...prev, batchUpdate: true }));
    try {
      const result = await StockService.batchUpdatePrices(selectedSymbols);
      message.success(
        `Successfully updated prices for ${
          result.UpdatedStocks?.length || 0
        } stocks`
      );
      onRefreshData();
    } catch (error) {
      console.error("Error in batch update:", error);
      message.error("Failed to update stock prices");
    } finally {
      setLoading((prev) => ({ ...prev, batchUpdate: false }));
    }
  };

  // Update all realtime prices
  const handleUpdateAllPrices = async () => {
    setLoading((prev) => ({ ...prev, updateAll: true }));
    try {
      await StockService.updateAllRealtimePrices();
      message.success("Successfully updated all realtime prices");
      onRefreshData();
    } catch (error) {
      console.error("Error updating all prices:", error);
      message.error("Failed to update all stock prices");
    } finally {
      setLoading((prev) => ({ ...prev, updateAll: false }));
    }
  };

  // Update all daily OHLCV data
  const handleUpdateAllOHLCV = async () => {
    setLoading((prev) => ({ ...prev, updateOHLCV: true }));
    try {
      await StockService.updateAllDailyOHLCV();
      message.success("Successfully updated all daily OHLCV data");
      onRefreshData();
    } catch (error) {
      console.error("Error updating OHLCV:", error);
      message.error("Failed to update OHLCV data");
    } finally {
      setLoading((prev) => ({ ...prev, updateOHLCV: false }));
    }
  };

  // Bulk update historical data
  const handleBulkHistoricalUpdate = async () => {
    if (selectedSymbols.length === 0) {
      message.warning("Please select at least one stock for historical update");
      return;
    }

    setLoading((prev) => ({ ...prev, bulkHistorical: true }));
    try {
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - historicalDays);

      const request = {
        Symbols: selectedSymbols,
        FromDate: fromDate.toISOString().split("T")[0],
        ToDate: new Date().toISOString().split("T")[0],
      };

      await StockService.bulkUpdateHistoricalData(request);
      message.success(
        `Successfully updated ${historicalDays} days of historical data`
      );
      onRefreshData();
    } catch (error) {
      console.error("Error in bulk historical update:", error);
      message.error("Failed to update historical data");
    } finally {
      setLoading((prev) => ({ ...prev, bulkHistorical: false }));
    }
  };

  return (
    <Card className="mb-6 border-0 shadow-md">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <Title level={4} className="mb-2 flex items-center">
            <BulbOutlined className="mr-2 text-orange-500" />
            Batch Operations
          </Title>
          <Text className="text-gray-600">
            Manage bulk updates and data synchronization
          </Text>
          {selectedSymbols.length > 0 && (
            <div className="mt-2">
              <Tag color="blue">{selectedSymbols.length} stocks selected</Tag>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          {/* Batch Update Selected */}
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            loading={loading.batchUpdate}
            onClick={handleBatchUpdatePrices}
            disabled={selectedSymbols.length === 0}
            className="bg-blue-600 border-blue-600"
          >
            Update Selected ({selectedSymbols.length})
          </Button>

          {/* Update All Prices */}
          <Popconfirm
            title="Update All Realtime Prices"
            description="This will update prices for all stocks. Are you sure?"
            onConfirm={handleUpdateAllPrices}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<ReloadOutlined />}
              loading={loading.updateAll}
              className="border-green-500 text-green-600 hover:bg-green-50"
            >
              Update All Prices
            </Button>
          </Popconfirm>

          {/* Update OHLCV */}
          <Popconfirm
            title="Update Daily OHLCV Data"
            description="This will update OHLCV data for all stocks. This may take a while."
            onConfirm={handleUpdateAllOHLCV}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<BarChartOutlined />}
              loading={loading.updateOHLCV}
              className="border-purple-500 text-purple-600 hover:bg-purple-50"
            >
              Update OHLCV
            </Button>
          </Popconfirm>

          {/* Historical Data Update */}
          <Space.Compact>
            <Select
              value={historicalDays}
              onChange={setHistoricalDays}
              style={{ width: 100 }}
              size="middle"
            >
              <Option value={7}>7 days</Option>
              <Option value={30}>30 days</Option>
              <Option value={90}>90 days</Option>
              <Option value={365}>1 year</Option>
            </Select>
            <Button
              icon={<ClockCircleOutlined />}
              loading={loading.bulkHistorical}
              onClick={handleBulkHistoricalUpdate}
              disabled={selectedSymbols.length === 0}
              className="border-indigo-500 text-indigo-600 hover:bg-indigo-50"
            >
              Historical
            </Button>
          </Space.Compact>
        </div>
      </div>
    </Card>
  );
};
