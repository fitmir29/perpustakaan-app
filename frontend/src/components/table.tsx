'use client';
import React, { ReactNode } from 'react';

//
// ✅ 1. Komponen Tabel Sederhana (Manual children + headers)
//
export function SimpleTable({
  headers,
  children,
}: {
  headers: string[];
  children: ReactNode;
}) {
  return (
    <table className="min-w-full bg-white shadow-md rounded">
      <thead>
        <tr>
          {headers.map((header, idx) => (
            <th key={idx} className="px-4 py-2 border-b text-left bg-gray-100">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

//
// ✅ 2. Komponen DataTable Dinamis (mapping data dan kolom)
//
interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onDelete?: (id: number) => void;
  actionLabel?: string;
}

export function DataTable<T extends { id: number }>({
  columns,
  data,
  onDelete,
  actionLabel = 'Hapus',
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto border rounded-lg bg-white shadow">
      <table className="min-w-full text-sm text-left text-gray-800">
        <thead className="bg-gray-100 text-gray-700 font-semibold">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-4 py-2 border-b">
                {col.header}
              </th>
            ))}
            {onDelete && <th className="px-4 py-2 border-b text-center">Aksi</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (onDelete ? 1 : 0)} className="text-center py-6">
                Tidak ada data
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {columns.map((col, idx) => (
                  <td key={idx} className="px-4 py-2 border-b">
                    {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                  </td>
                ))}
                {onDelete && (
                  <td className="px-4 py-2 border-b text-center">
                    <button
                      onClick={() => onDelete(row.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      {actionLabel}
                    </button>
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