

"use client";

import Sidebar from "@/components/carOwner/Sidebar";
import React from "react";
import { UserRole } from "@/types/authTypes";

const Profile = () => {
  const user1 = {
    id: "123456",
    fullName: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    role: "admin" as UserRole,
  };

  return (
    <div className="flex">
      <Sidebar user={user1} />
      <div className="p-4">Profile Page Content</div>
    </div>
  );
};

export default Profile;



