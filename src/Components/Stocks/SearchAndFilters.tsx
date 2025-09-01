// components/SearchAndFilters.tsx
import { Card, Input, Select, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Text } = Typography;

interface SearchAndFiltersProps {
  searchTerm: string;
  selectedIndustry: string;
  sortBy: string;
  industries: string[];
  onSearchChange: (value: string) => void;
  onIndustryChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export const SearchAndFilters = ({
  searchTerm,
  selectedIndustry,
  sortBy,
  industries,
  onSearchChange,
  onIndustryChange,
  onSortChange,
}: SearchAndFiltersProps) => {
  return (
    <Card className="mb-6 border-0 shadow-md">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Input
            placeholder="Search stocks..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full sm:w-64"
          />
          <Select
            placeholder="Industry"
            value={selectedIndustry}
            onChange={onIndustryChange}
            className="w-full sm:w-40"
            allowClear
          >
            {industries.map((industry) => (
              <Option key={industry} value={industry}>
                {industry}
              </Option>
            ))}
          </Select>
        </div>
        <div className="flex items-center space-x-4">
          <Text className="text-gray-600">Sort by:</Text>
          <Select value={sortBy} onChange={onSortChange} className="w-32">
            <Option value="marketCap">Market Cap</Option>
            <Option value="price">Price</Option>
            <Option value="volume">Volume</Option>
            <Option value="change">Change</Option>
          </Select>
        </div>
      </div>
    </Card>
  );
};
