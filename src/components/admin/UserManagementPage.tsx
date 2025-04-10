

// 'use client';

// import React, { useEffect, useState } from "react";
// import { DataTable, Column } from "./UserTable";
// import { AdminAuthService } from "@/services/admin/adminService";
// import toast from "react-hot-toast";
// import UserDetailsModal from "@/components/admin/UserDetailsModal";
// import { Shield, ShieldOff, Eye, CheckCircle } from "lucide-react";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   isBlocked: boolean;
//   document: string;
//   verifyStatus: number;
//   blockStatus: number;
//   processStatus: number;
//   createdAt: Date;
//   phoneNumber?: string;
//   address?: string;
// }

// interface UserManagementProps {
//   userType: "customer" | "owner";
// }

// const UserManagementPage: React.FC<UserManagementProps> = ({ userType }) => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isProcessing, setIsProcessing] = useState<{ [key: string]: boolean }>({});

//   useEffect(() => {
//     fetchUsers();
//   }, [userType]);

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const response = userType === "customer"
//         ? await AdminAuthService.getAllCustomers()
//         : await AdminAuthService.getAllCarOwners();

//       if (!response || !response.data) throw new Error("Failed to fetch users");

//       const filteredUsers = response.data
//       .filter((user: any) => user.processStatus> 1 && user.verifyStatus === 1)
//       .map((user: any) => ({
//         id: user._id,
//         name: user.fullName,
//         email: user.email,
//         document: user.idProof,
//         isBlocked:user.blockStatus===1,
//         status: user.status,
//         processStatus:user.processStatus,
//         verifyStatus:user.verifyStatus,
//         createdAt: new Date(user.createdAt),
//         altPhoneNumber: user.altPhoneNumber || undefined,
//         phoneNumber: user.phoneNumber || undefined,
//         address: user.address || undefined,
//       }));
//       setUsers(filteredUsers);
//     } catch {
//       setError("Error fetching users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggleBlock = async (user: User) => {
//     try {
//       setIsProcessing((prev) => ({ ...prev, [user.id]: true }));
      
//       const newStatus = user.blockStatus === 0 ? 1 : 0;
//       const response = await AdminAuthService.updateBlockStatus(user.id, newStatus, userType);
//       if (response) {
//         setUsers((prevUsers) =>
//           prevUsers.map((u) =>
//             u.id === user.id 
//               ? { ...u, blockStatus: response.user.blockStatus, isBlocked:response.user.status===1 }  
//               : u
//           )
//         );
//         setSelectedUser((prev) =>
//           prev && prev.id === user.id
//             ? { 
//                 ...prev, 
//                 blockstatus: response.user.blockstatus, 
//                 isBlocked: response.user.status === 1,
                
//               }
//             : prev
//         );
        
//         toast.success("Updated successfully");
//       }
//     } catch {
//       setError("Failed to update block status");
//     } finally {
//       setIsProcessing((prev) => ({ ...prev, [user.id]: false }));
//     }
//   };


//   const getStatusBadge = (verifyStatus: number) => {
//     switch (verifyStatus) {
//       case -1:
//         return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Rejected</span>;
//       case 0:
//         return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Not Verified</span>;
//       case 1:
//         return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Verified</span>;
//       default:
//         return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Unknown</span>;
//     }
//   };

//   // Format date to readable string
//   const formatDate = (date: Date) => {
//     return new Intl.DateTimeFormat('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     }).format(date);
//   };

//   // Table columns definition
//   const columns: Column<User>[] = [
//     {
//       header: "Name",
//       accessor: "name" as keyof User,
//       sortable: true,
//     },
//     {
//       header: "Email",
//       accessor: "email" as keyof User,
//       sortable: true,
//     },
//     {
//       header: "Status",
//       accessor: (user: User) => getStatusBadge(user.verifyStatus),
//       className: "whitespace-nowrap",
//     },
//     {
//       header: "Joined",
//       accessor: (user: User) => formatDate(user.createdAt),
//       sortable: true,
//     },
//     {
//       header: "Actions",
//       accessor: (user: User) => (
//         <div className="flex space-x-2">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               handleToggleBlock(user);
//             }}
//             disabled={isProcessing[user.id]}
//             className={`p-1 rounded ${user.isBlocked ? 'text-green-600 hover:bg-green-100' : 'text-red-600 hover:bg-red-100'}`}
//             title={user.isBlocked ? "Unblock User" : "Block User"}
//           >
//             {user.isBlocked ? <Shield size={18} /> : <ShieldOff size={18} />}
//           </button>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setSelectedUser(user);
//             }}
//             className="p-1 rounded text-blue-600 hover:bg-blue-100"
//             title="View Details"
//           >
//             <Eye size={18} />
//           </button>
//         </div>
//       ),
//       className: "w-24",
//     },
//   ];

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">
//         {userType === "customer" ? "Customer Management" : "Car Owner Management"}
//       </h1>

