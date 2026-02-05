// import React, { useState } from "react";
// import { X, Check, X as Cross } from "lucide-react";
// import toast from "react-hot-toast";
// import { Car } from "@/types/carTypes";
// import {Eye,VideoIcon} from 'lucide-react'
// import VideoCall from "../common/VideoCall";

// interface CarVerifyModalProps {
//   car: Car;
//   onClose: () => void;
//   onVerifyCar: (carId: string, reason?: string) => Promise<void>;
// }

// const CarVerifyModal: React.FC<CarVerifyModalProps> = ({
//   car,
//   onClose,
//   onVerifyCar,
// }) => {
//   const [rejectReason, setRejectReason] = useState("");
//   const [showRejectForm, setShowRejectForm] = useState(false);
//   const [processing, setProcessing] = useState(false);
//   const [showVideoCall, setShowVideoCall] = useState(false);


//   const handleVerify = async () => {
//     try {
//       setProcessing(true);
//       await onVerifyCar(car.id);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const handleReject = async () => {
//     try {
//       setProcessing(true);
//       if (!rejectReason.trim()) {
//         toast.error("Please provide a rejection reason.");
//         return;
//       }
//       await onVerifyCar(car.id, rejectReason);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
//         <div className="flex justify-between items-center border-b p-4">
//           <h2 className="text-xl font-semibold">Car Verification</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//             disabled={processing}
//           >
//             <X size={24} />
//           </button>
//         </div>

//         <div className="p-4 overflow-y-auto" style={{ maxHeight: "calc(90vh - 160px)" }}>
//           {/* Car Details */}
//           <div className="mb-6">
//             <h3 className="text-lg font-medium mb-4">Car Information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm text-gray-500">Car Name</p>
//                 <p className="font-medium">{car.carName}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Brand</p>
//                 <p className="font-medium">{car.brand}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Model</p>
//                 <p className="font-medium">{car.carModel || "Not specified"}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Year</p>
//                 <p className="font-medium">{car.year || "Not specified"}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Fuel Type</p>
//                 <p className="font-medium">{car.fuelType || "Not specified"}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">RC Book Number</p>
//                 <p className="font-medium">{car.rcBookNo || "Not specified"}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Expected Wage (per day)</p>
//                 <p className="font-medium">{car.expectedWage}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Location</p>
//                 <p className="font-medium">{car.location.address}</p>
//               </div>
//             </div>
//           </div>

//           {/* Car Images */}
//           <div className="mb-6">
//             <h3 className="text-lg font-medium mb-4">Car Images</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {car.images && car.images.length > 0 ? (
//                 car.images.map((image, index) => (
//                   <div key={index} className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
//                     <img
//                       src={image}
//                       alt={`${car.carName} image ${index + 1}`}
//                       className="object-cover w-full h-full"
//                     />
//                   </div>
//                 ))
//               ) : (
//                 <p className="col-span-full text-gray-500">No images provided</p>
//               )}
//             </div>
//           </div>

//           {/* Car Videos */}
//           {car.videos && car.videos.length > 0 && (
//             <div className="mb-6">
//               <h3 className="text-lg font-medium mb-4">Car Videos</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {car.videos.map((video, index) => (
//                   <div key={index} className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
//                     <video
//                       src={video}
//                       controls
//                       className="w-full h-full"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {car.insuranceProof && (
//             <div className="mb-6">
//               <h3 className="text-lg font-medium mb-4"> Insurance Proof</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <a
//               href={car.insuranceProof}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
//             >
//               <Eye className="mr-1" size={18} />
//               View Document
//             </a>
//               </div>
//             </div>
//           )}

// {car.rcBookProof  && (
//             <div className="mb-6">
//               <h3 className="text-lg font-medium mb-4">RCBook Proof</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <a
//               href={car.rcBookProof}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
//             >
//               <Eye className="mr-1" size={18} />
//               View Document
//             </a>
//               </div>
//             </div>
//           )}

// <div className="mb-6">
//   <h3 className="text-lg font-medium mb-4">Live Verification</h3>

//   {!showVideoCall ? (
//     <button
//       onClick={() => setShowVideoCall(true)}
//       className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//     >
//       <VideoIcon className="mr-1" size={18}/>
//        Start Video Verification
//     </button>
//   ) : (
//     <div className="border rounded-lg p-3 bg-gray-50">
//       <VideoCall
//         roomId={`car-verification-${car.id}`}
//         role="admin"
//       />
//     </div>
//   )}
// </div>

