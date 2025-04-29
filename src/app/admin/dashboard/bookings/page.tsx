'use client';

import React, { useEffect, useState } from "react";
import { DataTable, Column } from "@/components/admin/UserTable";
import { AdminAuthService } from "@/services/admin/adminService";
import { Eye} from "lucide-react";
import BookingDetailsModal from "@/components/admin/BookingDetailsModal";
import { format } from "date-fns";
import { IBooking } from "@/types/bookTypes";



const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const bookingsData = await AdminAuthService.getAllBookings();
        console.log("Bookings from backend", bookingsData);
        
        if (bookingsData && bookingsData.length > 0) {
          setBookings(bookingsData);
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
    
    if (status.toLowerCase() === 'cancelled') {
      return (
        <span className="px-2 py-1 text-sm rounded font-medium text-red flex items-center">
          Cancelled
        </span>
      );
    }
    
    switch (timeStatus) {
      case 'ongoing':
        return (
          <span className="px-2 py-1 text-sm rounded font-medium text-green-500  flex items-center">
             Ongoing
          </span>
        );
      case 'upcoming':
        return (
          <span className="px-2 py-1 text-sm rounded font-medium text-blue-500 flex items-center">
            Upcoming
          </span>
        );
      case 'completed':
        return (
          <span className="px-2 py-1 text-sm rounded font-medium text-gray-500 flex items-center">
            Completed
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-sm rounded font-medium text-gray-500 ">
            {status}
          </span>
        );
    }
  };

  const columns: Column<IBooking>[] = [
    {
      header: "Booking ID",
      accessor: "_id" as keyof IBooking,
      sortable: true,
      className: "max-w-[120px] truncate",
    },
    {
      header: "Vroom BookingID",
      accessor:(booking:IBooking)=>(
        <div>
        <div className="font-medium">{booking.bookingId}</div>
      </div>
      ),
      sortable: true,
    },
    {
      header: "Car",
      accessor: (booking: IBooking) => (
        <div>
          <div className="font-medium">{booking.carId.carName}</div>
        </div>
      ),
      sortable: true,
    },
    {
      header: "Customer",
      accessor: (booking: IBooking) => (
        <div>
          <div className="font-medium">{booking.userId.fullName}</div>
        </div>
      ),
      sortable: true,
    },
    {
      header: "Owner",
      accessor: (booking: IBooking) => (
        <div>
          <div className="font-medium">{booking.carOwnerId.fullName}</div>
        </div>
      ),
      sortable: true,
    },
    {
      header: "Amount",
      accessor: (booking: IBooking) => (
        <div className="font-medium text-green-600">₹{booking.totalPrice}</div>
      ),
      sortable: true,
    },
    {
      header: "Status",
      accessor: (booking: IBooking) => getStatusBadge(booking.status, booking.startDate, booking.endDate),
      sortable: true,
    },
    {
      header: "Actions",
      accessor: (booking: IBooking) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedBooking(booking);
            }}
            className="p-1 rounded text-blue-600 hover:bg-blue-100"
            title="View Details"
          >
            <Eye size={18} />
          </button>
        </div>
      ),
      className: "w-24",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Bookings Management
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <DataTable
        data={bookings}
        columns={columns}
        keyExtractor={(booking) => booking._id}
        onRowClick={setSelectedBooking}
        pagination={true}
        itemsPerPage={10}
        searchable={true}
        searchKeys={["_id", "carId.carName", "userId.fullName", "carOwnerId.fullName"] as Array<keyof IBooking >}
        loading={isLoading}
        emptyMessage="No bookings available"
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