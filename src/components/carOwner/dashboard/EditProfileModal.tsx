// "use client";

// import React, { useState } from "react";
// import { OwnerAuthService } from "@/services/carOwner/authService";
// import { toast } from "react-hot-toast";

// // Interfaces
// interface Address {
//   addressLine1: string;
//   addressLine2?: string;
//   city: string;
//   state: string;
//   postalCode: string;
//   country: string;
// }

// interface EditProfileModalProps {
//   currentPhoneNumber?: string;
//   currentAddress?: Address;
//   onClose: () => void;
//   onProfileUpdated: (newPhoneNumber: string, newAddress: Address) => void;
// }

// const EditProfileModal: React.FC<EditProfileModalProps> = ({
//   currentPhoneNumber = "",
//   currentAddress,
//   onClose,
//   onProfileUpdated,
// }) => {
//   const [phoneNumber, setPhoneNumber] = useState(currentPhoneNumber);
//   const [address, setAddress] = useState<Address>(
//     currentAddress || {
//       addressLine1: "",
//       addressLine2: "",
//       city: "",
//       state: "",
//       postalCode: "",
//       country: "",
//     }
//   );

//   const [loading, setLoading] = useState(false);

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const payload = { phoneNumber, address };
//       await OwnerAuthService.updateOwnerProfile(payload);
//       toast.success("Profile updated successfully");
//       onProfileUpdated(phoneNumber, address);
//       onClose();
//     } catch (error) {
//       console.error("Failed to update profile:", error);
//       toast.error("Failed to update profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle Address Changes
//   const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setAddress({ ...address, [name]: value });
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
//         <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Phone Number */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Phone Number</label>
//             <input
//               type="text"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {/* Address Fields */}
//           {Object.entries(address).map(([key, value]) => (
//             <div key={key}>
//               <label className="block text-sm font-medium text-gray-700">
//                 {key.charAt(0).toUpperCase() + key.slice(1)}
//               </label>
//               <input
//                 type="text"
//                 name={key}
//                 value={value}
//                 onChange={handleAddressChange}
//                 className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required={key !== "addressLine2"}
//               />
//             </div>
//           ))}

//           {/* Action Buttons */}
//           <div className="flex justify-end space-x-2 mt-4">
//             <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
//               Cancel
//             </button>
//             <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" disabled={loading}>
//               {loading ? "Saving..." : "Save"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProfileModal;




// "use client";

// import React, { useRef, useState } from "react";
// import Image from "next/image";
// import { OwnerAuthService } from "@/services/carOwner/authService";
// import { toast } from "react-hot-toast";
// import { S3Service } from "@/services/s3Service";
// import FileUpload from "@/components/FileUpload";
// // Interfaces
// interface Address {
//   addressLine1: string;
//   addressLine2?: string;
//   city: string;
//   state: string;
//   postalCode: string;
//   country: string;
// }

// interface EditProfileModalProps {
//   currentPhoneNumber?: string;
//   currentAddress?: Address;
//   currentProfileImage?: string;
//   onClose: () => void;
//   onProfileUpdated: (newPhoneNumber: string, newAddress: Address, newProfileImage?: string) => void;
// }

// const EditProfileModal: React.FC<EditProfileModalProps> = ({
//   currentPhoneNumber = "",
//   currentAddress,
//   currentProfileImage = "/images/user.png",
//   onClose,
//   onProfileUpdated,
// }) => {
//   const [phoneNumber, setPhoneNumber] = useState(currentPhoneNumber);
//   const [address, setAddress] = useState<Address>(
//     currentAddress || {
//       addressLine1: "",
//       addressLine2: "",
//       city: "",
//       state: "",
//       postalCode: "",
//       country: "",
//     }
//   );
//   const [profileImage, setProfileImage] = useState(currentProfileImage);
//   const [loading, setLoading] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);


//   const handleImageClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//       const reader = new FileReader();
//       reader.onload = () => setProfileImage(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleImageUploadComplete = (uploadedUrl: string) => {
//     setProfileImage(uploadedUrl);
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       let uploadedImageUrl = profileImage;

//       // 1. Upload to S3 if new image selected
//       if (selectedFile) {
//         const { url, key } = await S3Service.getPresignedUrl(selectedFile);
//         await S3Service.uploadToS3(url, selectedFile);
//         uploadedImageUrl = S3Service.getPublicUrl(key);
//       }
//       const payload = { phoneNumber, address, profileImage };
//       await OwnerAuthService.updateOwnerProfile(payload);
//       toast.success("Profile updated successfully");
//       onProfileUpdated(phoneNumber, address, profileImage);
//       onClose();
//     } catch (error) {
//       console.error("Failed to update profile:", error);
//       toast.error("Failed to update profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle Address Changes
//   const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setAddress({ ...address, [name]: value });
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
//         <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Profile Image */}
//           <div className="flex items-center justify-center">
//             <div className="relative cursor-pointer" onClick={handleImageClick}>
//               <Image
//                 src={profileImage}
//                 alt="ownerImage"
//                 width={80}
//                 height={80}
//                 className="rounded-full border"
//               />
//               <input
//                 type="file"
//                 accept="image/*"
//                 ref={fileInputRef}
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//             </div>
//           </div>

