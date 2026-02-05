
// "use client"
// import { useState, useEffect } from 'react';
// import { format } from 'date-fns';
// import { OwnerAuthService } from '@/services/carOwner/authService';
// import Pagination from '@/components/pagination';
// import toast from 'react-hot-toast';
// import { useRouter } from "next/navigation";


// interface User {
//   _id: string;
//   fullName: string;
// }

// interface Car {
//   _id: string;
//   carName: string;
//   make?: string;
//   model?: string;
//   year?: number;
//   rcBookNo?: string;
// }

// interface Booking {
//   _id: string;
//   carId: Car;
//   userId: User;
//   startDate: string;
//   endDate: string;
//   status: string;
//   totalPrice: number;
//   bookingId:string
//   receiptKey?:string;
// }

// export default function CarOwnerDashboard() {
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//    const [currentPage, setCurrentPage] = useState<number>(1);
//     const [totalBookings, setTotalBookings] = useState<number>(0);
//     const itemsPerPage = 5;
//       const router = useRouter();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);


//         const response = await OwnerAuthService.getBookingList(currentPage,itemsPerPage);
//         console.log("from backend", response.bookings,response.total);
        
//         if (response.bookings) {
//           setBookings(response.bookings);
//           setTotalBookings(response.total||0)
//         } else {
//           setError('No booking data found');
//         }
        
//         setIsLoading(false);
//       } catch (err) {
//         console.error("Error fetching bookings:", err);
//         setError('Failed to fetch data. Please try again later.');
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [currentPage]);

//   const totalPages=Math.ceil(totalBookings/itemsPerPage);
//   const handlePageChange = (newPage: number) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const handleDownloadReceipt = async (bookingId: string) => {
//   try {
//     console.log("booking,,,,",bookingId)
//     const res = await OwnerAuthService.getReceiptUrl(bookingId);
//      const url = res.url;
//     console.log("url...",url)
//     window.open(url, "_blank");
//   } catch (error) {
//     toast.error("Unable to download receipt");
//   }
// };

// const handleContactCustomer = (bookingId: string|undefined) => {
//     toast.success(`Connecting you with the customer`);
//     if(bookingId){
//      router.push(`/carOwner/dashboard/chats/${bookingId}`);}
//   };

//   const canCancelBooking = (startDate: string, status: string) => {
//   if (status !== "confirmed") return false;
//   const now = new Date();
//   const start = new Date(startDate);
  
//   const diffTime = start.getTime() - now.getTime();
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
//   return diffDays >= 1;
// };


// const handleCancelBooking = async (bookingId: string) => {
//     try {
//         console.log("here at start of cancel")
//       await OwnerAuthService.cancelBooking(bookingId);
//       toast.success("Booking cancelled successfully");
//       setBookings((prev) =>
//         prev.map((b) => (b._id === bookingId ? { ...b, status: "cancelled" } : b))
//       );
//     } catch (err) {
//       console.error("Cancel error", err);
//       toast.error("Failed to cancel booking");
//     }
//   };

//   const getBookingTimeStatus = (booking: Booking): 'upcoming' | 'ongoing' | 'past' => {
//     const now = new Date();
//     const startDate = new Date(booking.startDate);
//     const endDate = new Date(booking.endDate);
    
//     if (now < startDate) {
//       return 'upcoming';
//     } else if (now >= startDate && now <= endDate) {
//       return 'ongoing';
//     } else {
//       return 'past';
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-gray-700">Loading bookings...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="bg-red-100 p-6 rounded-lg">
//           <h2 className="text-red-800 text-lg font-medium">Error</h2>
//           <p className="text-red-700">{error}</p>
//           <button 
//             className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//             onClick={() => window.location.reload()}
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">My Car Bookings</h1>
      
//       <div className="grid grid-cols-1 gap-8 mb-8">
        
