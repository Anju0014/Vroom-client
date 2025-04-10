// 'use client';

// import React, { useState, useMemo } from 'react';
// import SearchFilter from '../SearchFilter'; 


// interface User {
//   id: string | number;
//   name: string;
//   email: string;
//   status: number;
//   isBlocked: boolean;
// }

// interface UserTableProps {
//   users: User[];
//   onViewDetails: (user: User) => void;
//   onToggleBlock: (user: User) => void;
//   showId?: boolean;
// }


// const getStatusText = (status: number) => {
//   switch (status) {
//     case -2: return { text: "Blocked", color: "bg-red-100 text-red-800" };
//     case -1: return { text: "Doc Not Verified", color: "bg-yellow-100 text-yellow-800" };
//     case 0: return { text: "Not Verified", color: "bg-gray-100 text-gray-800" };
//     case 1: return { text: "Doc Verified", color: "bg-blue-100 text-blue-800" };
//     case 2: return { text: "Fully Verified", color: "bg-green-100 text-green-800" };
//     default: return { text: "Unknown", color: "bg-gray-400 text-white" };
//   }
// };

// const STATUS_FILTERS = [
//   { value: -2, label: "Blocked" },
//   { value: -1, label: "Doc Not Verified" },
//   { value: 0, label: "Not Verified" },
//   { value: 1, label: "Doc Verified" },
//   { value: 2, label: "Fully Verified" }
// ];

// export const UserTable: React.FC<UserTableProps> = ({
//   users = [],
//   onViewDetails,
//   onToggleBlock,
//   showId = false
// }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [blockFilter, setBlockFilter] = useState<'all' | 'blocked' | 'active'>('all');

 
//   const statusFilterOptions = STATUS_FILTERS.map(filter => filter.label);


//   const handleStatusFilterChange = (filterLabel: string) => {
//     if (filterLabel === '') {
//       setStatusFilter('');
//       return;
//     }
    
   
//     const filter = STATUS_FILTERS.find(f => f.label === filterLabel);
//     setStatusFilter(filter ? filter.value.toString() : '');
//   };

 
//   const filteredUsers = useMemo(() => {
//     if (!Array.isArray(users)) return [];
    
//     return users.filter(user => {
//       const matchesSearch = 
//         searchTerm === '' || 
//         user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
//       const matchesStatus = 
//         statusFilter === '' || 
//         user.status === parseInt(statusFilter);
      
//       const matchesBlockStatus = 
//         blockFilter === 'all' || 
//         (blockFilter === 'blocked' && user.isBlocked) ||
//         (blockFilter === 'active' && !user.isBlocked);
      
//       return matchesSearch && matchesStatus && matchesBlockStatus;
//     });
//   }, [users, searchTerm, statusFilter, blockFilter]);

//   return (
//     <div className="p-4 bg-white shadow-md rounded-lg">

//       <div className="flex flex-col md:flex-row gap-4 mb-4">
   
//         <input
//           type="text"
//           placeholder="Search by name or email..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="border border-gray-300 p-2 rounded-md flex-grow"
//         />
   
//         <select
//           value={statusFilter === '' ? '' : STATUS_FILTERS.find(f => f.value.toString() === statusFilter)?.label || ''}
//           onChange={(e) => handleStatusFilterChange(e.target.value)}
//           className="border border-gray-300 p-2 rounded-md w-full md:w-1/4"
//         >
//           <option value="">All Statuses</option>
//           {statusFilterOptions.map((filter) => (
//             <option key={filter} value={filter}>
//               {filter}
//             </option>
//           ))}
//         </select>
        
      
//         <select 
//           value={blockFilter}
//           onChange={(e) => setBlockFilter(e.target.value as 'all' | 'blocked' | 'active')}
//           className="border border-gray-300 p-2 rounded-md w-full md:w-1/5"
//         >
//           <option value="all">All Accounts</option>
//           <option value="active">Active</option>
//           <option value="blocked">Blocked</option>
//         </select>
//       </div>


//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-3 text-left border">ID</th>
//               <th className="p-3 text-left border">Name</th>
//               <th className="p-3 text-left border">Email</th>
//               <th className="p-3 text-center border">Status</th>
//               <th className="p-3 text-center border">Block Status</th>
//               <th className="p-3 text-center border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map((user) => (
//               <tr key={user.id} className="hover:bg-gray-50 border-b">
//                 <td className="p-3 border">{user.id}</td>
//                 <td className="p-3 border">{user.name}</td>
//                 <td className="p-3 border">{user.email}</td>
//                 <td className="p-3 border text-center">
//                   <span 
//                     className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusText(user.status).color}`}
//                   >
//                     {getStatusText(user.status).text}
//                   </span>
//                 </td>
//                 <td className="p-3 border text-center">
//                   <span 
//                     className={`px-2 py-1 rounded-full text-xs font-semibold 
//                     ${user.isBlocked 
//                       ? 'bg-red-100 text-red-800' 
//                       : 'bg-green-100 text-green-800'}`}
//                   >
//                     {user.isBlocked ? 'Blocked' : 'Active'}
//                   </span>
//                 </td>
//                 <td className="p-3 border text-center space-x-2">
//                   <button 
//                     onClick={() => onViewDetails(user)}
//                     className="text-blue-600 hover:text-blue-800 hover:underline mr-2"
//                   >
//                     View Details
//                   </button>
//                   <button 
//                     onClick={() => onToggleBlock(user)}
//                     className={`
//                       px-2 py-1 rounded text-xs font-semibold
//                       ${user.isBlocked 
//                         ? 'bg-green-500 text-white hover:bg-green-600' 
//                         : 'bg-red-500 text-white hover:bg-red-600'}
//                     `}
//                   >
//                     {user.isBlocked ? 'Unblock' : 'Block'}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {filteredUsers.length === 0 && (
//           <div className="text-center py-4 text-gray-500">
//             No users found
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserTable;





