'use client';

import React, { useEffect, useState } from "react";
import { SimpleTable, TableColumn } from "@/components/admin/UserTable"; // Update import path
import { AdminAuthService } from "@/services/admin/adminService";
import BookingDetailsModal from "@/components/admin/BookingDetailsModal";
import { format } from "date-fns";
import { IBooking } from "@/types/bookTypes";

const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBookings, setFilteredBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const bookingsData = await AdminAuthService.getAllBookings();
        console.log("Bookings from backend", bookingsData);
        
        if (bookingsData && bookingsData.length > 0) {
       
          const transformedBookings = bookingsData.map((booking: IBooking) => ({
            ...booking, 
            bookingIdDisplay: booking.bookingId,
            carNameDisplay: booking.carId?.carName || 'N/A',
            customerDisplay: booking.userId?.fullName || 'N/A',
            ownerDisplay: booking.carOwnerId?.fullName || 'N/A',
            amountDisplay: `₹${booking.totalPrice}`,
            statusDisplay: getStatusBadgeText(booking.status, booking.startDate, booking.endDate),
            
          }));
          
          setBookings(transformedBookings);
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
  }, []);

  // Filter bookings based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter(booking =>
        booking.bookingIdDisplay?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.carNameDisplay?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.customerDisplay?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.ownerDisplay?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.statusDisplay?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBookings(filtered);
    }
  }, [bookings, searchTerm]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return "Invalid date";
    }
  };

  const getBookingTimeStatus = (startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) {
      return 'upcoming';
    } else if (now > end) {
      return 'completed';
    } else {
      return 'ongoing';
    }
  };

  const getStatusBadge = (status: string, startDate: string, endDate: string) => {
    const timeStatus = getBookingTimeStatus(startDate, endDate);
    let badgeClass = "px-2 py-1 rounded-full text-xs font-medium ";
    let statusText = "";
    
    if (status.toLowerCase() === 'cancelled') {
      badgeClass += "bg-red-100 text-red-800";
      statusText = "Cancelled";
    } else {
      switch (timeStatus) {
        case 'ongoing':
          badgeClass += "bg-green-100 text-green-800";
          statusText = "Ongoing";
          break;
        case 'upcoming':
          badgeClass += "bg-blue-100 text-blue-800";
          statusText = "Upcoming";
          break;
        case 'completed':
          badgeClass += "bg-gray-100 text-gray-800";
          statusText = "Completed";
          break;
        default:
          badgeClass += "bg-yellow-100 text-yellow-800";
          statusText = status;
      }
    }
    
    return <span className={badgeClass}>{statusText}</span>;
  };
  
  const getStatusBadgeText = (status: string, startDate: string, endDate: string) => {
    const timeStatus = getBookingTimeStatus(startDate, endDate);
    
    if (status.toLowerCase() === 'cancelled') {
      return 'Cancelled';
    }
    
    switch (timeStatus) {
      case 'ongoing':
        return 'Ongoing';
      case 'upcoming':
        return 'Upcoming';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  // Transform filtered bookings data for the SimpleTable
  const tableData = filteredBookings.map(booking => ({
    bookingIdDisplay: booking.bookingIdDisplay,
    carNameDisplay: booking.carNameDisplay,
    customerDisplay: booking.customerDisplay,
    ownerDisplay: booking.ownerDisplay,
    amountDisplay: booking.amountDisplay,
    statusDisplay: getStatusBadge(booking.status, booking.startDate, booking.endDate),
    // Keep reference to original booking for view action
    _booking: booking,
  }));

 
  const columns: TableColumn[] = [
    { header: "Vroom BookingID", key: "bookingIdDisplay" },
    { header: "Car", key: "carNameDisplay" },
    { header: "Customer", key: "customerDisplay" },
    { header: "Owner", key: "ownerDisplay" },
    { header: "Amount", key: "amountDisplay" },
    { header: "Status", key: "statusDisplay" },
  ];

  const handleViewBooking = (rowData: any) => {
    setSelectedBooking(rowData._booking);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          Bookings Management
        </h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Bookings Management
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Search Input */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search by booking ID, car, customer, or owner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Search Results Summary */}
      <div className="mb-4 text-sm text-gray-600">
        {searchTerm ? (
          <>Showing {filteredBookings.length} of {bookings.length} bookings</>
        ) : (
          <>Total bookings: {bookings.length}</>
        )}
      </div>

      <SimpleTable
        columns={columns}
        data={tableData}
        itemsPerPage={5}
        showViewButton={true}
        onView={handleViewBooking}
      />

      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
};

export default BookingsPage;