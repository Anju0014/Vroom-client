

"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { OwnerAuthService } from "@/services/carOwner/authService";
import { useAuthStoreOwner } from "@/store/carOwner/authStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
 
  const [loading, setLoading] = useState(true);

  const { user, accessToken, setAuthOwner,logout } = useAuthStoreOwner();
  console.log("check user",user);
  console.log("check access", accessToken)
   const router = useRouter();


  useEffect(() => {
    const fetchUser = async () => {
      if (!accessToken) {
        toast.error("No access token available");
        setLoading(false);
        return;
      }
  
      try {
        const userData = await OwnerAuthService.getOwnerProfile();
        console.log("userData", userData);

     
        if (userData?.carOwner?.status === -2) {
          logout();
          toast.error("You have been blocked by the admin.");
          router.push("/login");
          return;
        }
        setAuthOwner(userData.carOwner, accessToken);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false); 
      }
    };
  
    if (!user) {
      fetchUser();
    } if (user?.status === -2) {
      logout();
      toast.error("You have been blocked by the admin.");
      router.push("/login");
    } else {
      setLoading(false);
    }

    const interval = setInterval(() => {
      fetchUser();
    }, 30000);

    return () => clearInterval(interval);
  }, [user, accessToken, setAuthOwner, logout, router]);
  

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