'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Search } from 'lucide-react';

export type Column<T> = {
  header: string;
  accessor: keyof T | ((data: T) => React.ReactNode);
  className?: string;
  sortable?: boolean;
};

export type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  rowClassName?: string | ((item: T) => string);
  pagination?: boolean;
  itemsPerPage?: number;
  searchable?: boolean;
  searchKeys?: Array<keyof T>;
  loading?: boolean;
  emptyMessage?: string;
  containerClassName?: string;
  tableClassName?: string;
  headerClassName?: string;
};

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  rowClassName = '',
  pagination = true,
  itemsPerPage = 10,
  searchable = false,
  searchKeys = [],
  loading = false,
  emptyMessage = 'No data available',
  containerClassName = '',
  tableClassName = '',
  headerClassName = ''
}: DataTableProps<T>) {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: keyof T | null; direction: 'asc' | 'desc' | null }>({
    key: null,
    direction: null
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<T[]>(data);

  // Update filtered data when props change
  useEffect(() => {
    let result = [...data];

    // Apply search filter
    if (searchTerm && searchKeys.length) {
      result = result.filter(item =>
        searchKeys.some(key => {
          const value = item[key];
          if (value === null || value === undefined) return false;
          
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchTerm.toLowerCase());
          }
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    }

    // Apply sorting
    if (sortConfig.key && sortConfig.direction) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof T];
        const bValue = b[sortConfig.key as keyof T];

        if (aValue === bValue) return 0;
        
        if (sortConfig.direction === 'asc') {
          // Handle different types of values
          if (aValue === null || aValue === undefined) return -1;
          if (bValue === null || bValue === undefined) return 1;
          
          return aValue < bValue ? -1 : 1;
        } else {
          if (aValue === null || aValue === undefined) return 1;
          if (bValue === null || bValue === undefined) return -1;
          
          return aValue > bValue ? -1 : 1;
        }
      });
    }

    setFilteredData(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [data, searchTerm, sortConfig, searchKeys]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = pagination ? filteredData.slice(startIndex, endIndex) : filteredData;

  // Handle sort request
  const handleSort = (accessor: keyof T | ((data: T) => React.ReactNode)) => {
    // Only allow sorting on direct property accessors (not functions)
    if (typeof accessor !== 'function') {
      let direction: 'asc' | 'desc' | null = 'asc';
      
      if (sortConfig.key === accessor) {
        if (sortConfig.direction === 'asc') {
          direction = 'desc';
        } else if (sortConfig.direction === 'desc') {
          direction = null;
        }
      }
      
      setSortConfig({ key: accessor, direction });
    }
  };

  // Render table header
  const renderHeader = () => {
    return (
      <thead className={`bg-gray-100 ${headerClassName}`}>
        <tr>
          {columns.map((column, index) => {
            const isSortable = column.sortable !== false && typeof column.accessor !== 'function';
            return (
              <th 
                key={index} 
                className={`px-4 py-2 text-left ${column.className || ''} ${isSortable ? 'cursor-pointer' : ''}`}
                onClick={() => isSortable ? handleSort(column.accessor) : null}
              >
                <div className="flex items-center">
                  {column.header}
                  {isSortable && (
                    <span className="ml-1">
                      {sortConfig.key === column.accessor ? (
                        sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                      ) : (
                        <span className="text-gray-300">
                          <ChevronUp size={16} />
                        </span>
                      )}
                    </span>
                  )}
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
    );
  };

  // Render table body
  const renderBody = () => {
    if (loading) {
      return (
        <tbody>
          <tr>
            <td colSpan={columns.length} className="px-4 py-8 text-center">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
              </div>
            </td>
          </tr>
        </tbody>
      );
    }

    if (currentData.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan={columns.length} className="px-4 py-8 text-center">
              {emptyMessage}
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {currentData.map(item => {
          const rowClass = typeof rowClassName === 'function' ? rowClassName(item) : rowClassName;
          
          return (
            <tr 
              key={keyExtractor(item)} 
              className={`border-t hover:bg-gray-50 ${rowClass} ${onRowClick ? 'cursor-pointer' : ''}`}
              onClick={() => onRowClick && onRowClick(item)}
            >
              {columns.map((column, colIndex) => {
                const cellValue = typeof column.accessor === 'function' 
                  ? column.accessor(item) 
                  : item[column.accessor];
                
                return (
                  <td key={colIndex} className={`px-4 py-3 ${column.className || ''}`}>
                    {cellValue as React.ReactNode}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  };

  // Render pagination controls
  const renderPagination = () => {
    if (!pagination || totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded ${
              currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ChevronLeft size={16} />
          </button>
          
          {/* Page numbers */}
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Logic to show pages around current page
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded text-sm ${
                    currentPage === pageNum
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded ${
              currentPage === totalPages || totalPages === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  };

  // Search input
  const renderSearch = () => {
    if (!searchable) return null;

    return (
      <div className="mb-4 flex">
        <div className="relative flex-1 max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 pr-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full ${containerClassName}`}>
      {renderSearch()}
      <div className="overflow-x-auto">
        <table className={`min-w-full ${tableClassName}`}>
          {renderHeader()}
          {renderBody()}
        </table>
      </div>
      {renderPagination()}
    </div>
  );
}