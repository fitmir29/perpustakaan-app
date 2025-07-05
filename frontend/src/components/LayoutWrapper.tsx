'use client';

import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
}

interface TableProps<T extends { id: number }> {
  columns: Column<T>[];
  data: T[];
  onDelete?: (id: number) => void;
  onEdit?: (row: T) => void;
  actions?: boolean;
}

export default function Table<T extends { id: number }>({
  columns,
  data,
  onDelete,
  onEdit,
  actions = true,
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-md shadow border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-4 py-2 text-left font-semibold text-gray-700 whitespace-nowrap"
              >
                {col.header}
              </th>
            ))}
            {actions && (onEdit || onDelete) && (
              <th className="px-4 py-2 text-center font-semibold text-gray-700">
                Aksi
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="text-center py-6 text-gray-500"
              >
                Tidak ada data
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id}>
                {columns.map((col, idx) => {
                  const value = row[col.accessor];
                  return (
                    <td
                      key={idx}
                      className="px-4 py-2 whitespace-nowrap text-gray-800"
                    >
                      {col.render ? col.render(value, row) : String(value)}
                    </td>
                  );
                })}
                {actions && (onEdit || onDelete) && (
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center space-x-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row.id)}
                          className="text-red-600 hover:underline"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