//           {/* Phone Number */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Phone Number</label>
//             <input
//               type="text"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {/* Address Fields */}
//           {Object.entries(address).map(([key, value]) => (
//             <div key={key}>
//               <label className="block text-sm font-medium text-gray-700">
//                 {key.charAt(0).toUpperCase() + key.slice(1)}
//               </label>
//               <input
//                 type="text"
//                 name={key}
//                 value={value}
//                 onChange={handleAddressChange}
//                 className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required={key !== "addressLine2"}
//               />
//             </div>
//           ))}

//           {/* Action Buttons */}
//           <div className="flex justify-end space-x-2 mt-4">
//             <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
//               Cancel
//             </button>
//             <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" disabled={loading}>
//               {loading ? "Saving..." : "Save"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProfileModal;



"use client";

import React, { useState } from "react";
import Image from "next/image";
import { OwnerAuthService } from "@/services/carOwner/authService";
import { useAuthStoreOwner } from "@/store/carOwner/authStore";
import { toast } from "react-hot-toast";
import FileUpload from "@/components/FileUpload";
import { IUser, UserRole } from "@/types/authTypes";
import { profileSchema } from "@/lib/validation";
// Interfaces
interface Address {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface EditProfileModalProps {
  currentPhoneNumber?: string;
  currentAddress?: Address;
  currentProfileImage?: string;
  onClose: () => void;
  onProfileUpdated: (newPhoneNumber: string, newAddress: Address, newProfileImage?: string) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  currentPhoneNumber = "",
  currentAddress,
  currentProfileImage = "/images/user.png",
  onClose,
  onProfileUpdated,
}) => {
  const [phoneNumber, setPhoneNumber] = useState(currentPhoneNumber);
  const [address, setAddress] = useState<Address>(
    currentAddress || {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    }
  );
  const { accessToken, user, setAuthOwner } = useAuthStoreOwner();
  const [profileImage, setProfileImage] = useState(currentProfileImage);
  const [loading, setLoading] = useState(false);

  const handleImageUploadComplete = (uploadedUrl: string | string[]) => {
    if (typeof uploadedUrl === "string") {
      console.log(uploadedUrl)
      setProfileImage(uploadedUrl);
    }
  };
  

   console.log("Zustand Access Token:", accessToken);
   console.log("Zustand User:", user);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { phoneNumber, address, profileImage };
      // profileSchema.parse(payload);
      const result = profileSchema.safeParse(payload);
          if (!result.success) {
            const errorMessages = result.error.errors.map((err) => err.message).join(", ");
            
            toast.error(errorMessages);
            return;
          }
    if (!accessToken) {
      console.error("No access token available");
      toast.error("No access token available. Please log in again.");
      setLoading(false);
      return;
    }
      console.log("Validation Passed:", payload);
      const updatedUser=await OwnerAuthService.updateOwnerProfile(payload);
      console.log("updated***************************",updatedUser)
      console.log("Updated User from API:", updatedUser);
      const updatedOwner = updatedUser.updatedOwner;
console.log("Updated Owner:", updatedOwner);
const partialUser: IUser = {
  id: updatedOwner._id,
  fullName: updatedOwner.fullName,
  email: updatedOwner.email,
  phoneNumber: updatedOwner.phoneNumber,
  address: updatedOwner.address,
  role: updatedOwner.role as UserRole, 
  profileImage: updatedOwner.profileImage ?? "/images/user.png",
};
      console.log("Partial User Before Zustand:", partialUser);
      setAuthOwner(partialUser,accessToken);
    
      toast.success("Profile updated successfully");
      
      onProfileUpdated(phoneNumber, address, profileImage !== currentProfileImage ? profileImage : undefined);

      onClose();
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        
          <div className="flex items-center justify-center">
            <div className="relative">
              <Image
                src={profileImage}
                alt="ownerImage"
                width={80}
                height={80}
                className="rounded-full border"
              />
            </div>
          </div>

      
          <label>image</label>
          <div className="text-center">
            <FileUpload onUploadComplete={handleImageUploadComplete} accept="image/*" multiple={false} />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
             
            />
          </div>

          {/* Address Fields */}
          {Object.entries(address).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleAddressChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
               
              />
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
