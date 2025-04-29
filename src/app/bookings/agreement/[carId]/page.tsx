



"use client"
import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { format, differenceInCalendarDays } from 'date-fns';
// import { findCarDetails } from '@/services/common/carDetails';
import { AuthService } from '@/services/customer/authService';

interface Car {
  _id: string;
  carName: string;
  brand: string;
  expectedWage: string;
}

const AgreementPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const carId = searchParams.get('carId');
  const params = useParams();
   const carId = params?.carId as string;
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const totalPrice = searchParams.get('totalPrice');

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAgreed, setIsAgreed] = useState(false);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (!carId) return;

    const fetchCarData = async () => {
      try {
        setLoading(true);
        const carData = await AuthService.findCarDetails(carId);
        setCar(carData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching car details:', err);
        setError('Failed to load car data. Please try again later.');
        setLoading(false);
      }
    };

    fetchCarData();
  }, [carId]);

  const handleAgree = () => {
    setIsAgreed(true);
    setShowModal(false);
    router.push(
      `/bookings/payment/${carId}?startDate=${startDate}&endDate=${endDate}&totalPrice=${totalPrice}`
    );
  };

  const handleDisagree = () => {
    setShowModal(false);
    router.push(`/booking/dateselection/${carId}?startDate=${startDate}&endDate=${endDate}`);
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-8">{error}</div>;
  if (!car) return <div className="text-center p-8">Car not found</div>;

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Stepper */}
        <div className="mb-8">
          <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 sm:text-base">
            <li className="flex items-center text-indigo-600 after:content-[''] after:w-full after:h-1 after:border-b after:border-indigo-100 after:border-1 after:hidden sm:after:inline-block sm:after:mx-6">
              <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                </svg>
                Check Availability
              </span>
            </li>
            <li className="flex items-center text-indigo-600 after:content-[''] after:w-full after:h-1 after:border-b after:border-indigo-100 after:border-1 after:hidden sm:after:inline-block sm:after:mx-6">
              <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                </svg>
                Select Dates
              </span>
            </li>
            <li className="flex items-center text-indigo-600 after:content-[''] after:w-full after:h-1 after:border-b after:border-indigo-100 after:border-1 after:hidden sm:after:inline-block sm:after:mx-6">
              <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                </svg>
                Agreement
              </span>
            </li>
            <li className="flex items-center">
              Payment
            </li>
          </ol>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6">Booking Agreement for {car.carName}</h2>
          {/* <div className="bg-indigo-50 p-6 rounded-lg mb-6">
            <p><strong>Car:</strong> {car.carName}</p>
            <p><strong>Brand:</strong> {car.brand}</p>
            <p><strong>Daily Rate:</strong> ₹{car.expectedWage}</p>
            {startDate && endDate && (
              <>
                <p><strong>Start Date:</strong> {format(new Date(startDate), 'MMM dd, yyyy')}</p>
                <p><strong>End Date:</strong> {format(new Date(endDate), 'MMM dd, yyyy')}</p>
                <p><strong>Duration:</strong> {differenceInCalendarDays(new Date(endDate), new Date(startDate)) + 1} days</p>
                <p><strong>Total Price:</strong> ₹{totalPrice}</p>
              </>
            )}
          </div> */}

          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-8 max-w-lg w-full">
                <h3 className="text-2xl font-bold text-indigo-700 mb-4">Rental Agreement</h3>
                <div className="max-h-96 overflow-y-auto mb-6">
                  <p className="text-gray-700">
                    Please read and agree to the following terms and conditions for renting the vehicle:
                    <br /><br />
                    1. The vehicle must be returned in the same condition as received, excluding normal wear and tear.
                    <br />
                    2. The renter is responsible for any damage to the vehicle during the rental period.
                    <br />
                    3. The vehicle must not be used for illegal activities or driven by unauthorized drivers.
                    <br />
                    4. The rental period is as specified above, and late returns may incur additional charges.
                    <br />
                    5. The renter agrees to pay the total price as displayed above.
                    <br /><br />
                    By proceeding, you confirm that you have read, understood, and agree to these terms.
                  </p>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={handleDisagree}
                    className="py-2 px-4 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
                  >
                    Disagree
                  </button>
                  <button
                    onClick={handleAgree}
                    className="py-2 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Agree
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgreementPage;

