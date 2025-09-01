import { Card, Tag } from "antd";

interface SectorData {
  sector: string;
  allocation: number;
  performance: number;
  ytd: number;
}

interface SectorPerformanceTableProps {
  data: SectorData[];
}

export const SectorPerformanceTable = ({
  data,
}: SectorPerformanceTableProps) => {
  return (
    <Card title="Sector Performance Analysis" className="border-0 shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Sector
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Allocation
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                6M Return
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                YTD Return
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Performance
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((sector, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-4 font-medium text-gray-900">
                  {sector.sector}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <span>{sector.allocation}%</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(sector.allocation / 35) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`font-medium ${
                      sector.performance >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {sector.performance >= 0 ? "+" : ""}
                    {sector.performance}%
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`font-medium ${
                      sector.ytd >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {sector.ytd >= 0 ? "+" : ""}
                    {sector.ytd}%
                  </span>
                </td>
                <td className="py-4 px-4">
                  <Tag
                    color={
                      sector.performance > 10
                        ? "green"
                        : sector.performance > 5
                        ? "blue"
                        : sector.performance > 0
                        ? "orange"
                        : "red"
                    }
                  >
                    {sector.performance > 10
                      ? "Excellent"
                      : sector.performance > 5
                      ? "Good"
                      : sector.performance > 0
                      ? "Fair"
                      : "Poor"}
                  </Tag>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
