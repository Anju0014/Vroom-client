'use client';

import React, { useEffect, useState } from "react";
import UserTable from "@/components/UserTable";
import UserDetailsModal from "@/components/UserDetailsModal";
import { AdminAuthService } from "@/services/admin/adminService";
import toast from "react-hot-toast";

interface UserManagementProps {
  userType: "customer" | "owner";
}

const UserManagementPage: React.FC<UserManagementProps> = ({ userType }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = userType === "customer"
          ? await AdminAuthService.getAllCustomers()
          : await AdminAuthService.getAllCarOwners();

        if (!response || !response.data) throw new Error("Failed to fetch users");

        setUsers(response.data.map((user: any) => ({
          id: user._id,
          name: user.fullName,
          email: user.email,
          isBlocked: user.status === -2,
          document: user.idProof,
          status: user.status,
          previousStatus:user.previousStatus,
          createdAt: new Date(user.createdAt),
          phoneNumber: user.phoneNumber || undefined,
         address: user.address || undefined,
        })));
      } catch {
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userType]);

//   const handleToggleBlock = async (user: any) => {
//     try {
//       setIsProcessing((prev) => ({ ...prev, [user.id]: true })); 
//       const updatedStatus = !user.isBlocked;

//       userType === "customer"
//         ? await AdminAuthService.toggleBlockCustomer(user.id, updatedStatus)
//         : await AdminAuthService.toggleBlockOwner(user.id, updatedStatus);

     
//       setUsers((prevUsers) =>
//         prevUsers.map((u) => (u.id === user.id ? { ...u, isBlocked: updatedStatus } : u))
//       );
//     } catch {
//       setError("Failed to update block status");
//     } finally {
//       setIsProcessing((prev) => ({ ...prev, [user.id]: false })); 
//     }
//   };


const handleToggleBlock = async (user: any) => {
    try {
      setIsProcessing((prev) => ({ ...prev, [user.id]: true }));
  
     
      const newStatus = user.status === -2 ? 3 : -2;
  
      const response = await AdminAuthService.updateUserStatus(user.id, newStatus, userType);
  
      if (response) {
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.id === user.id 
              ? { ...u, status: response.user.status, isBlocked: response.user.status === -2 ,previousStatus:response.user.previousStatus}  
              : u
          )
        );
        setSelectedUser((prev:any|null) =>
            prev && prev.id === user.id
              ? { 
                  ...prev, 
                  status: response.user.status, 
                  isBlocked: response.user.status === -2,
                  previousStatus: response.user.previousStatus 
                }
              : prev
          );
    
        toast.success("Updated successfully")
      }
    } catch {
      setError("Failed to update block status");
    } finally {
      setIsProcessing((prev) => ({ ...prev, [user.id]: false }));
    }
  };
  


  const handleVerifyDocument = async (userId: string) => {
    try {
      setIsProcessing((prev) => ({ ...prev, [userId]: true })); 
      
      const response = await AdminAuthService.updateUserStatus(userId, 1, userType);
      if (response) {
       
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === userId ? { ...user, status: 1 } : user))
        );
        setSelectedUser((prev:any|null) =>
            prev && prev.id === userId ? { ...prev, status: 1 } : prev
          );
    
          toast.success("Document verified successfully");
      }
    } catch {
      setError("Failed to verify document");
    } finally {
      setIsProcessing((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const handleVerifyUser = async (userId: string) => {
    try {
      setIsProcessing((prev) => ({ ...prev, [userId]: true })); 
      const response = await AdminAuthService.updateUserStatus(userId, 2, userType);
      if (response) {
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === userId ? { ...user, status: 2 } : user))
        );
        setSelectedUser((prev:any|null) =>
            prev && prev.id === userId ? { ...prev, status: 2 } : prev
          );
    
          toast.success("User verified successfully");
      }
    } catch {
      setError("Failed to verify user");
    } finally {
      setIsProcessing((prev) => ({ ...prev, [userId]: false })); 
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {userType === "customer" ? "Customer Management" : "Car Owner Management"}
      </h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <UserTable
        users={users}
        onViewDetails={setSelectedUser}
        onToggleBlock={handleToggleBlock}
       
      />

      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onToggleBlock={handleToggleBlock}
          onVerifyDocument={handleVerifyDocument}
          onVerifyUser={handleVerifyUser}
          
        />
      )}
    </div>
  );
};

export default UserManagementPage;




