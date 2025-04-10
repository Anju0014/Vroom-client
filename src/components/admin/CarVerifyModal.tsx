import React, { useState } from "react";
import { X, Check, X as Cross } from "lucide-react";

interface Car {
  id: string;
  carName: string;
  brand: string;
  year?: string;
  fuelType?: string;
  rcBookNo?: string;
  expectedWage: string;
  location: string;
  make?: string;
  carModel?: string;
  isVerified: boolean;
  images: string[];
  videos?: string[];
  owner: string;
  available?: boolean;
  createdAt: Date;
}

interface CarVerifyModalProps {
  car: Car;
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
      await onVerifyCar(car.id, rejectReason);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold">Car Verification</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={processing}
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto" style={{ maxHeight: "calc(90vh - 160px)" }}>
          {/* Car Details */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Car Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Car Name</p>
                <p className="font-medium">{car.carName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Brand</p>
                <p className="font-medium">{car.brand}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Model</p>
                <p className="font-medium">{car.carModel || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Year</p>
                <p className="font-medium">{car.year || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fuel Type</p>
                <p className="font-medium">{car.fuelType || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">RC Book Number</p>
                <p className="font-medium">{car.rcBookNo || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Expected Wage (per day)</p>
                <p className="font-medium">{car.expectedWage}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{car.location}</p>
              </div>
            </div>
          </div>

          {/* Car Images */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Car Images</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {car.images && car.images.length > 0 ? (
                car.images.map((image, index) => (
                  <div key={index} className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={image}
                      alt={`${car.carName} image ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))
              ) : (
                <p className="col-span-full text-gray-500">No images provided</p>
              )}
            </div>
          </div>

          {/* Car Videos */}
          {car.videos && car.videos.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Car Videos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {car.videos.map((video, index) => (
                  <div key={index} className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
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

          {/* Reject Form */}
          {showRejectForm && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Rejection Reason</h3>
              <p className="text-sm text-gray-500 mb-2">
                Please provide a reason why this car is being rejected
              </p>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter reason for rejection"
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={3}
                required
              />
            </div>
          )}
        </div>

        <div className="flex justify-end items-center gap-2 border-t p-4">
          {showRejectForm ? (
            <>
              <button
                onClick={() => setShowRejectForm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                disabled={processing}
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 disabled:bg-red-300"
                disabled={processing || !rejectReason.trim()}
              >
                {processing ? "Processing..." : "Confirm Rejection"}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowRejectForm(true)}
                className="flex items-center gap-1 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 disabled:bg-red-300"
                disabled={processing}
              >
                <Cross size={16} /> Reject
              </button>
              <button
                onClick={handleVerify}
                className="flex items-center gap-1 px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-green-300"
                disabled={processing}
              >
                <Check size={16} /> Verify
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarVerifyModal;