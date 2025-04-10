
import React, { useEffect, useState } from "react";

interface UserVerifyModalProps {
  user: any;
  onClose: () => void;
  onVerifyUser: (userId: string, reason?: string) => void;
}

const UserVerifyModal: React.FC<UserVerifyModalProps> = ({
  user,
  onClose,
  onVerifyUser,
}) => {
  const [updatedUser, setUpdatedUser] = useState(user);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectReason, setShowRejectReason] = useState(false);

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const handleVerifyUser = () => {
    onVerifyUser(updatedUser.id);
  };
  
  const handleRejectUser = () => {
    setShowRejectReason(true);
  };

  const handleRejectSubmit = () => {
    if (!rejectReason.trim()) {
      alert("Please provide a rejection reason.");
      return;
    }
    
    onVerifyUser(updatedUser.id, rejectReason);
    setShowRejectReason(false);
    setRejectReason("");
  };

  const handleCancelReject = () => {
    setShowRejectReason(false);
    setRejectReason("");
  };

  const formatAddress = (address: any) => {
    if (!address) return "Not provided";
    
    return [
      address.addressLine1,
      address.addressLine2,
      address.city,
      address.state,
      address.postalCode,
      address.country
    ]
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Car Owner Details</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">ID</p>
              <p className="font-medium truncate">{updatedUser.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusText(updatedUser.verifyStatus).color}`}>
                {getStatusText(updatedUser.verifyStatus).text}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{updatedUser.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{updatedUser.email}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{updatedUser.phoneNumber || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Alternate Phone</p>
              <p className="font-medium">{updatedUser.altPhoneNumber || "Not provided"}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">{formatAddress(updatedUser.address)}</p>
          </div>

          {updatedUser.document && (
            <div className="pt-2 mt-2 border-t border-gray-200">
              <p className="font-medium text-gray-700 mb-2">Document Proof</p>
              
              <div className="flex items-center gap-2">
                <a 
                  href={updatedUser.document} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  View Document
                </a>
              </div>
            </div>
          )}
          
          <div className="pt-2 mt-2 border-t border-gray-200">
            <p className="font-medium text-gray-700 mb-2">Car Owner Verification</p>
            
            {!showRejectReason ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleVerifyUser} 
                  className="inline-flex items-center px-4 py-2 bg-green-400 hover:bg-green-500 text-white rounded transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  Verify Car Owner
                </button>
                <button 
                  onClick={handleRejectUser} 
                  className="inline-flex items-center px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  Reject Car Owner
                </button>
              </div>
            ) : (
              <div className="mt-2">
                <textarea
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 focus:border-blue-300 outline-none transition"
                  placeholder="Enter rejection reason..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows={3}
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleCancelReject}
                    className="flex-1 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRejectSubmit}
                    className="flex-1 py-2 rounded-md bg-red-400 hover:bg-red-500 text-white font-medium transition-colors"
                  >
                    Submit Rejection
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserVerifyModal;

const getStatusText = (verifyStatus: number) => {
  switch (verifyStatus) {
    case -1: return { text: "Rejected", color: "bg-red-50 text-red-600" };
    case 0: return { text: "Not Verified", color: "bg-yellow-50 text-yellow-600" };
    case 1: return { text: "Fully Verified", color: "bg-green-50 text-green-600" };
    default: return { text: "Unknown", color: "bg-gray-100 text-gray-600" };
  }
};