//         <div className="flex flex-wrap gap-2">
//           <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded">
//             <span className="w-3 h-3 mr-2 rounded-full bg-green-500"></span>
//             Ongoing
//           </span>
//           <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded">
//             <span className="w-3 h-3 mr-2 rounded-full bg-blue-500"></span>
//             Upcoming
//           </span>
//           <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded">
//             <span className="w-3 h-3 mr-2 rounded-full bg-gray-500"></span>
//             Past
//           </span>
//           <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded">
//             <span className="w-3 h-3 mr-2 rounded-full bg-red-500"></span>
//             Cancelled
//           </span>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {bookings.map(booking => {
//             const timeStatus = getBookingTimeStatus(booking);
//             const isAllowedToCancel = canCancelBooking(booking.startDate, status);
         
//             let statusColors = '';
//             let statusText = '';
            
//             if (booking.status.toLowerCase() === 'cancelled') {
//               statusColors = 'border-red-200 bg-red-50';
//               statusText = 'Cancelled';
//             } else if (timeStatus === 'ongoing') {
//               statusColors = 'border-green-200 bg-green-50';
//               statusText = 'Ongoing';
//             } else if (timeStatus === 'upcoming') {
//               statusColors = 'border-blue-200 bg-blue-50';
//               statusText = 'Upcoming';
//             } else {
//               statusColors = 'border-gray-200 bg-gray-50';
//               statusText = 'Past';
//             }
            
//             return (
//               <div 
//                 key={booking._id} 
//                 className={`border-2 rounded-lg overflow-hidden shadow-md ${statusColors}`}
//               >
//                 <div className="p-5">

//                     <div className="mb-3">
//                     <p className="font-bold  text-fuchsia-800">{booking.bookingId}</p>
//                   </div>
              
//                   <div className="flex justify-between items-start mb-3">
//                     <div>
//                       <h3 className="font-semibold text-lg">
//                         {booking.carId.carName || 'Unknown Car'}
//                       </h3>
//                       {/* <p className="text-gray-600 text-sm">
//                         ID: {booking.carId._id}
//                       </p> */}
//                     </div>
                    
                
//                     <span className={`px-2 py-1 text-sm rounded font-medium 
//                       ${booking.status.toLowerCase() === 'cancelled' ? 'bg-red-500 text-white' : 
//                         timeStatus === 'ongoing' ? 'bg-green-500 text-white' : 
//                         timeStatus === 'upcoming' ? 'bg-blue-500 text-white' : 
//                         'bg-gray-500 text-white'}`}>
//                       {statusText}
//                     </span>
//                   </div>
                  
                
            
//                   <div className="mb-3">
//                     <p className="font-semibold">{booking.userId.fullName}</p>
//                     {/* <p className="text-gray-600 text-sm">ID: {booking.userId._id}</p> */}
//                   </div>
                  
         
//                   <div className="mb-3">
//                     <p className="font-medium text-green-600">₹{booking.totalPrice}</p>
//                   </div>
                  
           
//                   <div className="border-t border-gray-200 pt-3">
//                     <div className="flex justify-between text-sm">
//                       <div>
//                         <p className="text-gray-500">From</p>
//                         <p className="font-medium">
//                           {format(new Date(booking.startDate), 'MMM d, yyyy')}
//                         </p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-gray-500">To</p>
//                         <p className="font-medium">
//                           {format(new Date(booking.endDate), 'MMM d, yyyy')}
//                         </p>
//                       </div>
//                      <button
//   onClick={() => handleDownloadReceipt(booking._id)}
//   className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
// >
//   Download Receipt
// </button>


//                     </div>
//                   </div>
                  
                  
//                   {booking.status.toLowerCase() !== 'cancelled'&& (
//                   <div className="mt-4 flex gap-2">
//                     <button   onClick={() => handleContactCustomer(booking.bookingId)} className="bg-blue-200 hover:bg-blue-400 text-gray-800 px-3 py-1 rounded text-sm flex-1">
                      
//                       Chat with Customer
//                     </button>
                    
                    
//                       {/* <button className="bg-white border border-red-500 hover:bg-red-50 text-red-500 px-3 py-1 rounded text-sm flex-1">
//                         Cancel
//                      </button>
//                     */}
                    
