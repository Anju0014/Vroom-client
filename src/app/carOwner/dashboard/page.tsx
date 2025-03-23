// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuthStoreOwner } from "@/store/carOwner/authStore";
// import { OwnerAuthService } from "@/services/carOwner/authService";
// import { toast } from "react-hot-toast";

// export default function CarOwnerDashboard() {
//   const router = useRouter();
//   const { user, accessToken } = useAuthStoreOwner();
//   const [isRegistrationComplete, setIsRegistrationComplete] = useState<boolean | null>(null);

//   // Check registration status when the page loads
//   useEffect(() => {
//     const fetchOwnerStatus = async () => {
//       try {
//         const response = await OwnerAuthService.getOwnerProfile();
//         setIsRegistrationComplete(response.data.isRegistrationComplete);
//       } catch (error) {
//         console.error("Failed to fetch car owner status:", error);
//         toast.error("Failed to load registration status");
//       }
//     };

//     if (accessToken) {
//       fetchOwnerStatus();
//     }
//   }, [accessToken]);

//   const handleCompleteRegistration = () => {
//     router.push("/carOwner/complete-registration");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <h1 className="text-3xl font-bold mb-6">Car Owner Dashboard</h1>

//       {/* Show Registration Button if Not Completed */}
//       {isRegistrationComplete === false && (
//         <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
//           <h2 className="text-lg font-semibold text-yellow-800 mb-2">Complete Your Registration</h2>
//           <p className="text-sm text-yellow-700 mb-4">
//             To access all features, please complete your registration.
//           </p>
//           <button
//             onClick={handleCompleteRegistration}
//             className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
//           >
//             Complete Registration
//           </button>
//         </div>
//       )}

//       {/* Dashboard Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Total Cars */}
//         <div className="bg-white shadow-md rounded-lg p-6">
//           <h3 className="text-xl font-semibold mb-2">Total Cars</h3>
//           <p className="text-4xl font-bold text-gray-800">12</p>
//         </div>

//         {/* Pending Bookings */}
//         <div className="bg-white shadow-md rounded-lg p-6">
//           <h3 className="text-xl font-semibold mb-2">Pending Bookings</h3>
//           <p className="text-4xl font-bold text-gray-800">5</p>
//         </div>

//         {/* Total Earnings */}
//         <div className="bg-white shadow-md rounded-lg p-6">
//           <h3 className="text-xl font-semibold mb-2">Total Earnings</h3>
//           <p className="text-4xl font-bold text-green-500">$4,230</p>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import { OwnerAuthService } from "@/services/carOwner/authService";
import { useAuthStoreOwner } from "@/store/carOwner/authStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-hot-toast";

const  CarOwnerProfile =()=>{
  const { user, accessToken, logout } = useAuthStoreOwner();
  const router = useRouter();
  const [ownerDetails, setOwnerDetails] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  // Fetch Car Owner Details
  useEffect(() => {
    const fetchOwnerDetails = async () => {
      try {
        const response = await OwnerAuthService.getOwnerProfile();
        setOwnerDetails(response.data);
        setFormData({
          fullName: response.data.fullName || "",
          email: response.data.email || "",
          phoneNumber: response.data.phoneNumber || "",
        });
      } catch (error) {
        console.error("Error fetching owner details:", error);
        toast.error("Failed to load profile");
      }
    };

    if (accessToken) fetchOwnerDetails();
  }, [accessToken]);

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update Profile
  const handleUpdateProfile = async () => {
    try {
      const response = await OwnerAuthService.updateOwnerProfile(formData);
      setOwnerDetails(response.data);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  // Logout
  const handleLogout = async () => {
    logout();
    router.push("/");
    toast.success("Logged out successfully!");
  };

  if (!ownerDetails) {
    return <div className="text-center py-10">Loading Profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Car Owner Profile</h1>

      {/* Profile Picture */}
      <div className="flex items-center space-x-4 mb-6">
        <Image
          src={ownerDetails.image || "/images/avatar-placeholder.png"}
          alt="Profile Picture"
          width={80}
          height={80}
          className="rounded-full border"
        />
        <div>
          <h2 className="text-xl font-semibold">{ownerDetails.fullName}</h2>
          <p className="text-gray-500">{ownerDetails.email}</p>
        </div>
      </div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          {isEditing ? (
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          ) : (
            <p className="p-2 bg-gray-100 rounded-md">{ownerDetails.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <p className="p-2 bg-gray-100 rounded-md">{ownerDetails.email}</p>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          {isEditing ? (
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          ) : (
            <p className="p-2 bg-gray-100 rounded-md">{ownerDetails.phoneNumber}</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-end space-x-4">
        {isEditing ? (
          <>
            <button
              onClick={handleUpdateProfile}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Edit Profile
          </button>
        )}

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default CarOwnerProfile