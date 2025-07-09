import React from 'react';

interface DataRow {
  id: string;
  [key: string]: any;
}

interface Column<T extends DataRow> {
  header: string;
  accessor: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface TableProps<T extends DataRow> {
  data: T[];
  columns: Column<T>[];
}

function Table<T extends DataRow>({ data, columns }: TableProps<T>) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((col, idx) => (
            <th 
              key={idx} 
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50">
            {columns.map((col, idx) => (
              <td key={idx} className="px-4 py-2 border-b">
                {col.render 
                  ? col.render(row[col.accessor], row)
                  : String(row[col.accessor])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;