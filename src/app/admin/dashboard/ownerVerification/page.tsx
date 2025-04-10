


'use client';

import React, { useEffect, useState } from "react";
import { DataTable, Column } from "@/components/admin/UserTable";
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

  useEffect(() => {
    fetchUsers();
  }, [userType]);

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
        // Update local state to reflect the change
        setUsers((prevUsers) => 
          prevUsers.filter((user) => user.id !== userId)
        );
        
        // Close modal if the updated user was selected
        if (selectedUser && selectedUser.id === userId) {
          setSelectedUser(null);
        }
        
        toast.success(
          newStatus === 1 
            ? "User verified successfully" 
            : "User rejected successfully"
        );
        
        // Refresh the user list
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

  // Table columns definition
  const columns: Column<User>[] = [
    {
      header: "Name",
      accessor: "name" as keyof User,
      sortable: true,
    },
    {
      header: "Email",
      accessor: "email" as keyof User,
      sortable: true,
    },
    {
      header: "Status",
      accessor: (user: User) => getStatusBadge(user.verifyStatus),
      className: "whitespace-nowrap",
    },
    {
      header: "Joined",
      accessor: (user: User) => formatDate(user.createdAt),
      sortable: true,
    },
    {
      header: "Actions",
      accessor: (user: User) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedUser(user);
            }}
            className="p-1 rounded text-blue-600 hover:bg-blue-100"
            title="View Details"
            disabled={isProcessing[user.id]}
          >
            <Eye size={18} />
          </button>
        </div>
      ),
      className: "w-24",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Car Owner Verification
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <DataTable
        data={users}
        columns={columns}
        keyExtractor={(user) => user.id}
        onRowClick={setSelectedUser}
        pagination={true}
        itemsPerPage={10}
        searchable={true}
        searchKeys={["name", "email"] as Array<keyof User>}
        loading={loading}
        emptyMessage="No users pending verification"
        rowClassName={(user) => user.blockStatus ? 'bg-red-50' : ''}
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