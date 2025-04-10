
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuthStoreOwner } from "@/store/carOwner/authStore";
import { 
  User, 
  Car, 
  Calendar, 
  FileText, 
  CreditCard, 
  Home, 
  MessageSquare, 
  AlertTriangle, 
  DollarSign, 
  Settings, 
  LogOut 
} from "lucide-react";
import toast from "react-hot-toast";
import { OwnerAuthService } from "@/services/carOwner/authService";



const Sidebar: React.FC = () => {
    const {user,logout} =useAuthStoreOwner();
    console.log("user",user)
  const pathname = usePathname();
   const handleLogout= async ()=>{
        try{
          const response=await OwnerAuthService.logoutOwner();
          if(!response){
            throw new Error("Logout Failed")
          }
          logout();
        }catch(error){
          toast.error("Logout Failed.Please try Again")
        }
      }

  const navItems = [
    { name: "DashBoard", path: "/carOwner/dashboard/documents", icon: <CreditCard size={18} /> },
    { name: "Personal Details", path: "/carOwner/dashboard/profile", icon: <User size={18} /> },
    { name: "Your Cars", path: "/carOwner/dashboard/cars", icon: <Car size={18} /> },
    { name: "Bookings", path: "/dashboard/bookings", icon: <Calendar size={18} /> },
    { name: "Report & Complaint", path: "/dashboard/complaints", icon: <AlertTriangle size={18} /> },
    { name: "Revenue", path: "/dashboard/revenue", icon: <DollarSign size={18} /> },
    { name: "Chat", path: "/dashboard/chat", icon: <MessageSquare size={18} /> },
    { name: "Settings", path: "/dashboard/settings", icon: <Settings size={18} /> },
    // { name: "Logout", path: "/logout", icon: <LogOut size={18} /> },
  ];

  return (
    <div className="w-64 min-h-screen bg-blue-100 text-gray-800 p-4">
  
      <div className="flex flex-col items-center mb-8 pt-4">
        <div className="w-20 h-20 rounded-full overflow-hidden mb-3 relative">
          <Image
            src={user?.profileImage ?? "/images/user.png"}
            alt="userImage"
            width={80}
            height={80}
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        <h2 className="text-lg font-semibold">{user?.fullName}</h2>
        <p className="text-gray-600 text-sm">{user?.email}</p>
      </div>

      
      <nav>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`flex items-center py-2 px-3 rounded-md ${
                  pathname === item.path 
                    ? "bg-blue-200" 
                    : "hover:bg-red-200 transition-colors duration-200"
                }`}
              >
                <span className="mr-3 text-blue-700">{item.icon}</span>
                <span className="text-sm">{item.name}</span>
              </Link>
            </li>
          ))}
          <li>
           <button
               onClick={handleLogout}
                className="w-full flex items-center py-2 px-3 rounded-md hover:bg-red-200 transition-colors duration-200 "
              >
              <LogOut size={18} className="mr-3 text-blue-700" />
              <span className="text-sm">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;