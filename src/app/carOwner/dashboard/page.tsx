// "use client";

// import Sidebar from "@/components/carOwner/dashboard/Sidebar";
// import React from "react";
// import { UserRole } from "@/types/authTypes";

// const Profile = () => {
//   const user1 = {
//     id: "123456",
//     fullName: "John Doe",
//     email: "johndoe@example.com",
//     phone: "123-456-7890",
//     role: "admin" as UserRole,
//   };

//   return (
//     <div className="flex">
//       <Sidebar user={user1} />
//       <div className="p-4">Profile Page Content</div>
//     </div>
//   );
// };

// export default Profile;







// // components/ProfilePage.tsx
// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';

// // Define the user data type
// interface UserProfile {
//   name: string;
//   email: string;
//   phone: string;
//   profilePic: string;
// }

// const ProfilePage: React.FC = () => {
//   const [user, setUser] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     // Fetch user data from your API
//     const fetchUserProfile = async () => {
//       try {
//         setLoading(true);
//         // Replace with your actual API endpoint
//         const response = await fetch('/api/user/profile');
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch profile data');
//         }
        
//         const userData: UserProfile = await response.json();
//         setUser(userData);
//       } catch (err) {
//         setError('Error loading profile data');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error || !user) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <div className="text-red-500">{error || 'User not found'}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
//       <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
//         {/* Profile Image */}
//         <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
//           {user.profilePic ? (
//             <Image
//               src={user.profilePic}
//               alt={`${user.name}'s profile`}
//               fill
//               className="object-cover"
//             />
//           ) : (
//             <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//               <span className="text-gray-500 text-2xl font-bold">
//                 {user.name.charAt(0)}
//               </span>
//             </div>
//           )}
//         </div>

//         {/* User Info */}
//         <div className="flex-1">
//           <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
          
//           <div className="space-y-3">
//             <div>
//               <h2 className="text-sm text-gray-500">Email</h2>
//               <p className="text-gray-800">{user.email}</p>
//             </div>
            
//             <div>
//               <h2 className="text-sm text-gray-500">Phone</h2>
//               <p className="text-gray-800">{user.phone}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Edit Profile Button */}
//       <div className="mt-6 flex justify-end">
//         <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
//           Edit Profile
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;