import { Card, Table } from "antd";
import { useWatchlistTableColumns } from "./WatchlistTableColumns";
import { WatchlistItem } from "../../Models/Watchlist";

interface WatchlistTableProps {
  data: WatchlistItem[];
  onEdit: (record: WatchlistItem) => void;
  onDelete: (id: number) => void;
}

export const WatchlistTable: React.FC<WatchlistTableProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  const columns = useWatchlistTableColumns({ onEdit, onDelete });

  return (
    <Card className="border-0 shadow-md">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
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
  );
};
