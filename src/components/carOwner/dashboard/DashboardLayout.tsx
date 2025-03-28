// import React, { ReactNode } from 'react';
// import Sidebar from './Sidebar';
// import { IUser } from '@/types/authTypes';

// interface DashboardLayoutProps {
//   user: IUser;
//   children: ReactNode;
// }

// const DashboardLayout: React.FC<DashboardLayoutProps> = ({ user, children }) => {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar user={user} />
//       <main className="flex-1 p-6">
//         {children}
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;



// "use client";

// import React, { ReactNode, useEffect, useState } from "react";
// import Sidebar from "./Sidebar";
// import { OwnerAuthService } from "@/services/carOwner/authService";
// import { IUser } from "@/types/authTypes";

// interface DashboardLayoutProps {
//   children: ReactNode;
// }

// const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
//   const [user, setUser] = useState<IUser | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const userData = await OwnerAuthService.getOwnerProfile();
//         setUser(userData);
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <p className="text-red-500">Failed to load user</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Pass user as a prop */}
//       <Sidebar user={user} />
//       <main className="flex-1 p-6">{children}</main>
//     </div>
//   );
// };

// export default DashboardLayout;

"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { OwnerAuthService } from "@/services/carOwner/authService";
import { useAuthStoreOwner } from "@/store/carOwner/authStore";
import toast from "react-hot-toast";
interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
 
  const [loading, setLoading] = useState(true);

  const { user, accessToken, setAuthOwner } = useAuthStoreOwner();
  console.log("check user",user);
  console.log("check access", accessToken)

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     if (!accessToken) {
  //       console.error("No access token available");
  //       return;
  //     }
  
  //     try {
  //       const userData = await OwnerAuthService.getOwnerProfile();
  //       // setAuthOwner(accessToken, userData);
  //     } catch (error) {
  //       console.error("Error fetching user:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   if (!user) fetchUser();
  //   else setLoading(false);
  // }, [user, accessToken, setAuthOwner]);
  useEffect(() => {
    const fetchUser = async () => {
      if (!accessToken) {
        toast.error("No access token available");
        setLoading(false);
        return;
      }
  
      try {
        const userData = await OwnerAuthService.getOwnerProfile();
        setAuthOwner(userData, accessToken);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false); 
      }
    };
  
    if (!user) {
      fetchUser();
    } else {
      setLoading(false);  
    }
  }, [user, accessToken, setAuthOwner]);
  

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">Failed to load user</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
    
      <Sidebar  />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