//           {/* Reject Form */}
//           {showRejectForm && (
//             <div className="mb-6">
//               <h3 className="text-lg font-medium mb-2">Rejection Reason</h3>
//               <p className="text-sm text-gray-500 mb-2">
//                 Please provide a reason why this car is being rejected
//               </p>
//               <textarea
//                 value={rejectReason}
//                 onChange={(e) => setRejectReason(e.target.value)}
//                 placeholder="Enter reason for rejection"
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 rows={3}
//                 required
//               />
//             </div>
//           )}
//         </div>

//         <div className="flex justify-end items-center gap-2 border-t p-4">
//           {showRejectForm ? (
//             <>
//               <button
//                 onClick={() => setShowRejectForm(false)}
//                 className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
//                 disabled={processing}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleReject}
//                 className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 disabled:bg-red-300"
//                 disabled={processing || !rejectReason.trim()}
//               >
//                 {processing ? "Processing..." : "Confirm Rejection"}
//               </button>
//             </>
//           ) : (
//             <>
//               <button
//                 onClick={() => setShowRejectForm(true)}
//                 className="flex items-center gap-1 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 disabled:bg-red-300"
//                 disabled={processing}
//               >
//                 <Cross size={16} /> Reject
//               </button>
//               <button
//                 onClick={handleVerify}
//                 className="flex items-center gap-1 px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-green-300"
//                 disabled={processing}
//               >
//                 <Check size={16} /> Verify
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarVerifyModal;



import React, { useState } from "react";
import { X, Check, Eye, Video, FileText, Shield, Calendar, Fuel, Hash, DollarSign, MapPin, Camera } from "lucide-react";
import VideoCall from "../common/VideoCall";
import LoadingButton from "../common/LoadingButton";

interface CarVerifyModalProps {
  car: any;
  onClose: () => void;
  onVerifyCar: (carId: string, reason?: string) => Promise<void>;
}

