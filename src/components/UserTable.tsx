'use client';

import React, { useState, useMemo } from 'react';
import SearchFilter from './SearchFilter'; 


interface User {
  id: string | number;
  name: string;
  email: string;
  status: number;
  isBlocked: boolean;
}

interface UserTableProps {
  users: User[];
  onViewDetails: (user: User) => void;
  onToggleBlock: (user: User) => void;
  showId?: boolean;
}


const getStatusText = (status: number) => {
  switch (status) {
    case -2: return { text: "Blocked", color: "bg-red-100 text-red-800" };
    case -1: return { text: "Doc Not Verified", color: "bg-yellow-100 text-yellow-800" };
    case 0: return { text: "Not Verified", color: "bg-gray-100 text-gray-800" };
    case 1: return { text: "Doc Verified", color: "bg-blue-100 text-blue-800" };
    case 2: return { text: "Fully Verified", color: "bg-green-100 text-green-800" };
    default: return { text: "Unknown", color: "bg-gray-400 text-white" };
  }
};

const STATUS_FILTERS = [
  { value: -2, label: "Blocked" },
  { value: -1, label: "Doc Not Verified" },
  { value: 0, label: "Not Verified" },
  { value: 1, label: "Doc Verified" },
  { value: 2, label: "Fully Verified" }
];

export const UserTable: React.FC<UserTableProps> = ({
  users = [],
  onViewDetails,
  onToggleBlock,
  showId = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [blockFilter, setBlockFilter] = useState<'all' | 'blocked' | 'active'>('all');

 
  const statusFilterOptions = STATUS_FILTERS.map(filter => filter.label);


  const handleStatusFilterChange = (filterLabel: string) => {
    if (filterLabel === '') {
      setStatusFilter('');
      return;
    }
    
   
    const filter = STATUS_FILTERS.find(f => f.label === filterLabel);
    setStatusFilter(filter ? filter.value.toString() : '');
  };

 
  const filteredUsers = useMemo(() => {
    if (!Array.isArray(users)) return [];
    
    return users.filter(user => {
      const matchesSearch = 
        searchTerm === '' || 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = 
        statusFilter === '' || 
        user.status === parseInt(statusFilter);
      
      const matchesBlockStatus = 
        blockFilter === 'all' || 
        (blockFilter === 'blocked' && user.isBlocked) ||
        (blockFilter === 'active' && !user.isBlocked);
      
      return matchesSearch && matchesStatus && matchesBlockStatus;
    });
  }, [users, searchTerm, statusFilter, blockFilter]);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">

      <div className="flex flex-col md:flex-row gap-4 mb-4">
   
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded-md flex-grow"
        />
   
        <select
          value={statusFilter === '' ? '' : STATUS_FILTERS.find(f => f.value.toString() === statusFilter)?.label || ''}
          onChange={(e) => handleStatusFilterChange(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full md:w-1/4"
        >
          <option value="">All Statuses</option>
          {statusFilterOptions.map((filter) => (
            <option key={filter} value={filter}>
              {filter}
            </option>
          ))}
        </select>
        
      
        <select 
          value={blockFilter}
          onChange={(e) => setBlockFilter(e.target.value as 'all' | 'blocked' | 'active')}
          className="border border-gray-300 p-2 rounded-md w-full md:w-1/5"
        >
          <option value="all">All Accounts</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>


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
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 border-b">
                <td className="p-3 border">{user.id}</td>
                <td className="p-3 border">{user.name}</td>
                <td className="p-3 border">{user.email}</td>
                <td className="p-3 border text-center">
                  <span 
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusText(user.status).color}`}
                  >
                    {getStatusText(user.status).text}
                  </span>
                </td>
                <td className="p-3 border text-center">
                  <span 
                    className={`px-2 py-1 rounded-full text-xs font-semibold 
                    ${user.isBlocked 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'}`}
                  >
                    {user.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td className="p-3 border text-center space-x-2">
                  <button 
                    onClick={() => onViewDetails(user)}
                    className="text-blue-600 hover:text-blue-800 hover:underline mr-2"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => onToggleBlock(user)}
                    className={`
                      px-2 py-1 rounded text-xs font-semibold
                      ${user.isBlocked 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : 'bg-red-500 text-white hover:bg-red-600'}
                    `}
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No users found
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTable;



