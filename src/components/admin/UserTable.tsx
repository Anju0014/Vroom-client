'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type TableColumn = {
  header: string;
  key: string;
};

export type TableProps = {
  columns: TableColumn[];
  data: any[];
  itemsPerPage?: number;
  onView?: (item: any) => void;
  showViewButton?: boolean;
};

export function SimpleTable({
  columns,
  data,
  itemsPerPage = 10,
  onView,
  showViewButton = false
}: TableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="w-full">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          {/* Header */}
          <thead className="bg-gray-100">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left font-medium text-gray-700 border border-gray-200"
                >
                  {column.header}
                </th>
              ))}
              {showViewButton && (
                <th className="px-4 py-3 text-left font-medium text-gray-700 border border-gray-200">
                  Action
                </th>
              )}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (showViewButton ? 1 : 0)}
                  className="px-4 py-8 text-center text-gray-500 border border-gray-200"
                >
                  No data available
                </td>
              </tr>
            ) : (
              currentData.map((item, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-gray-50"
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-4 py-3 border border-gray-200"
                    >
                      {item[column.key] || '-'}
                    </td>
                  ))}
                  {showViewButton && (
                    <td className="px-4 py-3 border border-gray-200">
                      <button
                        onClick={() => onView && onView(item)}
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                      >
                        View
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination - Always shown */}
      <div className="flex items-center justify-between mt-4 px-2">
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} entries
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <ChevronLeft size={16} />
          </button>

          <span className="px-3 py-1 text-sm text-gray-600">
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`p-2 rounded ${
              currentPage === totalPages || totalPages === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}