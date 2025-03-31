
import React, { useEffect, useState } from "react";

interface UserDetailsModalProps {
  user: any;
  onClose: () => void;
  onToggleBlock: (user: any) => void;
  onVerifyDocument: (userId: string) => void;
  onVerifyUser: (userId: string) => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ 
  user, 
  onClose, 
  onToggleBlock, 
  onVerifyDocument, 
  onVerifyUser 
}) => {
  const [updatedUser, setUpdatedUser] = useState(user);

  useEffect(() => {
    setUpdatedUser(user); 
  }, [user]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">✕</button>
        <h2 className="text-xl font-semibold mb-4">User Details</h2>

        <div className="space-y-3">
          <p><strong>ID:</strong> {updatedUser.id}</p>
          <p><strong>Name:</strong> {updatedUser.name}</p>
          <p><strong>Email:</strong> {updatedUser.email}</p>
          <p><strong>Status:</strong> 
            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${getStatusText(updatedUser.status).color}`}>
              {getStatusText(updatedUser.status).text}
            </span>
          </p>
          <p><strong>Phone:</strong> {updatedUser.phoneNumber || "Not provided"}</p>
          <p>
            <strong>Address:</strong> 
            {updatedUser.address
              ? [
                  updatedUser.address.addressLine1,
                  updatedUser.address.addressLine2,
                  updatedUser.address.city,
                  updatedUser.address.state,
                  updatedUser.address.postalCode,
                  updatedUser.address.country
                ]
                  .filter(Boolean) 
                  .join(", ")
              : "Not provided"}
          </p>

          {updatedUser.document && (
            <div className="mt-4">
              <p className="font-medium text-gray-600">Document Proof</p>
              <div className="border rounded-md p-2 bg-gray-100">
                <a href={updatedUser.document} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  View Document
                </a>
              </div>

           
              {updatedUser.status !== -2 && updatedUser.status < 1 && (
                <button 
                  onClick={() => onVerifyDocument(updatedUser.id)} 
                  className="mt-2 w-full py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                >
                  Verify Document
                </button>
              )}
            </div>
          )}

         
          {updatedUser.status !== -2 && updatedUser.status < 2 && (
            <button 
              onClick={() => onVerifyUser(updatedUser.id)} 
              className="mt-4 w-full py-2 rounded-md bg-green-500 hover:bg-green-600 text-white font-semibold"
            >
              Verify User
            </button>
          )}

         
          <button 
            onClick={() => onToggleBlock(updatedUser)} 
            className={`mt-4 w-full py-2 rounded-md text-white font-semibold
              ${updatedUser.status === -2 ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
          >
            {updatedUser.status === -2 ? "Unblock User" : "Block User"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;


const getStatusText = (status: number) => {
  switch (status) {
    case -2: return { text: "Blocked", color: "bg-red-100 text-red-800" };
    case -1: return { text: "Doc Not Verified", color: "bg-yellow-100 text-yellow-800" };
    case 0: return { text: "Not Verified", color: "bg-gray-100 text-gray-800" };
    case 1: return { text: "Doc Verified", color: "bg-blue-100 text-blue-800" };
    case 2: return { text: "Fully Verified", color: "bg-green-100 text-green-800" };
    default: return { text: "Unknown", color: "bg-gray-400 text-white" };
  }
};