//                   </div>
//                    )}
//                    {isAllowedToCancel && (
//     <div className="flex flex-col">
//       <button
//         onClick={() => handleCancelBooking(booking._id!)}
//         className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
//       >
//         Cancel
//       </button>
//       <p className="text-xs text-gray-600 mt-1">Cancellation cost included</p>
//     </div>
//   )}
//                 </div>
//               </div>
//             );
//           })}
          
//         </div>
//          <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={handlePageChange}
//               />
//       </div>
      
//       {bookings.length === 0 && (
//         <div className="text-center py-12 bg-gray-50 rounded-lg">
//           <p className="text-gray-500">You don't have any bookings yet.</p>
//         </div>
//       )}
//     </div>
//   );
// }


// "use client"
// import { useState, useEffect } from 'react';
// import { OwnerAuthService } from '@/services/carOwner/authService';
// import Pagination from '@/components/pagination';
// import toast from 'react-hot-toast';
// import { useRouter } from "next/navigation";

// interface User {
//   _id: string;
//   fullName: string;
// }

// interface Car {
//   _id: string;
//   carName: string;
//   make?: string;
//   model?: string;
//   year?: number;
//   rcBookNo?: string;
// }

// interface Booking {
//   _id: string;
//   carId: Car;
//   userId: User;
//   startDate: string;
//   endDate: string;
//   status: string;
//   totalPrice: number;
//   bookingId: string;
//   receiptKey?: string;
// }

// const formatDate = (dateString: string) => {
//   const date = new Date(dateString);
//   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//   return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
// };

// export default function CarOwnerDashboard() {
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalBookings, setTotalBookings] = useState<number>(0);
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [statusFilter, setStatusFilter] = useState<string>('all');
//   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
//   const itemsPerPage = 10;
//   const router = useRouter();

//   // Debounce search term
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearchTerm(searchTerm);
//       setCurrentPage(1);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);

//         // Call backend API with search params
//         const response = await OwnerAuthService.getBookingList(
//           currentPage,
//           itemsPerPage,
//           // debouncedSearchTerm,
//           // statusFilter === 'all' ? '' : statusFilter
//         );
        
//         if (response.bookings) {
//           setBookings(response.bookings);
//           setTotalBookings(response.total || 0);
//         } else {
//           setError('No booking data found');
//         }
        
//         setIsLoading(false);
//       } catch (err) {
//         console.error("Error fetching bookings:", err);
//         setError('Failed to fetch data. Please try again later.');
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [currentPage, debouncedSearchTerm, statusFilter]);

//   const totalPages = Math.ceil(totalBookings / itemsPerPage);

//   const handlePageChange = (newPage: number) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const handleDownloadReceipt = async (bookingId: string) => {
//     try {
//       const res = await OwnerAuthService.getReceiptUrl(bookingId);
//       const url = res.url;
//       window.open(url, "_blank");
//     } catch (error) {
//       toast.error("Unable to download receipt");
//     }
//   };

//   const handleContactCustomer = (bookingId: string | undefined) => {
//     toast.success(`Connecting you with the customer`);
//     if (bookingId) {
//       router.push(`/carOwner/dashboard/chats/${bookingId}`);
//     }
//   };

//   const canCancelBooking = (startDate: string, status: string) => {
//     if (status !== "confirmed") return false;
//     const now = new Date();
//     const start = new Date(startDate);
//     const diffTime = start.getTime() - now.getTime();
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays >= 1;
//   };

//   const handleCancelBooking = async (bookingId: string) => {
//     try {
//       await OwnerAuthService.cancelBooking(bookingId);
//       toast.success("Booking cancelled successfully");
//       setBookings((prev) =>
//         prev.map((b) => (b._id === bookingId ? { ...b, status: "cancelled" } : b))
//       );
//     } catch (err) {
//       console.error("Cancel error", err);
//       toast.error("Failed to cancel booking");
//     }
//   };

//   const getBookingTimeStatus = (booking: Booking): 'upcoming' | 'ongoing'|'completed' => {
//     const now = new Date();
//     const startDate = new Date(booking.startDate);
//     const endDate = new Date(booking.endDate);
    
