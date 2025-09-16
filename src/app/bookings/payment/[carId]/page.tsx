

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { format, differenceInCalendarDays } from 'date-fns';
// import { findCarDetails } from '@/services/common/carDetails';
import { AuthService } from '@/services/customer/authService';
import { useAuthStore } from '@/store/customer/authStore';
import StripeCheckoutForm from '@/components/common/StripeCheckoutForm';

interface Car {
  _id: string;
  carName: string;
  brand: string;
  expectedWage: string;
  ownerId: string;
}

const PaymentPage = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const carId = params?.carId as string;
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const totalPrice = searchParams.get('totalPrice');

  const { data: session, status } = useSession();
  const { user, accessToken } = useAuthStore();

  const [car, setCar] = useState<Car | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  

  const isNextAuthUser = status === 'authenticated';
  const isZustandUser = !!user && !!accessToken;
  const isAuthenticated = isNextAuthUser || isZustandUser;

    if (!user) {
        return;
    }
  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/bookings/dateselection/${carId}?startDate=${startDate}&endDate=${endDate}`);
      return;
    }
  

    let isMounted = true; 
    const initializeBooking = async () => {
      try {
        console.log("user",user);
        // console.log("user._id checking for token change?",user?._id)
        console.log("user.id normal ",user.id)
        setLoading(true);
  
      
        const carData = await AuthService.findCarDetails(carId);
        if (!isMounted) return;
  
        setCar(carData);
  
        if (!startDate || !endDate) {
          throw new Error('Start date or end date is missing');
        }
        if (!totalPrice || isNaN(parseInt(totalPrice))) {
          throw new Error('Invalid or missing totalPrice');
        }
        if (!session?.user?.id && !user.id) {
          throw new Error('User ID is missing');
        }
  
        // Create pending booking
        const bookingData = {
          carId,
          userId: session?.user?.id || user.id,
          carOwnerId: carData.owner,
          startDate,
          endDate,
          totalPrice: parseInt(totalPrice),
        };
  
        const bookingResponse = await AuthService.createPendingBooking(bookingData);
        if (!isMounted) return;
  
        setBookingId(bookingResponse.bookingId);
      } catch (err: any) {
        console.error('Error initializing booking:', err);
        if (isMounted) {
          setError('Failed to initialize booking. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
  
    if (carId && startDate && endDate && totalPrice && (session?.user?.email || user.email)) {
      initializeBooking();
    } else {
      setError('Incomplete booking data or missing email');
      setLoading(false);
    }
  
    return () => {
      isMounted = false; 
    };
  }, [carId, startDate, endDate, totalPrice, isAuthenticated, session?.user?.email, user.email]);
  const handleBack = () => {
    router.push(`/bookings/dateselection/${carId}?startDate=${startDate}&endDate=${endDate}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-8 max-w-lg mx-auto">
        {error}
        <button
          onClick={handleBack}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!car || !startDate || !endDate || !totalPrice || !bookingId) {
    return (
      <div className="text-red-500 text-center p-8 max-w-lg mx-auto">
        Incomplete booking data or booking not initialized
        <button
          onClick={handleBack}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const steps = ['Check Availability', 'Select Dates', 'Agreement', 'Payment'];
  const currentStep = steps.length - 1;

  return (
    <div className="bg-gradient-to-b from-blue-200 to-yellow-200 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <ol className="flex items-center justify-between w-full text-sm font-medium text-gray-500">
            {steps.map((step, idx) => (
              <li
                key={step}
                className={`flex items-center ${
                  idx <= currentStep ? 'text-indigo-600' : ''
                } ${idx < steps.length - 1 ? 'flex-1' : ''}`}
              >
                <span className="flex items-center">
                  <span
                    className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 ${
                      idx <= currentStep ? 'bg-indigo-600 text-white' : 'bg-gray-200'
                    }`}
                  >
                    {idx < currentStep ? (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6.293 13.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
                      </svg>
                    ) : (
                      idx + 1
                    )}
                  </span>
                  {step}
                </span>
                {idx < steps.length - 1 && (
                  <div className="flex-1 h-1 bg-gray-200 mx-4">
                    <div
                      className={`h-full ${idx < currentStep ? 'bg-indigo-600' : ''}`}
                    ></div>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-indigo-700">
              Payment for {car.carName}
            </h2>
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Back
            </button>
          </div>
          <div className="space-y-8">
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-indigo-700 mb-4">
                Booking Summary
              </h3>
              <div className="space-y-2">
                <p><strong>Car:</strong> {car.carName}</p>
                <p><strong>Brand:</strong> {car.brand}</p>
                <p><strong>Daily Rate:</strong> ₹{car.expectedWage}</p>
                <p>
                  <strong>Start Date:</strong>{' '}
                  {format(new Date(startDate), 'MMM dd, yyyy')}
                </p>
                <p>
                  <strong>End Date:</strong>{' '}
                  {format(new Date(endDate), 'MMM dd, yyyy')}
                </p>
                <p>
                  <strong>Duration:</strong>{' '}
                  {differenceInCalendarDays(new Date(endDate), new Date(startDate)) + 1}{' '}
                  days
                </p>
                <p><strong>Total Price:</strong> ₹{totalPrice}</p>
              </div>
            </div>

            <div className="max-w-lg mx-auto">
              {paymentError && (
                <div className="mb-4 text-red-500 text-center">{paymentError}</div>
              )}
              <StripeCheckoutForm
                carId={car._id}
                startDate={startDate}
                endDate={endDate}
                totalPrice={parseInt(totalPrice)}
                customerEmail={session?.user?.email || user.email}
                userId={session?.user?.id || user.id}
                carOwnerId={car.ownerId}
                dailyRate={car.expectedWage}
                bookingId={bookingId} // Pass bookingId
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;


