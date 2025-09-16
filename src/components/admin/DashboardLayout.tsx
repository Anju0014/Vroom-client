
"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { AdminAuthService} from "@/services/admin/adminService";
import { useAuthStoreAdmin } from "@/store/admin/authStore";

import toast from "react-hot-toast";
interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
 
  const { user, accessTokenAdmin, setAuthAdmin } = useAuthStoreAdmin();
   const [loading, setLoading] = useState(true);
  console.log("check user",user);
  console.log("check access", accessTokenAdmin)
  

  useEffect(() => {
    // Simulate hydration/loading from localStorage or API
    if (user !== undefined) {
      setLoading(false);
    }
  }, [user]);

    if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">Loading ...</p>
      </div>
    );
  }
  if (!user) {
    return null
    // return (
    //   <div className="flex min-h-screen items-center justify-center">
    //     <p className="text-red-500">Failed to load user</p>
    //   </div>
    // );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
    
      <Sidebar  />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
