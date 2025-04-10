"use client";

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/HeaderCustomer';
import VroomFooter from '@/components/Footer';

export default function Home() {
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [carType, setCarType] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
   
    console.log('Searching with:', { location, pickupDate, carType });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      
      <div className="relative h-[500px] w-full">
        
      <div className="absolute inset-0 z-0">
  <Image 
    src="/images/desert-background.png" 
    alt="Desert with SUV" 
    fill 
    style={{ objectFit: 'cover' }} 
    priority
  />
</div>
        
        
        <div className="absolute inset-0 z-10 flex flex-col justify-center px-8 md:px-16 bg-black/20">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
              Find Your Perfect Ride – <br />
              Anytime, Anywhere!
            </h1>
            <p className="text-white text-lg mb-8">
              Book from our wide selection of vehicles for any occasion at the best prices.
            </p>

            
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-3xl">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
                <div className="flex-1">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    id="location"
                    placeholder="Where to pickup?"
                    className="w-full p-2 border rounded-md"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="pickup-date" className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
                  <input
                    type="date"
                    id="pickup-date"
                    className="w-full p-2 border rounded-md"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="car-type" className="block text-sm font-medium text-gray-700 mb-1">Car Type</label>
                  <select
                    id="car-type"
                    className="w-full p-2 border rounded-md"
                    value={carType}
                    onChange={(e) => setCarType(e.target.value)}
                  >
                    <option value="">All Cars</option>
                    <option value="economy">Economy</option>
                    <option value="suv">SUV</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>
              </form>
              <button
                type="submit"
                onClick={handleSearch}
                className="mt-3 w-full py-3 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-800 transition-all"
              >
                <span className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search Available Cars
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Why Choose Vroom</h2>
          <p className="text-gray-600 text-center mb-12">We offer the best car rental experience with premium service and satisfaction, always.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="flex flex-col items-center">
              <div className="bg-yellow-100 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Wide Car Selection</h3>
              <p className="text-gray-600 text-center text-sm">From economy to luxury, we've got you covered.</p>
            </div>

            
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Secure & Verified</h3>
              <p className="text-gray-600 text-center text-sm">All vehicles are verified for your safety.</p>
            </div>

            
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Easy Payments</h3>
              <p className="text-gray-600 text-center text-sm">Secure online payments with PayPal.</p>
            </div>

            
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Real-Time Availability</h3>
              <p className="text-gray-600 text-center text-sm">Always know what cars are awaiting.</p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">How It Works</h2>
          <p className="text-gray-600 text-center mb-12">Renting a car never been easier. Follow these simple steps.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-6">1</div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-800 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Browse & Select a Car</h3>
              <p className="text-gray-600 text-center">Check our inventory by location, date, and car type to find your perfect match.</p>
            </div>

            
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-6">2</div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-800 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Book & Make Payment</h3>
              <p className="text-gray-600 text-center">Reserve your car instantly with our secure payment system.</p>
            </div>

            
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-6">3</div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-800 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Pick Up & Drive</h3>
              <p className="text-gray-600 text-center">Collect your keys and enjoy your journey with peace of mind.</p>
            </div>
          </div>
        </div>
      </section>
      <VroomFooter/>
    </div>
  );
};

