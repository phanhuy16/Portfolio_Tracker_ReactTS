// components/AssetsFilter.tsx
import { Card, Input, Select, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { Option } = Select;

interface AssetsFilterProps {
  searchText: string;
  onSearchChange: (value: string) => void;
  filterType: string;
  onFilterTypeChange: (value: string) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
}

const AssetsFilter: React.FC<AssetsFilterProps> = ({
  searchText,
  onSearchChange,
  filterType,
  onFilterTypeChange,
  sortBy,
  onSortByChange,
}) => {
  return (
    <Card className="mb-6 border-0 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Input
            placeholder="Search assets..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full sm:w-64"
          />
          <Select
            value={filterType}
            onChange={onFilterTypeChange}
            className="w-full sm:w-40"
          >
            <Option value="all">All Types</Option>
            <Option value="crypto">Cryptocurrency</Option>
            <Option value="stock">Stocks</Option>
            <Option value="bond">Bonds</Option>
          </Select>
        </div>
        <div className="flex items-center space-x-4">
          <Text className="text-gray-600">Sort by:</Text>
          <Select value={sortBy} onChange={onSortByChange} className="w-32">
            <Option value="value">Value</Option>
            <Option value="pnl">P&L</Option>
            <Option value="name">Name</Option>
            <Option value="allocation">Allocation</Option>
          </Select>
        </div>
      </div>
    </Card>
  );
};

export default AssetsFilter;
