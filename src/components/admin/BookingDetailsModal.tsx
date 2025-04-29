import React from 'react';
import { format } from 'date-fns';
import { XCircle, User, Car, Calendar, DollarSign, Clock } from 'lucide-react';

interface BookingModalProps {
  booking: any;
  onClose: () => void;
}

const BookingDetailsModal: React.FC<BookingModalProps> = ({ booking, onClose }) => {
  
  const formatDateWithTime = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return "Invalid date";
    }
  };
  
  
  const calculateDuration = () => {
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))+1;
    return diffDays;
  };


  const getBookingTimeStatus = () => {
    const now = new Date();
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);

    if (now < start) {
      return { status: 'upcoming', color: 'text-blue-500' };
    } else if (now > end) {
      return { status: 'completed', color: 'text-gray-500' };
    } else {
      return { status: 'ongoing', color: 'text-green-500' };
    }
  };

  const timeStatus = getBookingTimeStatus();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">Booking Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XCircle size={24} />
          </button>
        </div>

        <div className="p-6">
        
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm text-gray-500">Booking ID</p>
              <p className="font-medium">{booking._id}</p>
            </div>
            <div>
              {booking.status.toLowerCase() === 'cancelled' ? (
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium">
                  Cancelled
                </span>
              ) : (
                <span className={`px-3 py-1 bg-${timeStatus.color.replace('text-', '')}-100 ${timeStatus.color} rounded-full font-medium`}>
                  {timeStatus.status.charAt(0).toUpperCase() + timeStatus.status.slice(1)}
                </span>
              )}
            </div>
          </div>

        
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-3">
              <Car className="text-gray-400 mt-1" size={20} />
              <div>
                <h3 className="font-semibold">Car Details</h3>
                <p className="text-lg font-medium mt-1">{booking.carId.carName}</p>
                <p className="text-gray-600">{booking.carId.brand} {booking.carId.model}</p>
                <p className="text-sm text-gray-500 mt-1">ID: {booking.carId._id}</p>
              </div>
            </div>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-3">
                <User className="text-gray-400 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold">Customer</h3>
                  <p className="font-medium mt-1">{booking.userId.fullName}</p>
                  <p className="text-gray-600">{booking.userId.email}</p>
                  <p className="text-sm text-gray-500 mt-1">ID: {booking.userId._id}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-3">
                <User className="text-gray-400 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold">Car Owner</h3>
                  <p className="font-medium mt-1">{booking.carOwnerId.fullName}</p>
                  <p className="text-gray-600">{booking.carOwnerId.email}</p>
                  <p className="text-sm text-gray-500 mt-1">ID: {booking.carOwnerId._id}</p>
                </div>
              </div>
            </div>
          </div>

    
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-3">
              <Calendar className="text-gray-400 mt-1" size={20} />
              <div>
                <h3 className="font-semibold">Booking Period</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-medium">{formatDateWithTime(booking.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">End Date</p>
                    <p className="font-medium">{formatDateWithTime(booking.endDate)}</p>
                  </div>
                </div>
                <p className="mt-2 text-sm">Duration: <span className="font-medium">{calculateDuration()} days</span></p>
              </div>
            </div>
          </div>

        
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-3">
              <DollarSign className="text-gray-400 mt-1" size={20} />
              <div>
                <h3 className="font-semibold">Payment Details</h3>
                <p className="text-xl font-medium text-green-600 mt-2">₹{booking.totalPrice}</p>
                <p className="text-sm text-gray-500">Total amount paid</p>
              </div>
            </div>
          </div>

          {/* Booking Date */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-3">
              <Clock className="text-gray-400 mt-1" size={20} />
              <div>
                <h3 className="font-semibold">Booking Created</h3>
                <p className="font-medium mt-1">{formatDateWithTime(booking.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t p-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;