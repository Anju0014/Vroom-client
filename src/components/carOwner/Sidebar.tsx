"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IUser } from "@/types/authTypes";

interface SidebarProps {
  user: IUser;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const pathname = usePathname();

  const navItems = [
    { name: "Profile", path: "/dashboard/profile", icon: "user" },
    { name: "Cars", path: "/dashboard/cars", icon: "car" },
    { name: "Bookings", path: "/dashboard/bookings", icon: "calendar" },
    { name: "Agreements", path: "/dashboard/agreements", icon: "file-text" },
    { name: "ID Proof", path: "/dashboard/id-proof", icon: "id-card" },
  ];

  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white p-4">
      {/* User Info */}
      <div className="flex flex-col items-center mb-8 pt-4">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 relative">
          <Image
            src={user.profileImage ?? "/images/user.png"}
            alt={user.fullName}
            width={96}
            height={96}
            style={{ objectFit: "cover" }} // Replaced objectFit
          />
        </div>
        <h2 className="text-xl font-semibold">{user.fullName}</h2>
        <p className="text-gray-400 text-sm">{user.email}</p>
      </div>

      {/* Navigation */}
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link
                href={item.path}
                className={`flex items-center p-3 rounded-lg ${
                  pathname === item.path ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
              >
                <span className="mr-3 text-lg">
                  <i className={`fas fa-${item.icon}`}></i>
                </span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;