//     if (now < startDate) {
//       return 'upcoming';
//     } else if (now >= startDate && now <= endDate) {
//       return 'ongoing';
//     } else {
//       return 'completed';
//     }
//   };

//   const getStatusBadge = (booking: Booking) => {
//     const timeStatus = getBookingTimeStatus(booking);
    
//     if (booking.status.toLowerCase() === 'cancelled') {
//       return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Cancelled</span>;
//     } else if (timeStatus === 'ongoing') {
//       return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Ongoing</span>;
//     } else if (timeStatus === 'upcoming') {
//       return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Upcoming</span>;
//     } else {
//       return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Completed</span>;
//     }
//   };

//   const handleClearFilters = () => {
//     setSearchTerm('');
//     setStatusFilter('all');
//     setCurrentPage(1);
//   };

//   if (isLoading && bookings.length === 0) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-gray-700">Loading bookings...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="bg-red-100 p-6 rounded-lg">
//           <h2 className="text-red-800 text-lg font-medium">Error</h2>
//           <p className="text-red-700">{error}</p>
//           <button 
//             className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//             onClick={() => window.location.reload()}
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">My Car Bookings</h1>
//           <p className="text-gray-600">Manage and track all your car rental bookings</p>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Search Bookings
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search by booking ID, car name, or customer name..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <svg
//                   className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                   />
//                 </svg>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Filter by Status
//               </label>
//               <select
//                 value={statusFilter}
//                 onChange={(e) => {
//                   setStatusFilter(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="all">All Bookings</option>
//                 <option value="confirmed">Confirmed</option>
//                 <option value="cancelled">Cancelled</option>
//                 <option value="completed">Completed</option>
//               </select>
//             </div>
//           </div>

//           {(searchTerm || statusFilter !== 'all') && (
//             <div className="mt-4 flex items-center gap-3">
//               <span className="text-sm text-gray-600">Active filters:</span>
//               {searchTerm && (
//                 <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
//                   Search: "{searchTerm}"
//                   <button
//                     onClick={() => setSearchTerm('')}
//                     className="ml-2 hover:text-blue-900"
//                   >
//                     ×
//                   </button>
//                 </span>
//               )}
//               {statusFilter !== 'all' && (
//                 <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
//                   Status: {statusFilter}
//                   <button
//                     onClick={() => setStatusFilter('all')}
//                     className="ml-2 hover:text-blue-900"
//                   >
//                     ×
//                   </button>
//                 </span>
//               )}
//               <button
//                 onClick={handleClearFilters}
//                 className="text-sm text-blue-600 hover:text-blue-800 font-medium"
//               >
//                 Clear all
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="mb-4 flex items-center justify-between">
//           <p className="text-sm text-gray-600">
//             Showing {bookings.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
//             {Math.min(currentPage * itemsPerPage, totalBookings)} of {totalBookings} bookings
//           </p>
//           {isLoading && (
//             <span className="text-sm text-gray-500 flex items-center gap-2">
//               <div className="w-4 h-4 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
//               Updating...
//             </span>
//           )}
//         </div>

