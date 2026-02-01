
// "use client";

// import React, { useEffect, useState } from "react";
// import { AuthService } from "@/services/customer/authService";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/store/customer/authStore";
// import Pagination from '@/components/pagination';

// interface Booking {
//   _id?: string;
//   bookingId?:string;
//   carId: string;
//   userId?: string;
//   startDate: string;
//   endDate: string;
//   totalPrice: number;
//   status: string;
//   createdAt?: string;
//   carName: string;
//   ownerName: string;
//   ownerContact: string;
//   carOwnerId?: string;
//   pickupLocation?: string;
//   pickupCoordinates:[number][number];
//   carNumber?: string;
//   brand?: string;
//   receiptUrl?:string;
// }

// const getBookingStatus = (startDate: string, endDate: string, status: string) => {
//   const now = new Date();
//   const start = new Date(startDate);
//   const end = new Date(endDate);

//   if (status === "cancelled") return "Cancelled";
//   if(status==='pending') return "pending";
//  if (status === "failed") return "Payment Failed";
//   if (end < now) return "Completed";
//   if (start <= now && end >= now) return "Ongoing";
//   if (start > now) return "Upcoming";

//   return status;
// };

// // Function to check if booking can be cancelled (at least one day before start date)
// const canCancelBooking = (startDate: string, status: string) => {
//   if (status !== "confirmed") return false;
//   const now = new Date();
//   const start = new Date(startDate);
  
//   const diffTime = start.getTime() - now.getTime();
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
//   return diffDays >= 1;
// };

// const BookingsPage = () => {
//   const router = useRouter();
//   const { user, accessToken } = useAuthStore();
//   const [loading, setLoading] = useState(true);
//   const [bookingData, setBookingData] = useState<Booking[]>([]);
//   const [error, setError] = useState("");
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalBookings, setTotalBookings] = useState<number>(0);
//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const [locationAccess, setLocationAccess]=useState(false);
//   const [cancelledBookingId, setCancelledBookingId] = useState<string | null>(null);

//   const itemsPerPage = 5;

//   const handleCancelBooking = async (bookingId: string) => {
//     try {
//         console.log("here at start of cancel")
//       await AuthService.cancelBooking(bookingId);
//       toast.success("Booking cancelled successfully");
//       setBookingData((prev) =>
//         prev.map((b) => (b._id === bookingId ? { ...b, status: "cancelled" } : b))
//       );
//       setCancelledBookingId(bookingId);
//     setShowCancelModal(true);
//     } catch (err) {
//       console.error("Cancel error", err);
//       toast.error("Failed to cancel booking");
//     }
//   };

//   // const handleContactOwner = (bookingId: string|undefined) => {
//   //   toast.success(`Connecting you with the owner`);
//   //   if(bookingId){
//   //    router.push(`/bookings/${bookingId}/chat`);}
//   // };

//   const handleContactOwner = (
//   ownerId: string | undefined,
//   ownerName: string | undefined
// ) => {
//   toast.success("Connecting you with the owner");

//   if (!ownerId || !ownerName) return;

//   router.push(
//     `/customer/dashboard/chats/${ownerId}/${encodeURIComponent(ownerName)}`
//   );
// };

//   useEffect(() => {
//     const fetchBookingData = async () => {
//       try {
//         setLoading(true);
        
    
     
//         const data = await AuthService.findCustomerBookingDetails(currentPage, itemsPerPage);
//         console.log('Bookings data:', data);
//         setBookingData(data.bookings || []);
//         setTotalBookings(data.total || 0);
//       } catch (error) {
//         console.error("Error fetching booking");
//         setError("Failed to load booking data. Please try again later.");
//         setBookingData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookingData();
//   }, [currentPage]);
//     const totalPages = Math.ceil(totalBookings / itemsPerPage);

//   const handlePageChange = (newPage: number) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };


//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
//       </div>
//     );

//   if (error)
//     return <div className="text-red-500 text-center p-8 font-semibold">{error}</div>;

//   if (!user)
//     return <div className="text-center p-8 font-semibold">User not found</div>;

//   return (
//     <div className=" bg-gradient-to-b from-blue-200 to-yellow-200  p-4 space-y-4 max-w-5xl mx-auto">
//       <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">My Bookings</h1>

//       {bookingData.length > 0 ? (
//         <div className="grid gap-4">
//           {bookingData.map((booking) => {
//             const {
//               _id,
//               bookingId,
//               carName,
//               brand,
//               startDate,
//               endDate,
//               totalPrice,
//               status,
//               createdAt,
//               ownerName,
//               pickupLocation,
//               pickupCoordinates,
//               carNumber,
//             } = booking;

