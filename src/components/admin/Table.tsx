// import React from "react";

// interface Column {
//   key: string;
//   label: string;
//   sortable?: boolean;
//   render?: (row: any) => React.ReactNode; // For custom rendering
// }

// interface ReusableTableProps {
//   columns: Column[];
//   data: any[];
//   loading: boolean;
//   onRowClick?: (row: any) => void;
//   actions?: (row: any) => React.ReactNode; // Allows custom action buttons
// }

// const ReusableTable: React.FC<ReusableTableProps> = ({
//   columns,
//   data,
//   loading,
//   onRowClick,
//   actions,
// }) => {
//   return (
//     <div className="overflow-x-auto">
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table className="min-w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               {columns.map((col) => (
//                 <th key={col.key} className="border p-2 text-left">
//                   {col.label}
//                 </th>
//               ))}
//               {actions && <th className="border p-2">Actions</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {data.length > 0 ? (
//               data.map((row, index) => (
//                 <tr
//                   key={index}
//                   className="border hover:bg-gray-100 cursor-pointer"
//                   onClick={() => onRowClick && onRowClick(row)}
//                 >
//                   {columns.map((col) => (
//                     <td key={col.key} className="border p-2">
//                       {col.render ? col.render(row) : row[col.key]}
//                     </td>
//                   ))}
//                   {actions && (
//                     <td className="border p-2">{actions(row)}</td>
//                   )}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center p-4">
//                   No data available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ReusableTable;


import React from "react";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (row: any) => React.ReactNode;
}

interface ReusableTableProps {
  columns: Column[];
  data: any[];
  loading: boolean;
  onRowClick?: (row: any) => void;
  actions?: (row: any) => React.ReactNode;
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const ReusableTable: React.FC<ReusableTableProps> = ({
  columns,
  data,
  loading,
  onRowClick,
  actions,
  page,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="overflow-x-auto">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                {columns.map((col) => (
                  <th key={col.key} className="border p-2 text-left">
                    {col.label}
                  </th>
                ))}
                {actions && <th className="border p-2">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((row, index) => (
                  <tr
                    key={index}
                    className="border hover:bg-gray-100 cursor-pointer"
                    onClick={() => onRowClick && onRowClick(row)}
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="border p-2">
                        {col.render ? col.render(row) : row[col.key]}
                      </td>
                    ))}
                    {actions && <td className="border p-2">{actions(row)}</td>}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center p-4">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-4 space-x-2">
              <button
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
                className="px-4 py-2 bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              <span>Page {page} of {totalPages}</span>
              <button
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
                className="px-4 py-2 bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReusableTable;
