// 'use client';

// import React, { useState, useMemo } from 'react';
// import { Customer } from '@/types/authTypes';
// // import { mockCustomers } from './mockData';


// const mockCustomers: Customer[] = [
//     {
//       id: '1',
//       name: 'John Doe',
//       email: 'john.doe@example.com',
//       status: 'verified',
//       createdAt: new Date('2024-01-15')
//     },
//     {
//       id: '2',
//       name: 'Jane Smith',
//       email: 'jane.smith@example.com',
//       status: 'not_verified',
//       createdAt: new Date('2024-02-20')
//     },
//     // Add more mock customers
//   ];


// interface CustomerTableProps {
//   customers?: Customer[];
//   onViewDetails?: (customer: Customer) => void;
// }

// export const CustomerTable: React.FC<CustomerTableProps> = ({ 
//   customers = mockCustomers, 
//   onViewDetails 
// }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState<Customer['status'] | 'all'>('all');

//   // Filtered and searched customers
//   const filteredCustomers = useMemo(() => {
//     return customers.filter(customer => {
//       const matchesSearch = 
//         customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      
//       const matchesStatus = 
//         statusFilter === 'all' || customer.status === statusFilter;
      
//       return matchesSearch && matchesStatus;
//     });
//   }, [customers, searchTerm, statusFilter]);

//   return (
//     <div className="p-4 bg-white shadow-md rounded-lg">
//       <div className="mb-4 flex justify-between items-center">
//         {/* Search Input */}
//         <input 
//           type="text"
//           placeholder="Search customers..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full max-w-md px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         {/* Status Filter */}
//         <select 
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value as Customer['status'] | 'all')}
//           className="ml-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="all">All Statuses</option>
//           <option value="verified">Verified</option>
//           <option value="not_verified">Not Verified</option>
//         </select>
//       </div>

//       {/* Customer Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-3 text-left border">ID</th>
//               <th className="p-3 text-left border">Name</th>
//               <th className="p-3 text-left border">Email</th>
//               <th className="p-3 text-center border">Status</th>
//               <th className="p-3 text-center border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredCustomers.map((customer) => (
//               <tr key={customer.id} className="hover:bg-gray-50 border-b">
//                 <td className="p-3 border">{customer.id}</td>
//                 <td className="p-3 border">{customer.name}</td>
//                 <td className="p-3 border">{customer.email}</td>
//                 <td className="p-3 border text-center">
//                   <span 
//                     className={`px-2 py-1 rounded-full text-xs font-semibold 
//                     ${customer.status === 'verified' 
//                       ? 'bg-green-100 text-green-800' 
//                       : 'bg-red-100 text-red-800'}`}
//                   >
//                     {customer.status === 'verified' ? 'Verified' : 'Not Verified'}
//                   </span>
//                 </td>
//                 <td className="p-3 border text-center">
//                   <button 
//                     onClick={() => onViewDetails?.(customer)}
//                     className="text-blue-600 hover:text-blue-800 hover:underline"
//                   >
//                     View Details
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* No Results State */}
//         {filteredCustomers.length === 0 && (
//           <div className="text-center py-4 text-gray-500">
//             No customers found
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };




'use client';

import React, { useState, useMemo } from 'react';
import { Customer } from '@/types/authTypes';


export const mockCustomers: Customer[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      status: 'verified',
      isBlocked: false,
      createdAt: new Date('2024-01-15'),
      lastLogin: new Date('2024-03-20'),
      phoneNumber: '+1 (555) 123-4567',
      address: '123 Main St, Anytown, USA'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      status: 'not_verified',
      isBlocked: true,
      createdAt: new Date('2024-02-20'),
      phoneNumber: '+1 (555) 987-6543',
    },
    // Add more mock customers
  ];

interface CustomerTableProps {
  customers?: Customer[];
  onViewDetails?: (customer: Customer) => void;
  onToggleBlock?: (customer: Customer) => void;
}

export const CustomerTable: React.FC<CustomerTableProps> = ({ 
  customers = mockCustomers, 
  onViewDetails,
  onToggleBlock
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Customer['status'] | 'all'>('all');
  const [blockFilter, setBlockFilter] = useState<'all' | 'blocked' | 'active'>('all');

  // Filtered and searched customers
  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = 
        statusFilter === 'all' || customer.status === statusFilter;
      
      const matchesBlockStatus = 
        blockFilter === 'all' || 
        (blockFilter === 'blocked' && customer.isBlocked) ||
        (blockFilter === 'active' && !customer.isBlocked);
      
      return matchesSearch && matchesStatus && matchesBlockStatus;
    });
  }, [customers, searchTerm, statusFilter, blockFilter]);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4 flex flex-wrap gap-4 justify-between items-center">
        {/* Search Input */}
        <input 
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow max-w-md px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Status Filter */}
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as Customer['status'] | 'all')}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Statuses</option>
          <option value="verified">Verified</option>
          <option value="not_verified">Not Verified</option>
        </select>

        {/* Block Status Filter */}
        <select 
          value={blockFilter}
          onChange={(e) => setBlockFilter(e.target.value as 'all' | 'blocked' | 'active')}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Accounts</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {/* Customer Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left border">ID</th>
              <th className="p-3 text-left border">Name</th>
              <th className="p-3 text-left border">Email</th>
              <th className="p-3 text-center border">Status</th>
              <th className="p-3 text-center border">Block Status</th>
              <th className="p-3 text-center border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50 border-b">
                <td className="p-3 border">{customer.id}</td>
                <td className="p-3 border">{customer.name}</td>
                <td className="p-3 border">{customer.email}</td>
                <td className="p-3 border text-center">
                  <span 
                    className={`px-2 py-1 rounded-full text-xs font-semibold 
                    ${customer.status === 'verified' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'}`}
                  >
                    {customer.status === 'verified' ? 'Verified' : 'Not Verified'}
                  </span>
                </td>
                <td className="p-3 border text-center">
                  <span 
                    className={`px-2 py-1 rounded-full text-xs font-semibold 
                    ${customer.isBlocked 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'}`}
                  >
                    {customer.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td className="p-3 border text-center space-x-2">
                  <button 
                    onClick={() => onViewDetails?.(customer)}
                    className="text-blue-600 hover:text-blue-800 hover:underline mr-2"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => onToggleBlock?.(customer)}
                    className={`
                      px-2 py-1 rounded text-xs font-semibold
                      ${customer.isBlocked 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : 'bg-red-500 text-white hover:bg-red-600'}
                    `}
                  >
                    {customer.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* No Results State */}
        {filteredCustomers.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No customers found
          </div>
        )}
      </div>
    </div>
  );
};