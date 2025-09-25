
"use client";

import React, { useEffect, useState } from "react";
import { AuthService } from "@/services/customer/authService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/customer/authStore";
import Pagination from '@/components/pagination';

interface Booking {
  _id?: string;
  bookingId?:string;
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
  carNumber?: string;
  brand?: string;
}

const getBookingStatus = (startDate: string, endDate: string, status: string) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (status === "cancelled") return "Cancelled";
  if(status==='pending') return "pending";
 if (status === "failed") return "Payment Failed";
  if (end < now) return "Completed";
  if (start <= now && end >= now) return "Ongoing";
  if (start > now) return "Upcoming";

  return status;
};

// Function to check if booking can be cancelled (at least one day before start date)
const canCancelBooking = (startDate: string, status: string) => {
  if (status !== "confirmed") return false;
  const now = new Date();
  const start = new Date(startDate);
  
  const diffTime = start.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays >= 1;
};

const BookingsPage = () => {
  const router = useRouter();
  const { user, accessToken } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState<Booking[]>([]);
  const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const itemsPerPage = 5;

  const handleCancelBooking = async (bookingId: string) => {
    try {
        console.log("here at start of cancel")
      await AuthService.cancelBooking(bookingId);
      toast.success("Booking cancelled successfully");
      setBookingData((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: "cancelled" } : b))
      );
    } catch (err) {
      console.error("Cancel error", err);
      toast.error("Failed to cancel booking");
    }
  };

  const handleContactOwner = (bookingId: string|undefined) => {
    toast.success(`Connecting you with the owner`);
    if(bookingId){
     router.push(`/bookings/${bookingId}/chat`);}
  };

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        setLoading(true);
        
    
     
        const data = await AuthService.findCustomerBookingDetails(currentPage, itemsPerPage);
        console.log('Bookings data:', data);
        setBookingData(data.bookings || []);
        setTotalBookings(data.total || 0);
      } catch (error) {
        console.error("Error fetching booking");
        setError("Failed to load booking data. Please try again later.");
        setBookingData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, [currentPage]);
    const totalPages = Math.ceil(totalBookings / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };


  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );

  if (error)
    return <div className="text-red-500 text-center p-8 font-semibold">{error}</div>;

  if (!user)
    return <div className="text-center p-8 font-semibold">User not found</div>;

  return (
    <div className=" bg-gradient-to-b from-blue-200 to-yellow-200  p-4 space-y-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">My Bookings</h1>

      {bookingData.length > 0 ? (
        <div className="grid gap-4">
          {bookingData.map((booking) => {
            const {
              _id,
              bookingId,
              carName,
              brand,
              startDate,
              endDate,
              totalPrice,
              status,
              createdAt,
              ownerName,
              pickupLocation,
              carNumber,
            } = booking;

            const statusLabel = getBookingStatus(startDate, endDate, status);
            const isAllowedToCancel = canCancelBooking(startDate, status);

            
            const statusColor =
              statusLabel === "Cancelled"
                ? "text-red-600"
                : statusLabel === "Completed"
                ? "text-gray-600"
                : statusLabel === "In Service"
                ? "text-blue-600"
                : statusLabel === "Upcoming"
                ? "text-green-600"
                : "text-yellow-600";

            
            const statusBgColor =
              statusLabel === "Cancelled"
                ? "bg-red-100"
                : statusLabel === "Completed"
                ? "bg-gray-100"
                : statusLabel === "In Service"
                ? "bg-blue-100"
                : statusLabel === "Upcoming"
                ? "bg-green-100"
                : "bg-yellow-100";

            return (
              <div
                key={_id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
              >
                
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <h2 className="text-lg font-bold text-blue-600">{carName}</h2>
                      {brand && <span className="ml-2 text-sm text-gray-500">({brand})</span>}
                    </div>
                    <div className={`${statusBgColor} ${statusColor} px-3 py-1 rounded-full text-sm font-medium`}>
                      {statusLabel}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Booking ID:</span> {bookingId}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Duration:</span>{" "}
                        {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Booked On:</span>{" "}
                        {new Date(createdAt!).toLocaleDateString()}
                      </p>
                      {pickupLocation && (
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Pick Up:</span> {pickupLocation}
                        </p>
                      )}
                    </div>
                    <div>
                      {carNumber && (
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Car No:</span> {carNumber}
                        </p>
                      )}
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Owner:</span> {ownerName}
                      </p>
                      <p className="text-md font-medium text-indigo-700">
                        <span className="font-medium">Total:</span> ₹{totalPrice}
                      </p>
                      
  
                      <div className="flex items-start gap-2 mt-2">
  {status !== "cancelled" && (
    <button
      onClick={() => handleContactOwner(booking.bookingId)}
      className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition"
    >
      Chat with Owner
    </button>
  )}

  {isAllowedToCancel && (
    <div className="flex flex-col">
      <button
        onClick={() => handleCancelBooking(_id!)}
        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
      >
        Cancel
      </button>
      <p className="text-xs text-gray-600 mt-1">Cancellation cost included</p>
    </div>
  )}
</div>


                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
        </div>
      ) : (
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">You have no bookings yet.</p>
          <button 
            onClick={() => router.push('/cars')}
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
          >
            Book Your Ride
          </button>
        </div>
      )}


    </div>

  );
};

export default BookingsPage;