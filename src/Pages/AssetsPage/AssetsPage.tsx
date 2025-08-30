// pages/AssetsPage.tsx
import { Button, Form, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

// Components
import PortfolioSummary from "./components/PortfolioSummary";
import AssetsFilter from "./components/AssetsFilter";
import AssetsTable from "./components/AssetsTable";
import AddAssetModal from "./components/AddAssetModal";

// Data and utilities
import {
  Asset,
  calculateSummary,
  filterAssets,
  mockAssetsData,
} from "../../data/assetsData";

const { Title, Text } = Typography;

const AssetsPage = () => {
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("value");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [assets, setAssets] = useState<Asset[]>(mockAssetsData);
  const [form] = Form.useForm();

  // Filter and calculate data
  const filteredData = filterAssets(assets, searchText, filterType);
  const { totalValue, totalPnL, avgPnL } = calculateSummary(filteredData);

  const handleAddAsset = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      // Generate new asset
      const newAsset: Asset = {
        key: String(Date.now()),
        name: values.name,
        symbol: values.symbol,
        type: values.type,
        quantity: values.quantity,
        avgPrice: values.avgPrice,
        currentPrice: values.avgPrice, // Default to avg price
        value: values.quantity * values.avgPrice,
        pnl: 0,
        pnlValue: 0,
        allocation: 0, // Will need to recalculate
        color: getRandomColor(),
        icon: getAssetIcon(values.type),
        marketCap: "N/A",
        volume24h: "N/A",
        risk: "medium",
        favorite: false,
      };

      setAssets([...assets, newAsset]);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const getRandomColor = () => {
    const colors = ["#F7931A", "#627EEA", "#CC0000", "#10B981", "#A6AAAE"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getAssetIcon = (type: string) => {
    switch (type) {
      case "crypto":
        return "₿";
      case "stock":
        return "📈";
      case "bond":
        return "🏛️";
      default:
        return "💰";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Title level={2} className="!mb-2 text-gray-900">
              My Assets Portfolio
            </Title>
            <Text className="text-gray-600 text-lg">
              Manage and track your investment holdings
            </Text>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={handleAddAsset}
            className="bg-blue-600 hover:bg-blue-700 shadow-md"
          >
            Add Asset
          </Button>
        </div>

        {/* Portfolio Summary */}
        <PortfolioSummary
          totalValue={totalValue}
          totalPnL={totalPnL}
          avgPnL={avgPnL}
        />

        {/* Filters */}
        <AssetsFilter
          searchText={searchText}
          onSearchChange={setSearchText}
          filterType={filterType}
          onFilterTypeChange={setFilterType}
          sortBy={sortBy}
          onSortByChange={setSortBy}
        />

        {/* Assets Table */}
        <AssetsTable data={filteredData} />

        {/* Add Asset Modal */}
        <AddAssetModal
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={() => setIsModalVisible(false)}
          form={form}
        />
      </div>
    </div>
  );
};

export default AssetsPage;