//         <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//           {bookings.length === 0 ? (
//             <div className="text-center py-16">
//               <svg
//                 className="mx-auto h-12 w-12 text-gray-400"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                 />
//               </svg>
//               <h3 className="mt-4 text-lg font-medium text-gray-900">No bookings found</h3>
//               <p className="mt-2 text-sm text-gray-500">
//                 {searchTerm || statusFilter !== 'all'
//                   ? 'Try adjusting your search or filters'
//                   : "You don't have any bookings yet"}
//               </p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Booking ID
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Car & Customer
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Duration
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Price
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {bookings.map((booking) => {
//                     const isAllowedToCancel = canCancelBooking(booking.startDate, booking.status);

//                     return (
//                       <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900">
//                             {booking.bookingId}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div>
//                             <div className="text-sm font-medium text-gray-900">
//                               {booking.carId.carName || 'Unknown Car'}
//                             </div>
//                             <div className="text-sm text-gray-500">
//                               {booking.userId.fullName}
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">
//                             {formatDate(booking.startDate)}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             to {formatDate(booking.endDate)}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-semibold text-green-600">
//                             ₹{booking.totalPrice.toLocaleString()}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {getStatusBadge(booking)}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <div className="flex items-center justify-end gap-2">
//                             <button
//                               onClick={() => handleDownloadReceipt(booking._id)}
//                               className="text-green-600 hover:text-green-900"
//                               title="Download Receipt"
//                             >
//                               <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                               </svg>
//                             </button>
//                             {booking.status.toLowerCase() !== 'cancelled' && (
//                               <button
//                                 onClick={() => handleContactCustomer(booking.bookingId)}
//                                 className="text-blue-600 hover:text-blue-900"
//                                 title="Chat with Customer"
//                               >
//                                 <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                                 </svg>
//                               </button>
//                             )}
//                             {isAllowedToCancel && (
//                               <button
//                                 onClick={() => handleCancelBooking(booking._id)}
//                                 className="text-red-600 hover:text-red-900"
//                                 title="Cancel Booking"
//                               >
//                                 <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                 </svg>
//                               </button>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {totalPages > 1 && (
//           <div className="mt-6">
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={handlePageChange}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



"use client"
import { useState, useEffect } from 'react';
import { OwnerAuthService } from '@/services/carOwner/authService';
import Pagination from '@/components/pagination';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import LoadingButton from '@/components/common/LoadingButton';

interface User {
  _id: string;
  fullName: string;
}

interface Car {
  _id: string;
  carName: string;
  make?: string;
  model?: string;
  year?: number;
  rcBookNo?: string;
}

interface Booking {
  _id: string;
  carId: Car;
  userId: User;
  startDate: string;
  endDate: string;
  status: string;
  totalPrice: number;
  bookingId: string;
  receiptKey?: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export default function CarOwnerDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const itemsPerPage = 10;
  const router = useRouter();

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Call backend API with search params
        const response = await OwnerAuthService.getBookingList(
          currentPage,
          itemsPerPage,
          // debouncedSearchTerm,
          // statusFilter === 'all' ? '' : statusFilter
        );
        
        if (response.bookings) {
          setBookings(response.bookings);
          setTotalBookings(response.total || 0);
        } else {
          setError('No booking data found');
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError('Failed to fetch data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, debouncedSearchTerm, statusFilter]);

  const totalPages = Math.ceil(totalBookings / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDownloadReceipt = async (bookingId: string) => {
    try {
      const res = await OwnerAuthService.getReceiptUrl(bookingId);
      const url = res.url;
      window.open(url, "_blank");
    } catch (error) {
      toast.error("Unable to download receipt");
    }
  };

  const handleContactCustomer = (bookingId: string | undefined) => {
    toast.success(`Connecting you with the customer`);
    if (bookingId) {
      router.push(`/carOwner/dashboard/chats/${bookingId}`);
    }
  };

  const canCancelBooking = (startDate: string, status: string) => {
    if (status !== "confirmed") return false;
    const now = new Date();
    const start = new Date(startDate);
    const diffTime = start.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 1;
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await OwnerAuthService.cancelBooking(bookingId);
      toast.success("Booking cancelled successfully");
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: "cancelled" } : b))
      );
    } catch (err) {
      console.error("Cancel error", err);
      toast.error("Failed to cancel booking");
    }
  };

  const getBookingTimeStatus = (booking: Booking): 'upcoming' | 'ongoing'|'completed' => {
    const now = new Date();
    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);
    
    if (now < startDate) {
      return 'upcoming';
    } else if (now >= startDate && now <= endDate) {
      return 'ongoing';
    } else {
      return 'completed';
    }
  };

  const getStatusBadge = (booking: Booking) => {
    const timeStatus = getBookingTimeStatus(booking);
    
    if (booking.status.toLowerCase() === 'cancelled') {
      return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Cancelled</span>;
    } else if (timeStatus === 'ongoing') {
      return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Ongoing</span>;
    } else if (timeStatus === 'upcoming') {
      return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Upcoming</span>;
    } else {
      return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Completed</span>;
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  if (isLoading && bookings.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-blue-600 border-solid rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-yellow-50">
        <div className="bg-white border-2 border-red-200 p-8 rounded-xl shadow-lg">
          <h2 className="text-red-800 text-lg font-bold">Error</h2>
          <p className="text-red-700 mt-2">{error}</p>
          <LoadingButton
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </LoadingButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-yellow-600 bg-clip-text text-transparent mb-2">
            My Car Bookings
          </h1>
          <p className="text-gray-600">Manage and track all your car rental bookings</p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-blue-100 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Bookings
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by booking ID, car name, or customer name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                <svg
                  className="absolute left-3 top-3 h-5 w-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2.5 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="all">All Bookings</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {(searchTerm || statusFilter !== 'all') && (
            <div className="mt-4 flex items-center gap-3 flex-wrap">
              <span className="text-sm text-gray-600 font-medium">Active filters:</span>
              {searchTerm && (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-blue-100 text-blue-800 font-medium">
                  Search: "{searchTerm}"
                  <LoadingButton
                    onClick={() => setSearchTerm('')}
                    className="ml-2 hover:text-blue-900 text-lg"
                  >
                    ×
                  </LoadingButton>
                </span>
              )}
              {statusFilter !== 'all' && (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-yellow-100 text-yellow-800 font-medium">
                  Status: {statusFilter}
                  <LoadingButton
                    onClick={() => setStatusFilter('all')}
                    className="ml-2 hover:text-yellow-900 text-lg"
                  >
                    ×
                  </LoadingButton>
                </span>
              )}
              <LoadingButton
                onClick={handleClearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
              >
                Clear all
              </LoadingButton>
            </div>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600 font-medium">
            Showing {bookings.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
            {Math.min(currentPage * itemsPerPage, totalBookings)} of {totalBookings} bookings
          </p>
          {isLoading && (
            <span className="text-sm text-blue-600 flex items-center gap-2 font-medium">
              <div className="w-4 h-4 border-t-2 border-blue-600 border-solid rounded-full animate-spin"></div>
              Updating...
            </span>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md border border-blue-100 overflow-hidden">
          {bookings.length === 0 ? (
            <div className="text-center py-16">
              <svg
                className="mx-auto h-16 w-16 text-blue-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-4 text-lg font-bold text-gray-900">No bookings found</h3>
              <p className="mt-2 text-sm text-gray-500">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : "You don't have any bookings yet"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-blue-100">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Booking ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Car & Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-50">
                  {bookings.map((booking, index) => {
                    const isAllowedToCancel = canCancelBooking(booking.startDate, booking.status);

                    return (
                      <tr 
                        key={booking._id} 
                        className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-yellow-50 transition-all ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-blue-700">
                            {booking.bookingId}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-bold text-gray-900">
                              {booking.carId.carName || 'Unknown Car'}
                            </div>
                            <div className="text-sm text-gray-600 font-medium">
                              {booking.userId.fullName}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            {formatDate(booking.startDate)}
                          </div>
                          <div className="text-sm text-gray-600">
                            to {formatDate(booking.endDate)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-yellow-600">
                            ₹{booking.totalPrice.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(booking)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center gap-2">
                            <LoadingButton
                              onClick={() => handleDownloadReceipt(booking._id)}
                              className="inline-flex items-center px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
                              title="Download Receipt"
                            >
                              <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Receipt
                            </LoadingButton>
                            {booking.status.toLowerCase() !== 'cancelled' && (
                              <LoadingButton
                                onClick={() => handleContactCustomer(booking.bookingId)}
                                className="inline-flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
                                title="Chat with Customer"
                              >
                                <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Chat
                              </LoadingButton>
                            )}
                            {isAllowedToCancel && (
                              <LoadingButton
                                onClick={() => handleCancelBooking(booking._id)}
                                className="inline-flex items-center px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
                                title="Cancel Booking"
                              >
                                <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Cancel
                              </LoadingButton>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}