//       {error && <p className="text-red-500 mb-4">{error}</p>}

//       <DataTable
//         data={users}
//         columns={columns}
//         keyExtractor={(user) => user.id}
//         onRowClick={setSelectedUser}
//         pagination={true}
//         itemsPerPage={10}
//         searchable={true}
//         searchKeys={["name", "email"] as Array<keyof User>}
//         loading={loading}
//         emptyMessage="No users found"
//         rowClassName={(user) => user.isBlocked ? 'bg-red-50' : ''}
//       />

//       {selectedUser && (
//         <UserDetailsModal
//           user={selectedUser}
//           onClose={() => setSelectedUser(null)}
//           onToggleBlock={handleToggleBlock}
         
//         />
//       )}
//     </div>
//   );
// };

// export default UserManagementPage;



'use client';

import React, { useEffect, useState } from "react";
import { DataTable, Column } from "./UserTable";
import { AdminAuthService } from "@/services/admin/adminService";
import toast from "react-hot-toast";
import UserDetailsModal from "@/components/admin/UserDetailsModal";
import { Shield, ShieldOff, Eye } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  blockStatus: number;
  document: string;
  verifyStatus: number;
  processStatus: number;
  createdAt: Date;
  phoneNumber?: string;
  altPhoneNumber?: string;
  address?: string;
}

interface UserManagementProps {
  userType: "customer" | "owner";
}

const UserManagementPage: React.FC<UserManagementProps> = ({ userType }) => {
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
      const response = userType === "customer"
        ? await AdminAuthService.getAllCustomers()
        : await AdminAuthService.getAllCarOwners();

      if (!response || !response.data) throw new Error("Failed to fetch users");

      const filteredUsers = response.data
        .filter((user: any) => user.processStatus > 1 && user.verifyStatus === 1)
        .map((user: any) => ({
          id: user._id,
          name: user.fullName,
          email: user.email,
          document: user.idProof,
          blockStatus: user.blockStatus || 0,
          processStatus: user.processStatus,
          verifyStatus: user.verifyStatus,
          createdAt: new Date(user.createdAt),
          altPhoneNumber: user.altPhoneNumber || undefined,
          phoneNumber: user.phoneNumber || undefined,
          address: user.address || undefined,
        }));
      setUsers(filteredUsers);
    } catch {
      setError("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBlock = async (user: User) => {
    try {
      setIsProcessing((prev) => ({ ...prev, [user.id]: true }));
      
      const newStatus = user.blockStatus === 0 ? 1 : 0;
      const response = await AdminAuthService.updateBlockStatus(user.id, newStatus, userType);
      
      if (response) {
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.id === user.id 
              ? { ...u, blockStatus: response.user.blockStatus }  
              : u
          )
        );
        
        setSelectedUser((prev) =>
          prev && prev.id === user.id
            ? { ...prev, blockStatus: response.user.blockStatus }
            : prev
        );
        
        toast.success("Updated successfully");
      }
    } catch {
      setError("Failed to update block status");
    } finally {
      setIsProcessing((prev) => ({ ...prev, [user.id]: false }));
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
      header: "id",
      accessor: "id" as keyof User,
      sortable: true,
    },
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
              handleToggleBlock(user);
            }}
            disabled={isProcessing[user.id]}
            className={`p-1 rounded ${user.blockStatus === 1 ? 'text-green-600 hover:bg-green-100' : 'text-red-600 hover:bg-red-100'}`}
            title={user.blockStatus === 1 ? "Unblock User" : "Block User"}
          >
            {user.blockStatus === 1 ? <Shield size={18} /> : <ShieldOff size={18} />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedUser(user);
            }}
            className="p-1 rounded text-blue-600 hover:bg-blue-100"
            title="View Details"
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
        {userType === "customer" ? "Customer Management" : "Car Owner Management"}
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
        emptyMessage="No users found"
        rowClassName={(user) => user.blockStatus === 1 ? 'bg-red-50' : ''}
      />

      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onToggleBlock={handleToggleBlock}
        />
      )}
    </div>
  );
};

export default UserManagementPage;