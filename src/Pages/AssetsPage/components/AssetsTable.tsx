// components/AssetsTable.tsx
import { Card, Table } from "antd";
import { assetsTableColumns } from "../../../utils/assetsTableColumns";

interface AssetsTableProps {
  data: any[];
}

const AssetsTable: React.FC<AssetsTableProps> = ({ data }) => {
  return (
    <Card className="border-0 shadow-md">
      <Table
        columns={assetsTableColumns}
        dataSource={data}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} assets`,
        }}
        scroll={{ x: 1200 }}
        className="assets-table"
      />

      <style>{`
        .assets-table .ant-table-tbody > tr:hover > td {
          background-color: #f9fafb !important;
        }
        .assets-table .ant-table-thead > tr > th {
          background-color: #f8fafc;
          font-weight: 600;
          color: #374151;
        }
      `}</style>
    </Card>
  );
};

export default AssetsTable;
