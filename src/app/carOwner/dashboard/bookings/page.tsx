
"use client"
// pages/dashboard.tsx
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { OwnerAuthService } from '@/services/carOwner/authService';

// Update TypeScript interfaces to match your API response structure
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
}

export default function CarOwnerDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);


        const bookings = await OwnerAuthService.getBookingList();
        console.log("from backend", bookings);
        
        if (bookings) {
          setBookings(bookings);
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
              
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg">
                        {booking.carId.carName || 'Unknown Car'}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        ID: {booking.carId._id}
                      </p>
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
                    <p className="text-gray-600 text-sm">ID: {booking.userId._id}</p>
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
                    </div>
                  </div>
                  
                  
                  {booking.status.toLowerCase() !== 'cancelled'&& (
                  <div className="mt-4 flex gap-2">
                    <button className="bg-blue-200 hover:bg-blue-400 text-gray-800 px-3 py-1 rounded text-sm flex-1">
                      Chat with Customer
                    </button>
                    
                      {/* <button className="bg-white border border-red-500 hover:bg-red-50 text-red-500 px-3 py-1 rounded text-sm flex-1">
                        Cancel
                     </button>
                    */}
                    
                  </div>
                   )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {bookings.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">You don't have any bookings yet.</p>
        </div>
      )}
    </div>
  );
}