import React, { useState, useEffect } from "react";

interface Column {
  key: string;
  label: string;
  width?: string;
  render?: (value: any, row: any) => JSX.Element | string;
}

interface AetoGridProps {
  data: any[];
  columns: Column[];
  isLoading?: boolean;
  loaderIcon?:any,
  onRowSelect?: (selectedRows: any[]) => void;
}

const AetoGrid: React.FC<AetoGridProps> = ({ data, columns, loaderIcon, isLoading = false, onRowSelect = () => {} }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);

  const toggleSelection = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="max-h-[50vh] overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="sticky top-0 bg-gray-50 text-sm font-bold rounded-lg">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-600">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={() => setSelectAll(!selectAll)}
                  />
                </th>
                {columns.map((col) => (
                  <th key={col.key} className="px-4 py-2 text-left font-medium text-gray-600 truncate">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-sm">
            { isLoading ? (
              <div className="text-center py-6">
                <td className={`col-span-full`}>
                 { loaderIcon }
                </td>
              </div>
              ) : ( data && data.length > 0 ?  data.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onMouseEnter={() => setHovered(row.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <td className="px-4 py-2 text-gray-700">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(row.id)}
                      onChange={() => toggleSelection(row.id)}
                    />
                  </td>
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-2 text-gray-700 truncate">
                      {col.render ? col.render(row[col.key], row) : row[col.key] || "--"}
                    </td>
                  ))}
                </tr>
              )) : (
                <td className="col-span-full">
                  <article className="p-5 text-center">No Data available</article>
                </td>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default AetoGrid;