//             const statusLabel = getBookingStatus(startDate, endDate, status);
//             const isAllowedToCancel = canCancelBooking(startDate, status);

            
//             const statusColor =
//               statusLabel === "Cancelled"
//                 ? "text-red-600"
//                 : statusLabel === "Completed"
//                 ? "text-gray-600"
//                 : statusLabel === "In Service"
//                 ? "text-blue-600"
//                 : statusLabel === "Upcoming"
//                 ? "text-green-600"
//                 : "text-yellow-600";

            
//             const statusBgColor =
//               statusLabel === "Cancelled"
//                 ? "bg-red-100"
//                 : statusLabel === "Completed"
//                 ? "bg-gray-100"
//                 : statusLabel === "In Service"
//                 ? "bg-blue-100"
//                 : statusLabel === "Upcoming"
//                 ? "bg-green-100"
//                 : "bg-yellow-100";

//             return (
//               <div
//                 key={_id}
//                 className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
//               >
                
//                 <div className="p-4">
//                   <div className="flex justify-between items-center mb-3">
//                     <div className="flex items-center">
//                       <h2 className="text-lg font-bold text-blue-600">{carName}</h2>
//                       {brand && <span className="ml-2 text-sm text-gray-500">({brand})</span>}
//                     </div>
//                     <div className={`${statusBgColor} ${statusColor} px-3 py-1 rounded-full text-sm font-medium`}>
//                       {statusLabel}
//                     </div>
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-sm text-gray-700">
//                         <span className="font-medium">Booking ID:</span> {bookingId}
//                       </p>
//                       <p className="text-sm text-gray-700">
//                         <span className="font-medium">Duration:</span>{" "}
//                         {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
//                       </p>
//                       <p className="text-sm text-gray-700">
//                         <span className="font-medium">Booked On:</span>{" "}
//                         {new Date(createdAt!).toLocaleDateString()}
//                       </p>
//                       {pickupLocation && (
//                         <p className="text-sm text-gray-700">
//                           <span className="font-medium">Pick Up:</span> {pickupLocation}
//                           <button onClick={()=>setLocationAccess(true)}>view Location</button>
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       {carNumber && (
//                         <p className="text-sm text-gray-700">
//                           <span className="font-medium">Car No:</span> {carNumber}
//                         </p>
//                       )}
//                       <p className="text-sm text-gray-700">
//                         <span className="font-medium">Owner:</span> {ownerName}
//                       </p>
//                       <p className="text-md font-medium text-indigo-700">
//                         <span className="font-medium">Total:</span> ₹{totalPrice}
//                       </p>
                      
  
//                       <div className="flex items-start gap-2 mt-2">
//   {status !== "cancelled" && (
//     <button
//       onClick={() => handleContactOwner(booking.carOwnerId,booking.ownerName)}
//       className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition"
//     >
//       Chat with Owner
//     </button>
//   )}
  
//                          {booking.receiptUrl && (
//     <a
//       href={booking.receiptUrl}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
//     >
//       Download Receipt
//     </a>
//   )}

//   {isAllowedToCancel && (
//     <div className="flex flex-col">
//       <button
//         onClick={() => handleCancelBooking(_id!)}
//         className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
//       >
//         Cancel
//       </button>
//       <p className="text-xs text-gray-600 mt-1">Cancellation cost included</p>
//     </div>
//   )}

//   {showCancelModal && (
//   <div className="modal-overlay">
//     <div className="modal">
//       <h2>Booking Cancelled</h2>
//       <p>Your booking has been cancelled successfully.</p>

//       <button
//         onClick={() => {
//           setShowCancelModal(false);
//           setCancelledBookingId(null);
//         }}
//         className="modal-btn"
//       >
//         OK
//       </button>
//     </div>
//   </div>
// )}

// </div>


//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//           <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={handlePageChange}
//               />
//         </div>
//       ) : (
//         <div className="text-center p-8 bg-white rounded-lg shadow-md">
//           <p className="text-gray-600">You have no bookings yet.</p>
//           <button 
//             onClick={() => router.push('/cars')}
//             className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
//           >
//             Book Your Ride
//           </button>
//         </div>
//       )}


//     </div>

//   );
// };

// export default BookingsPage;


// "use client";

// import React, { useEffect, useState } from "react";
// import { AuthService } from "@/services/customer/authService";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/store/customer/authStore";
// import Pagination from '@/components/pagination';
// import LocationMapView from "@/components/maps/LocationMapView"; // Import your map component

// interface Booking {
//   _id?: string;
//   bookingId?:string;
//   carId: string;
//   userId?: string;
//   startDate: string;
//   endDate: string;
//   totalPrice: number;
//   status: string;
//   createdAt?: string;
//   carName: string;
//   ownerName: string;
//   ownerContact: string;
//   carOwnerId?: string;
//   pickupLocation?: string;
//   pickupCoordinates:[number, number]; // Fixed type definition
//   carNumber?: string;
//   brand?: string;
//   receiptUrl?:string;
// }

// const getBookingStatus = (startDate: string, endDate: string, status: string) => {
//   const now = new Date();
//   const start = new Date(startDate);
//   const end = new Date(endDate);

//   if (status === "cancelled") return "Cancelled";
//   if(status==='pending') return "pending";
//   if (status === "failed") return "Payment Failed";
//   if (end < now) return "Completed";
//   if (start <= now && end >= now) return "Ongoing";
//   if (start > now) return "Upcoming";

//   return status;
// };

// // Function to check if booking can be cancelled (at least one day before start date)
// const canCancelBooking = (startDate: string, status: string) => {
//   if (status !== "confirmed") return false;
//   const now = new Date();
//   const start = new Date(startDate);
  
//   const diffTime = start.getTime() - now.getTime();
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
//   return diffDays >= 1;
// };

// const BookingsPage = () => {
//   const router = useRouter();
//   const { user, accessToken } = useAuthStore();
//   const [loading, setLoading] = useState(true);
//   const [bookingData, setBookingData] = useState<Booking[]>([]);
//   const [error, setError] = useState("");
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalBookings, setTotalBookings] = useState<number>(0);
//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const [showLocationModal, setShowLocationModal] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState<{
//     lat: number;
//     lng: number;
//     address: string;
//   } | null>(null);
//   const [cancelledBookingId, setCancelledBookingId] = useState<string | null>(null);

//   const itemsPerPage = 5;

//   const handleCancelBooking = async (bookingId: string) => {
//     try {
//         console.log("here at start of cancel")
//       await AuthService.cancelBooking(bookingId);
//       toast.success("Booking cancelled successfully");
//       setBookingData((prev) =>
//         prev.map((b) => (b._id === bookingId ? { ...b, status: "cancelled" } : b))
//       );
//       setCancelledBookingId(bookingId);
//       setShowCancelModal(true);
//     } catch (err) {
//       console.error("Cancel error", err);
//       toast.error("Failed to cancel booking");
//     }
//   };

//   const handleViewLocation = (booking: Booking) => {
//     if (booking.pickupCoordinates && booking.pickupCoordinates.length === 2) {
//       setSelectedLocation({
//         lng: booking.pickupCoordinates[0],
//         lat: booking.pickupCoordinates[1],
//         address: booking.pickupLocation || "Pickup Location"
//       });
//       setShowLocationModal(true);
//     } else {
//       toast.error("Location coordinates not available");
//     }
//   };

//   const handleContactOwner = (
//     ownerId: string | undefined,
//     ownerName: string | undefined
//   ) => {
//     toast.success("Connecting you with the owner");

//     if (!ownerId || !ownerName) return;

//     router.push(
//       `/customer/dashboard/chats/${ownerId}/${encodeURIComponent(ownerName)}`
//     );
//   };

//   useEffect(() => {
//     const fetchBookingData = async () => {
//       try {
//         setLoading(true);
//         const data = await AuthService.findCustomerBookingDetails(currentPage, itemsPerPage);
//         console.log('Bookings data:', data);
//         setBookingData(data.bookings || []);
//         setTotalBookings(data.total || 0);
//       } catch (error) {
//         console.error("Error fetching booking");
//         setError("Failed to load booking data. Please try again later.");
//         setBookingData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookingData();
//   }, [currentPage]);
  
//   const totalPages = Math.ceil(totalBookings / itemsPerPage);

//   const handlePageChange = (newPage: number) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
//       </div>
//     );

//   if (error)
//     return <div className="text-red-500 text-center p-8 font-semibold">{error}</div>;

//   if (!user)
//     return <div className="text-center p-8 font-semibold">User not found</div>;

//   return (
//     <div className="bg-gradient-to-b from-blue-200 to-yellow-200 p-4 space-y-4 max-w-5xl mx-auto">
//       <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">My Bookings</h1>

//       {bookingData.length > 0 ? (
//         <div className="grid gap-4">
//           {bookingData.map((booking) => {
//             const {
//               _id,
//               bookingId,
//               carName,
//               brand,
//               startDate,
//               endDate,
//               totalPrice,
//               status,
//               createdAt,
//               ownerName,
//               pickupLocation,
//               pickupCoordinates,
//               carNumber,
//             } = booking;

//             const statusLabel = getBookingStatus(startDate, endDate, status);
//             const isAllowedToCancel = canCancelBooking(startDate, status);

//             const statusColor =
//               statusLabel === "Cancelled"
//                 ? "text-red-600"
//                 : statusLabel === "Completed"
//                 ? "text-gray-600"
//                 : statusLabel === "In Service"
//                 ? "text-blue-600"
//                 : statusLabel === "Upcoming"
//                 ? "text-green-600"
//                 : "text-yellow-600";

//             const statusBgColor =
//               statusLabel === "Cancelled"
//                 ? "bg-red-100"
//                 : statusLabel === "Completed"
//                 ? "bg-gray-100"
//                 : statusLabel === "In Service"
//                 ? "bg-blue-100"
//                 : statusLabel === "Upcoming"
//                 ? "bg-green-100"
//                 : "bg-yellow-100";

//             return (
//               <div
//                 key={_id}
//                 className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
//               >
//                 <div className="p-4">
//                   <div className="flex justify-between items-center mb-3">
//                     <div className="flex items-center">
//                       <h2 className="text-lg font-bold text-blue-600">{carName}</h2>
//                       {brand && <span className="ml-2 text-sm text-gray-500">({brand})</span>}
//                     </div>
//                     <div className={`${statusBgColor} ${statusColor} px-3 py-1 rounded-full text-sm font-medium`}>
//                       {statusLabel}
//                     </div>
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-sm text-gray-700">
//                         <span className="font-medium">Booking ID:</span> {bookingId}
//                       </p>
//                       <p className="text-sm text-gray-700">
//                         <span className="font-medium">Duration:</span>{" "}
//                         {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
//                       </p>
//                       <p className="text-sm text-gray-700">
//                         <span className="font-medium">Booked On:</span>{" "}
//                         {new Date(createdAt!).toLocaleDateString()}
//                       </p>
//                       {pickupLocation && (
//                         <div className="text-sm text-gray-700">
//                           <span className="font-medium">Pick Up:</span> {pickupLocation}
//                           <button 
//                             onClick={() => handleViewLocation(booking)}
//                             className="ml-2 text-blue-600 hover:text-blue-800 underline text-xs"
//                           >
//                             View Location
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                     <div>
//                       {carNumber && (
//                         <p className="text-sm text-gray-700">
//                           <span className="font-medium">Car No:</span> {carNumber}
//                         </p>
//                       )}
//                       <p className="text-sm text-gray-700">
//                         <span className="font-medium">Owner:</span> {ownerName}
//                       </p>
//                       <p className="text-md font-medium text-indigo-700">
//                         <span className="font-medium">Total:</span> ₹{totalPrice}
//                       </p>

//                       <div className="flex items-start gap-2 mt-2">
//                         {status !== "cancelled" && (
//                           <button
//                             onClick={() => handleContactOwner(booking.carOwnerId, booking.ownerName)}
//                             className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition"
//                           >
//                             Chat with Owner
//                           </button>
//                         )}
                        
//                         {booking.receiptUrl && (
//                           <a
//                             href={booking.receiptUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
//                           >
//                             Download Receipt
//                           </a>
//                         )}

//                         {isAllowedToCancel && (
//                           <div className="flex flex-col">
//                             <button
//                               onClick={() => handleCancelBooking(_id!)}
//                               className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
//                             >
//                               Cancel
//                             </button>
//                             <p className="text-xs text-gray-600 mt-1">Cancellation cost included</p>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={handlePageChange}
//           />
//         </div>
//       ) : (
//         <div className="text-center p-8 bg-white rounded-lg shadow-md">
//           <p className="text-gray-600">You have no bookings yet.</p>
//           <button 
//             onClick={() => router.push('/cars')}
//             className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
//           >
//             Book Your Ride
//           </button>
//         </div>
//       )}

//       {/* Location Modal */}
//       {showLocationModal && selectedLocation && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold text-gray-800">Pickup Location</h2>
//                 <button
//                   onClick={() => {
//                     setShowLocationModal(false);
//                     setSelectedLocation(null);
//                   }}
//                   className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
//                 >
//                   ×
//                 </button>
//               </div>
              
//               <p className="text-gray-700 mb-4">{selectedLocation.address}</p>
              
//               <div className="h-96 w-full rounded-lg overflow-hidden border">
//                 {typeof selectedLocation.lat === "number" && 
//                  typeof selectedLocation.lng === "number" && (
//                   <LocationMapView 
//                     lat={selectedLocation.lat} 
//                     lng={selectedLocation.lng} 
//                   />
//                 )}
//               </div>
              
//               <button
//                 onClick={() => {
//                   setShowLocationModal(false);
//                   setSelectedLocation(null);
//                 }}
//                 className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Cancel Modal */}
//       {showCancelModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
//             <h2 className="text-xl font-bold mb-2">Booking Cancelled</h2>
//             <p className="text-gray-700 mb-4">Your booking has been cancelled successfully.</p>
//             <button
//               onClick={() => {
//                 setShowCancelModal(false);
//                 setCancelledBookingId(null);
//               }}
//               className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingsPage;


"use client";

import React, { useEffect, useState, Suspense, lazy } from "react";
import { AuthService } from "@/services/customer/authService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/customer/authStore";
import Pagination from '@/components/pagination';
import BookingCard from '@/components/customer/dashboard/BookingCard';
import BookingSkeleton from '@/components/skeleton/BookingSkeleton';
import ErrorBoundary from '@/components/common/ErrorBoundary';

// Lazy load the details modal for code splitting
const BookingDetailsModal = lazy(() => import('@/components/customer/dashboard/BookingDetailsModal'));

export interface Booking {
  _id?: string;
  bookingId?: string;
  carId: string;
  userId?: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string;
  createdAt?: string;
  carName: string;
  ownerName: string;
  ownerContact: string;
  carOwnerId?: string;
  pickupLocation?: string;
  pickupCoordinates: [number, number];
  carNumber?: string;
  brand?: string;
  receiptUrl?: string;
}

const BookingsPage = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState<Booking[]>([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBookings, setTotalBookings] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        setLoading(true);
        const data = await AuthService.findCustomerBookingDetails(currentPage, itemsPerPage);
        setBookingData(data.bookings || []);
        setTotalBookings(data.total || 0);
        setError("");
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to load bookings. Please try again later.");
        setBookingData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, [currentPage]);

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedBooking(null);
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await AuthService.cancelBooking(bookingId);
      toast.success("Booking cancelled successfully");
      
      // Update local state
      setBookingData((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: "cancelled" } : b))
      );
      
      // Update selected booking if it's the one being cancelled
      if (selectedBooking?._id === bookingId) {
        setSelectedBooking({ ...selectedBooking, status: "cancelled" });
      }
    } catch (err) {
      console.error("Cancel error:", err);
      toast.error("Failed to cancel booking");
      throw err;
    }
  };

  const handleContactOwner = (ownerId: string | undefined, ownerName: string | undefined) => {
    if (!ownerId || !ownerName) {
      toast.error("Owner information not available");
      return;
    }
    router.push(`/customer/dashboard/chats/${ownerId}/${encodeURIComponent(ownerName)}`);
  };

  const totalPages = Math.ceil(totalBookings / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Authentication Required</h2>
          <p className="text-slate-600">Please log in to view your bookings</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-red-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">Error Loading Bookings</h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
     <div className="bg-gradient-to-b from-blue-200 to-yellow-200  p-10 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 shadow-xl mb-6">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
              My Bookings
            </h1>
            <p className="text-white">Manage and track all your car rentals</p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <BookingSkeleton key={i} />
              ))}
            </div>
          ) : bookingData.length > 0 ? (
            <>
              {/* Bookings List */}
              <div className="space-y-4 mb-8">
                {bookingData.map((booking) => (
                  <BookingCard
                    key={booking._id}
                    booking={booking}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <div className="text-8xl mb-6">🚗</div>
              <h2 className="text-3xl font-bold text-slate-800 mb-3">No Bookings Yet</h2>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                Start your journey by booking your first car rental
              </p>
              <button
                onClick={() => router.push('/cars')}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg font-semibold"
              >
                Browse Available Cars
              </button>
            </div>
          )}

          {/* Details Modal - Lazy Loaded */}
          {showDetailsModal && selectedBooking && (
            <Suspense fallback={<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
            </div>}>
              <BookingDetailsModal
                booking={selectedBooking}
                onClose={handleCloseModal}
                onCancel={handleCancelBooking}
                onContactOwner={handleContactOwner}
              />
            </Suspense>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default BookingsPage;