const CarVerifyModal: React.FC<CarVerifyModalProps> = ({
  car,
  onClose,
  onVerifyCar,
}) => {
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleVerify = async () => {
    try {
      setProcessing(true);
      await onVerifyCar(car.id);
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    try {
      setProcessing(true);
      if (!rejectReason.trim()) {
        alert("Please provide a rejection reason.");
        return;
      }
      await onVerifyCar(car.id, rejectReason);
    } finally {
      setProcessing(false);
    }
  };

  const InfoItem = ({ icon: Icon, label, value }: any) => (
    <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
      <div className="flex items-center gap-2 text-gray-600 text-xs mb-1">
        <Icon size={14} className="text-blue-500" />
        <span className="font-medium">{label}</span>
      </div>
      <p className="text-gray-900 font-semibold text-sm">{value}</p>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-1">Car Verification</h2>
            <p className="text-blue-100 text-sm">Review and verify vehicle details</p>
          </div>
          <LoadingButton
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
            disabled={processing}
          >
            <X size={24} />
          </LoadingButton>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1" style={{ maxHeight: "calc(95vh - 200px)" }}>
          {/* Car Information Grid */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <FileText size={20} />
              Vehicle Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <InfoItem icon={Hash} label="Car Name" value={car.carName} />
              <InfoItem icon={Hash} label="Brand" value={car.brand} />
              <InfoItem icon={Hash} label="Model" value={car.carModel || "Not specified"} />
              <InfoItem icon={Calendar} label="Year" value={car.year || "Not specified"} />
              <InfoItem icon={Fuel} label="Fuel Type" value={car.fuelType || "Not specified"} />
              <InfoItem icon={Hash} label="RC Book Number" value={car.rcBookNo || "Not specified"} />
              <InfoItem icon={DollarSign} label="Expected Wage/Day" value={`₹${car.expectedWage}`} />
              <InfoItem icon={MapPin} label="Location" value={car.location?.address || "Not specified"} />
            </div>
          </div>

          {/* Car Images */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <Camera size={20} />
              Vehicle Gallery
            </h3>

            {car.images && car.images.length > 0 ? (
  <div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {car.images.map((image: string, index: number) => (
        <div
          key={index}
          className="relative aspect-video rounded-xl overflow-hidden
                     bg-gray-100 shadow-lg border border-blue-100"
        >
          <img
            src={image}
            alt={`${car.carName} image ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  </div>
) : (
  <div className="p-8 bg-blue-50 rounded-xl text-center border-2 border-blue-100">
    <Camera size={48} className="text-blue-300 mx-auto mb-2" />
    <p className="text-gray-500">No images provided</p>
  </div>
)}

          </div>

         
          {car.videos && car.videos.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <Video size={20} />
              Vehicle Videos
            </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {car.videos.map((video: string, index: number) => (
                  <div key={index} className="aspect-video rounded-xl overflow-hidden bg-gray-900 shadow-md border-2 border-blue-100">
                    <video
                      src={video}
                      controls
                      className="w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {car.insuranceProof && (
              <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={20} className="text-blue-600" />
                  <h3 className="text-lg font-bold text-blue-700">Insurance Proof</h3>
                </div>
                <a
                  href={car.insuranceProof}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                  <Eye size={16} />
                  View Document
                </a>
              </div>
            )}

       
            {car.rcBookProof && (
              <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <FileText size={20} className="text-blue-600" />
                  <h3 className="text-lg font-bold text-blue-700">RC Book Proof</h3>
                </div>
                <a
                  href={car.rcBookProof}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                  <Eye size={16} />
                  View Document
                </a>
              </div>
            )}
          </div>

      
          <div className="mb-6">
            <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <Video size={20} />
              Live Verification
            </h3>
            {/* {!showVideoCall ? (
              <button
                onClick={() => setShowVideoCall(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-md"
              >
                <Video size={18} />
                Start Video Verification
              </button>
            ) : (
              <div className="border-2 border-blue-200 rounded-xl p-4 bg-gradient-to-br from-blue-50 to-white">
                <div className="bg-gray-900 rounded-lg p-6 text-center text-white">
                  <Video size={48} className="mx-auto mb-3 text-blue-400" />
                  <p className="text-sm">Video Call Component for: car-verification-{car.id}</p>
                  <p className="text-xs text-gray-400 mt-2">Role: Admin</p>
                </div>
              </div>
            )} */}
             {!showVideoCall ? (
    <LoadingButton
      onClick={() => setShowVideoCall(true)}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      <Video className="mr-1" size={18}/>
       Start Video Verification
    </LoadingButton>
  ) : (
    <div className="border rounded-lg p-3 bg-gray-50">
  {/* <VideoCall
    roomId={`car-verification-${car.id}`}
    currentUserId={user.id}
    currentUserRole="admin"
  /> */}
  <VideoCall
        roomId={`car-verification-${car.id}`}
        role="admin"
      />
    </div>
  )}
          </div>

       
          {showRejectForm && (
            <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-5">
              <h3 className="text-lg font-bold text-red-700 mb-2 flex items-center gap-2">
                <X size={20} />
                Rejection Reason
              </h3>
              <p className="text-sm text-red-600 mb-3">
                Please provide a clear reason why this car is being rejected
              </p>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter detailed reason for rejection..."
                className="w-full p-3 border-2 border-red-200 rounded-lg focus:border-red-400 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                rows={4}
                required
              />
            </div>
          )}
        </div>

        <div className="flex justify-end items-center gap-3 border-t-2 border-gray-200 p-5 bg-gray-50">
          {showRejectForm ? (
            <>
              <LoadingButton
                onClick={() => setShowRejectForm(false)}
                className="px-6 py-2.5 text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-all font-semibold"
                disabled={processing}
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                onClick={handleReject}
                className="px-6 py-2.5 text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-md flex items-center gap-2"
                disabled={processing || !rejectReason.trim()}
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <X size={16} />
                    Confirm Rejection
                  </>
                )}
              </LoadingButton>
            </>
          ) : (
            <>
              <LoadingButton
                onClick={() => setShowRejectForm(true)}
                className="px-6 py-2.5 text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 disabled:opacity-50 transition-all font-semibold shadow-md flex items-center gap-2"
                disabled={processing}
              >
                <X size={16} />
                Reject
              </LoadingButton>
              <LoadingButton
                onClick={handleVerify}
                className="px-6 py-2.5 text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50 transition-all font-semibold shadow-md flex items-center gap-2"
                disabled={processing}
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    Verify Car
                  </>
                )}
              </LoadingButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarVerifyModal;