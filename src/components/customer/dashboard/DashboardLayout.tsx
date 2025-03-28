
"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { AuthService } from "@/services/customer/authService";
import { useAuthStore } from "@/store/customer/authStore";
import toast from "react-hot-toast";
interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
 
  const [loading, setLoading] = useState(true);

  const { user, accessToken, setAuth } = useAuthStore();
  console.log("check user",user);
  console.log("check access", accessToken)


  useEffect(() => {
    const fetchUser = async () => {
      if (!accessToken) {
        toast.error("No access token available");
        setLoading(false);
        return;
      }
  
      try {
        const userData = await AuthService.getCustomerProfile();
        console.log("userData",userData)
        setAuth(userData, accessToken);
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
  }, [user, accessToken, setAuth]);
  

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
