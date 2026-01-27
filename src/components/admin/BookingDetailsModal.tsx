// import React from 'react';
// import { format } from 'date-fns';
// import { XCircle, User, Car, Calendar, DollarSign, Clock } from 'lucide-react';

// interface BookingModalProps {
//   booking: any;
//   onClose: () => void;
// }

// const BookingDetailsModal: React.FC<BookingModalProps> = ({ booking, onClose }) => {
  
//   const formatDateWithTime = (dateString: string) => {
//     try {
//       return format(new Date(dateString), 'MMM d, yyyy');
//     } catch (e) {
//       return "Invalid date";
//     }
//   };
  
  
//   const calculateDuration = () => {
//     const start = new Date(booking.startDate);
//     const end = new Date(booking.endDate);
//     const diffTime = Math.abs(end.getTime() - start.getTime());
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))+1;
//     return diffDays;
//   };


//   const getBookingTimeStatus = () => {
//     const now = new Date();
//     const start = new Date(booking.startDate);
//     const end = new Date(booking.endDate);

//     if (now < start) {
//       return { status: 'upcoming', color: 'text-blue-500' };
//     } else if (now > end) {
//       return { status: 'completed', color: 'text-gray-500' };
//     } else {
//       return { status: 'ongoing', color: 'text-green-500' };
//     }
//   };

//   const timeStatus = getBookingTimeStatus();

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center p-6 border-b">
//           <h2 className="text-xl font-bold">Booking Details</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600"
//           >
//             <XCircle size={24} />
//           </button>
//         </div>

//         <div className="p-6">
        
//           <div className="flex justify-between items-start mb-6">
//             <div>
//               <p className="text-sm text-gray-500">Booking ID</p>
//               <p className="font-medium">{booking.bookingId}</p>
//             </div>
//             <div>
//               {booking.status.toLowerCase() === 'cancelled' ? (
//                 <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium">
//                   Cancelled
//                 </span>
//               ) : (
//                 <span className={`px-3 py-1 bg-${timeStatus.color.replace('text-', '')}-100 ${timeStatus.color} rounded-full font-medium`}>
//                   {timeStatus.status.charAt(0).toUpperCase() + timeStatus.status.slice(1)}
//                 </span>
//               )}
//             </div>
//           </div>

        
//           <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//             <div className="flex items-start gap-3">
//               <Car className="text-gray-400 mt-1" size={20} />
//               <div>
//                 <h3 className="font-semibold">Car Details</h3>
//                 <p className="text-lg font-medium mt-1">{booking.car.carName}</p>
//                 <p className="text-gray-600">{booking.car.brand} {booking.car.model}</p>
//                 <p className="text-sm text-gray-500 mt-1">ID: {booking.carId._id}</p>
//               </div>
//             </div>
//           </div>

          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             <div className="p-4 bg-gray-50 rounded-lg">
//               <div className="flex items-start gap-3">
//                 <User className="text-gray-400 mt-1" size={20} />
//                 <div>
//                   <h3 className="font-semibold">Customer</h3>
//                   <p className="font-medium mt-1">{booking.customer.fullName}</p>
//                   <p className="text-gray-600">{booking.customer.email}</p>
//                   <p className="text-sm text-gray-500 mt-1">ID: {booking.customer._id}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="p-4 bg-gray-50 rounded-lg">
//               <div className="flex items-start gap-3">
//                 <User className="text-gray-400 mt-1" size={20} />
//                 <div>
//                   <h3 className="font-semibold">Car Owner</h3>
//                   <p className="font-medium mt-1">{booking.carOwner.fullName}</p>
//                   <p className="text-gray-600">{booking.carOwner.email}</p>
//                   <p className="text-sm text-gray-500 mt-1">ID: {booking.carOwner._id}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

    
//           <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//             <div className="flex items-start gap-3">
//               <Calendar className="text-gray-400 mt-1" size={20} />
//               <div>
//                 <h3 className="font-semibold">Booking Period</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
//                   <div>
//                     <p className="text-sm text-gray-500">Start Date</p>
//                     <p className="font-medium">{formatDateWithTime(booking.startDate)}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">End Date</p>
//                     <p className="font-medium">{formatDateWithTime(booking.endDate)}</p>
//                   </div>
//                 </div>
//                 <p className="mt-2 text-sm">Duration: <span className="font-medium">{calculateDuration()} days</span></p>
//               </div>
//             </div>
//           </div>

        
//           <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//             <div className="flex items-start gap-3">
//               <DollarSign className="text-gray-400 mt-1" size={20} />
//               <div>
//                 <h3 className="font-semibold">Payment Details</h3>
//                 <p className="text-xl font-medium text-green-600 mt-2">₹{booking.totalPrice}</p>
//                 <p className="text-sm text-gray-500">Total amount paid</p>
//               </div>
//             </div>
//           </div>

