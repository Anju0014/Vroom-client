import React from "react";
import { X } from "lucide-react";
import { Car } from "@/types/carTypes";

interface CarDetailsModalProps {
  car: Car;
  onClose: () => void;
}

const CarDetailsModal: React.FC<CarDetailsModalProps> = ({ car, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">{car.carName}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Car Images Carousel */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Photos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {car.images && car.images.length > 0 ? (
                car.images.map((image, index) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                    <img 
                      src={image} 
                      alt={`${car.carName} image ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))
              ) : (
                <div className="text-gray-500">No images available</div>
              )}
            </div>
          </div>

          {/* Car Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Car Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Brand</span>
                  <span className="font-medium">{car.brand}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Year</span>
                  <span className="font-medium">{car.year}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Fuel Type</span>
                  <span className="font-medium">{car.fuelType}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">RC Book No.</span>
                  <span className="font-medium">{car.rcBookNo}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Price per Day</span>
                  <span className="font-medium">₹{car.expectedWage}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Availability</span>
                  <span className={`font-medium ${car.available ? 'text-green-600' : 'text-red-600'}`}>
                    {car.available ? 'Available' : 'Not Available'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Owner Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Name</span>
                  <span className="font-medium">{car.owner?.name || 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium">{car.owner?.email || 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Phone</span>
                  <span className="font-medium">{car.owner?.phoneNumber || 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium">{car.location?.address || 'N/A'}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-4 mt-6">Listing Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Listed On</span>
                  <span className="font-medium">
                    {new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }).format(car.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium text-green-600">Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Videos section if available */}
          {car.videos && car.videos.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Videos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {car.videos.map((video, index) => (
                  <div key={index} className="aspect-video rounded-lg overflow-hidden">
                    <video 
                      src={video} 
                      controls 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsModal;