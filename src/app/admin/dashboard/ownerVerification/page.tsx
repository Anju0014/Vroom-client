
'use client';

import React, { useEffect, useState } from "react";
import { SimpleTable, TableColumn } from "@/components/admin/UserTable";
import { AdminAuthService } from "@/services/admin/adminService";
import toast from "react-hot-toast";
import UserVerifyModal from "@/components/admin/UserVerifyModal";
import { Eye } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  document: string;
  verifyStatus: number;
  blockStatus: number;
  processStatus: number;
  createdAt: Date;
  phoneNumber?: string;
  altPhoneNumber?: string;
  address?: any;
}

interface OwnerVerifyProps {
  userType: "owner";
}

const OwnerVerifyPage: React.FC<OwnerVerifyProps> = ({ userType }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<{ [key: string]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, [userType]);

  // Filter users based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [users, searchTerm]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      const response = await AdminAuthService.getAllCarOwners();

      if (!response || !response.data) throw new Error("Failed to fetch users");

      const filteredUsers = response.data
        .filter((user: any) => user.processStatus > 0 && user.verifyStatus === 0)
        .map((user: any) => ({
          id: user._id,
          name: user.fullName,
          email: user.email,
          document: user.idProof,
          verifyStatus: user.verifyStatus,
          blockStatus: user.blockStatus,
          processStatus: user.processStatus,
          createdAt: new Date(user.createdAt),
          phoneNumber: user.phoneNumber || undefined,
          altPhoneNumber: user.altPhoneNumber || undefined,
          address: user.address || undefined,
        }));

      setUsers(filteredUsers);
    } catch (err) {
      setError("Error fetching users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyUser = async (userId: string, reason?: string) => {
    try {
      setIsProcessing((prev) => ({ ...prev, [userId]: true }));
      
      // If reason is provided, we're rejecting the user (status: -1)
      // Otherwise, we're verifying the user (status: 1)
      const newStatus = reason ? -1 : 1;
      
      const response = await AdminAuthService.updateVerifyStatus(
        userId, 
        newStatus, 
        userType,
        reason
      );
      
      if (response) {
      
        setUsers((prevUsers) => 
          prevUsers.filter((user) => user.id !== userId)
        );
        
   
        if (selectedUser && selectedUser.id === userId) {
          setSelectedUser(null);
        }
        
        toast.success(
          newStatus === 1 
            ? "User verified successfully" 
            : "User rejected successfully"
        );
        
     
        fetchUsers();
      }
    } catch (err) {
      setError(reason ? "Failed to reject user" : "Failed to verify user");
      console.error(err);
    } finally {
      setIsProcessing((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const getStatusBadge = (verifyStatus: number) => {
    switch (verifyStatus) {
      case -1:
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Rejected</span>;
      case 0:
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Not Verified</span>;
      case 1:
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Verified</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Unknown</span>;
    }
  };

  // Format date to readable string
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

 
  const tableData = filteredUsers.map(user => ({
    name: user.name,
    email: user.email,
    status: getStatusBadge(user.verifyStatus),
    joined: formatDate(user.createdAt),
    actions: (
      <button
        onClick={(e) => {
          e.stopPropagation();
          setSelectedUser(user);
        }}
        className="p-2 rounded text-blue-600 hover:bg-blue-100 flex items-center justify-center"
        title="View Details"
        disabled={isProcessing[user.id]}
      >
        <Eye size={18} />
      </button>
    ),
    // Keep reference to original user for actions
    _user: user
  }));

  // Define table columns
  const columns: TableColumn[] = [
    { header: "Name", key: "name" },
    { header: "Email", key: "email" },
    { header: "Status", key: "status" },
    { header: "Joined", key: "joined" },
    { header: "Actions", key: "actions" }
  ];

  const handleRowView = (rowData: any) => {
    setSelectedUser(rowData._user);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Car Owner Verification</h1>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Car Owner Verification
      </h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Search Input */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-4 text-sm text-gray-600">
        {searchTerm ? (
          <>Showing {filteredUsers.length} of {users.length} users</>
        ) : (
          <>Total users pending verification: {users.length}</>
        )}
      </div>

      <SimpleTable
        columns={columns}
        data={tableData}
        itemsPerPage={10}
        onView={handleRowView}
        showViewButton={false} // We're handling view action in the actions column
      />

      {selectedUser && (
        <UserVerifyModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onVerifyUser={handleVerifyUser}
        />
      )}
    </div>
  );
};

export default OwnerVerifyPage;