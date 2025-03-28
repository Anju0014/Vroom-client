
"use client";

import React, { useEffect, useState } from "react";
import { OwnerAuthService } from "@/services/carOwner/authService";
import EditProfileModal from "@/components/carOwner/dashboard/EditProfileModal";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { FileText, FileUp,Eye } from 'lucide-react';
import FileUpload from "@/components/FileUpload";

interface Address {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

interface CarOwner {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  profileImage?: string;
  address?:Address;
}

const ProfilePage = () => {
  const [ownerDetails, setOwnerDetails] = useState<CarOwner | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [idProof, setIdProof] = useState<string | null>(null);

  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await OwnerAuthService.getOwnerProfile();
        console.log(data)
        setOwnerDetails(data.carOwner);
        console.log(data.carOwner)
        console.log("idProof",data.carOwner.idProof);
        setIdProof(data.carOwner.idProof || null);
     
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []); 



  const handleProfileUpdated = (newPhoneNumber: string, newAddress: Address, newProfileImage?: string) => {
    if (ownerDetails) {
      setOwnerDetails({ 
        ...ownerDetails, 
        phoneNumber: newPhoneNumber, 
        address: newAddress, 
        profileImage: newProfileImage || ownerDetails.profileImage 
      });
    }
  };

  const handleUploadComplete = async (uploadedUrl: string|string[]) => {
    try {
    
      if (typeof uploadedUrl === "string") {
      await OwnerAuthService.updateOwnerIdProof({ idProof: uploadedUrl });
      setIdProof(uploadedUrl);
      toast.success("ID Proof uploaded successfully!");}
    } catch (error) {
      console.error("Failed to update profile with ID Proof:", error);
      toast.error("Failed to update ID Proof");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!ownerDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg">Failed to load profile.</p>
      </div>
    );
  }

  const { address} = ownerDetails;
  
  
  return (
    <div>
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Car Owner Profile</h1>
    
        <div className="flex items-center space-x-4 mb-6">
          <Image
            src={ownerDetails.profileImage || "/images/user.png"}
            alt="ownerImage"
            width={80}
            height={80}
            className="rounded-full border"
          />
          <div>
            <h2 className="text-xl font-semibold">{ownerDetails.fullName}</h2>
            <p className="text-gray-500">{ownerDetails.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Full Name</h3>
            <p className="p-2 bg-gray-100 rounded-md">{ownerDetails.fullName}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700">Email</h3>
            <p className="p-2 bg-gray-100 rounded-md">{ownerDetails.email}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700">Phone Number</h3>
            <p className="p-2 bg-gray-100 rounded-md">
              {ownerDetails.phoneNumber || "N/A"}
            </p>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-700">Address</h3>
            {address ? (
              <div className="p-4 bg-gray-100 rounded-md space-y-1">
                <p>{address.addressLine1}</p>
                {address.addressLine2 && <p>{address.addressLine2}</p>}
                <p>
                  {address.city}, {address.state} - {address.postalCode}
                </p>
                <p>{address.country}</p>
              </div>
            ) : (
              <p className="p-2 bg-gray-100 rounded-md">No address added.</p>
            )}
          </div>
        </div>

        <button 
          onClick={() => setIsEditing(true)} 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Edit Profile
        </button>

        {isEditing && (
          <EditProfileModal
            currentProfileImage={ownerDetails?.profileImage}
            currentPhoneNumber={ownerDetails?.phoneNumber}
            currentAddress={ownerDetails?.address}
            onClose={() => setIsEditing(false)}
            onProfileUpdated={handleProfileUpdated}
          />
        )}
      </div>

     
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <FileText className="mr-2 text-blue-500" />
            ID Proof Document
          </h2>
          {idProof && (
            <a
              href={idProof}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center"
            >
              <Eye className="mr-1" size={18} />
              View Document
            </a>
          )}
        </div>

        {idProof ? (
          <div className="bg-green-50 p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="text-green-600" />
              <p className="text-green-700">ID Proof uploaded successfully</p>
            </div>
            {/* <button 
              onClick={() => setIdProof(null)} 
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button> */}
          </div>
        ) : (
          <FileUpload
            accept="image/*,application/pdf"
            multiple={false}
            onUploadComplete={handleUploadComplete}
          />
        )}
      </div>
    </div>


   
    
  );
};

export default ProfilePage;

