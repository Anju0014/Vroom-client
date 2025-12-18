
"use client"
// pages/dashboard.tsx
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { OwnerAuthService } from '@/services/carOwner/authService';
import Pagination from '@/components/pagination';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";


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
  bookingId:string
  receiptKey?:string;
}

export default function CarOwnerDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
   const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalBookings, setTotalBookings] = useState<number>(0);
    const itemsPerPage = 5;
      const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);


        const response = await OwnerAuthService.getBookingList(currentPage,itemsPerPage);
        console.log("from backend", response.bookings,response.total);
        
        if (response.bookings) {
          setBookings(response.bookings);
          setTotalBookings(response.total||0)
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
  }, [currentPage]);

  const totalPages=Math.ceil(totalBookings/itemsPerPage);
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDownloadReceipt = async (bookingId: string) => {
  try {
    console.log("booking,,,,",bookingId)
    const res = await OwnerAuthService.getReceiptUrl(bookingId);
     const url = res.url;
    console.log("url...",url)
    window.open(url, "_blank");
  } catch (error) {
    toast.error("Unable to download receipt");
  }
};

const handleContactCustomer = (bookingId: string|undefined) => {
    toast.success(`Connecting you with the customer`);
    if(bookingId){
     router.push(`/carOwner/dashboard/chats/${bookingId}`);}
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
        console.log("here at start of cancel")
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

  const getBookingTimeStatus = (booking: Booking): 'upcoming' | 'ongoing' | 'past' => {
    const now = new Date();
    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);
    
    if (now < startDate) {
      return 'upcoming';
    } else if (now >= startDate && now <= endDate) {
      return 'ongoing';
    } else {
      return 'past';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 p-6 rounded-lg">
          <h2 className="text-red-800 text-lg font-medium">Error</h2>
          <p className="text-red-700">{error}</p>
          <button 
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Car Bookings</h1>
      
      <div className="grid grid-cols-1 gap-8 mb-8">
        
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded">
            <span className="w-3 h-3 mr-2 rounded-full bg-green-500"></span>
            Ongoing
          </span>
          <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded">
            <span className="w-3 h-3 mr-2 rounded-full bg-blue-500"></span>
            Upcoming
          </span>
          <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded">
            <span className="w-3 h-3 mr-2 rounded-full bg-gray-500"></span>
            Past
          </span>
          <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded">
            <span className="w-3 h-3 mr-2 rounded-full bg-red-500"></span>
            Cancelled
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map(booking => {
            const timeStatus = getBookingTimeStatus(booking);
            const isAllowedToCancel = canCancelBooking(booking.startDate, status);
         
            let statusColors = '';
            let statusText = '';
            
            if (booking.status.toLowerCase() === 'cancelled') {
              statusColors = 'border-red-200 bg-red-50';
              statusText = 'Cancelled';
            } else if (timeStatus === 'ongoing') {
              statusColors = 'border-green-200 bg-green-50';
              statusText = 'Ongoing';
            } else if (timeStatus === 'upcoming') {
              statusColors = 'border-blue-200 bg-blue-50';
              statusText = 'Upcoming';
            } else {
              statusColors = 'border-gray-200 bg-gray-50';
              statusText = 'Past';
            }
            
            return (
              <div 
                key={booking._id} 
                className={`border-2 rounded-lg overflow-hidden shadow-md ${statusColors}`}
              >
                <div className="p-5">

                    <div className="mb-3">
                    <p className="font-bold  text-fuchsia-800">{booking.bookingId}</p>
                  </div>
              
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {booking.carId.carName || 'Unknown Car'}
                      </h3>
                      {/* <p className="text-gray-600 text-sm">
                        ID: {booking.carId._id}
                      </p> */}
                    </div>
                    
                
                    <span className={`px-2 py-1 text-sm rounded font-medium 
                      ${booking.status.toLowerCase() === 'cancelled' ? 'bg-red-500 text-white' : 
                        timeStatus === 'ongoing' ? 'bg-green-500 text-white' : 
                        timeStatus === 'upcoming' ? 'bg-blue-500 text-white' : 
                        'bg-gray-500 text-white'}`}>
                      {statusText}
                    </span>
                  </div>
                  
                
            
                  <div className="mb-3">
                    <p className="font-semibold">{booking.userId.fullName}</p>
                    {/* <p className="text-gray-600 text-sm">ID: {booking.userId._id}</p> */}
                  </div>
                  
         
                  <div className="mb-3">
                    <p className="font-medium text-green-600">₹{booking.totalPrice}</p>
                  </div>
                  
           
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="text-gray-500">From</p>
                        <p className="font-medium">
                          {format(new Date(booking.startDate), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-500">To</p>
                        <p className="font-medium">
                          {format(new Date(booking.endDate), 'MMM d, yyyy')}
                        </p>
                      </div>
                     <button
  onClick={() => handleDownloadReceipt(booking._id)}
  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
>
  Download Receipt
</button>


                    </div>
                  </div>
                  
                  
                  {booking.status.toLowerCase() !== 'cancelled'&& (
                  <div className="mt-4 flex gap-2">
                    <button   onClick={() => handleContactCustomer(booking.bookingId)} className="bg-blue-200 hover:bg-blue-400 text-gray-800 px-3 py-1 rounded text-sm flex-1">
                      
                      Chat with Customer
                    </button>
                    
                    
                      {/* <button className="bg-white border border-red-500 hover:bg-red-50 text-red-500 px-3 py-1 rounded text-sm flex-1">
                        Cancel
                     </button>
                    */}
                    
                  </div>
                   )}
                   {isAllowedToCancel && (
    <div className="flex flex-col">
      <button
        onClick={() => handleCancelBooking(booking._id!)}
        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
      >
        Cancel
      </button>
      <p className="text-xs text-gray-600 mt-1">Cancellation cost included</p>
    </div>
  )}
                </div>
              </div>
            );
          })}
          
        </div>
         <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
      </div>
      
      {bookings.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">You don't have any bookings yet.</p>
        </div>
      )}
    </div>
  );
}