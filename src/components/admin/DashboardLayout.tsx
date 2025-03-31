
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
 
  const { user, accessToken, setAuthAdmin } = useAuthStoreAdmin();
  console.log("check user",user);
  console.log("check access", accessToken)

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