//           {/* Booking Date */}
//           <div className="p-4 bg-gray-50 rounded-lg">
//             <div className="flex items-start gap-3">
//               <Clock className="text-gray-400 mt-1" size={20} />
//               <div>
//                 <h3 className="font-semibold">Booking Created</h3>
//                 <p className="font-medium mt-1">{formatDateWithTime(booking.createdAt)}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="border-t p-6 flex justify-end">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md font-medium transition-colors"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingDetailsModal;


import React from 'react';
import { XCircle, User, Car, Calendar, DollarSign, Clock } from 'lucide-react';

interface BookingModalProps {
  booking: any;
  onClose: () => void;
}

const BookingDetailsModal: React.FC<BookingModalProps> = ({ booking, onClose }) => {
  
  const formatDateWithTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    } catch (e) {
      return "Invalid date";
    }
  };
  
  const calculateDuration = () => {
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getBookingTimeStatus = () => {
    const now = new Date();
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);

    if (now < start) {
      return { status: 'upcoming', color: 'bg-blue-100 text-blue-700 border-blue-200' };
    } else if (now > end) {
      return { status: 'completed', color: 'bg-green-100 text-green-700 border-gray-200' };
    } else {
      return { status: 'ongoing', color: 'bg-yellow-100 text-yellow-700 border-green-200' };
    }
  };

  const timeStatus = getBookingTimeStatus();

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4
                bg-black/30 backdrop-blur-md">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Booking Details</h2>
              <p className="text-blue-100 text-sm mt-1">Complete information about the booking</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
            >
              <XCircle size={24} />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 p-6">
          <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-gray-200">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Booking ID</p>
              <p className="text-lg font-bold text-gray-800 mt-1">{booking.bookingId}</p>
            </div>
            <div>
              {booking.status.toLowerCase() === 'cancelled' ? (
                <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full font-semibold border border-red-200 text-sm">
                  Cancelled
                </span>
              ) : (
                <span className={`px-4 py-2 rounded-full font-semibold border text-sm ${timeStatus.color}`}>
                  {timeStatus.status.charAt(0).toUpperCase() + timeStatus.status.slice(1)}
                </span>
              )}
            </div>
          </div>


          <div className="mb-6 p-5 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Car className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Vehicle</h3>
                <p className="text-xl font-bold text-gray-800 mt-1">{booking.car.carName}</p>
                <p className="text-gray-600 mt-1">{booking.car.brand} • {booking.car.model}</p>
                <p className="text-xs text-gray-400 mt-2 font-mono">ID: {booking.carId}</p>
              </div>
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <User className="text-blue-600" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Customer</h3>
                  <p className="font-bold text-gray-800 mt-2">{booking.customer.fullName}</p>
                  <p className="text-sm text-gray-600 mt-1">{booking.customer.email}</p>
                  <p className="text-xs text-gray-400 mt-2 font-mono">ID: {booking.customer._id}</p>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <User className="text-green-600" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Car Owner</h3>
                  <p className="font-bold text-gray-800 mt-2">{booking.carOwner.fullName}</p>
                  <p className="text-sm text-gray-600 mt-1">{booking.carOwner.email}</p>
                  <p className="text-xs text-gray-400 mt-2 font-mono">ID: {booking.carOwner._id}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Calendar className="text-purple-600" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Rental Period</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 font-semibold">START DATE</p>
                    <p className="font-bold text-gray-800 mt-1">{formatDateWithTime(booking.startDate)}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 font-semibold">END DATE</p>
                    <p className="font-bold text-gray-800 mt-1">{formatDateWithTime(booking.endDate)}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <Clock size={16} className="text-blue-600" />
                  <p className="text-sm text-gray-700">
                    Total Duration: <span className="font-bold text-blue-600">{calculateDuration()} days</span>
                  </p>
                </div>
              </div>
            </div>
          </div>


          <div className="mb-6 p-5 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-100 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <DollarSign className="text-white" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Payment</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">₹{booking.totalPrice}</p>
                <p className="text-sm text-gray-600 mt-1">Total amount paid</p>
              </div>
            </div>
          </div>


          <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="bg-gray-100 p-2 rounded-lg">
                <Clock className="text-gray-600" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Booking Created</h3>
                <p className="font-bold text-gray-800 mt-2">{formatDateWithTime(booking.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>


        <div className="border-t border-gray-200 p-6 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-gray-300 hover:bg-blue-400 text-gray-700 rounded-lg font-semibold transition-colors shadow-sm"
          >
            Close
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;