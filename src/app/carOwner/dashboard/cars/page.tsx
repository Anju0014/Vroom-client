// "use client"

// import {useState} from "react"
// import Head from "next/head";
// import { Car } from "@/types/authTypes";
// import { FaEdit,FaTrash,FaPlus } from "react-icons/fa";
// import Image from "next/image";
// import { ReactNode } from "react";

// interface NavItemProps {
//     icon: ReactNode;  // You can also use ReactElement if you want to restrict it more
//     label: string;
//     active?: boolean;
//   }
// export default function Home() {
//     const [cars, setCars] = useState<Car[]>([
//       {
//         id: '1',
//         model: 'Tesla Model 3',
//         year: 2023,
//         fuelType: 'Electric',
//         rcBookNo: 'KA01AB1234',
//         isVerified: true,
//       },
//       {
//         id: '2',
//         model: 'Toyota Camry',
//         year: 2023,
//         fuelType: 'Petrol',
//         rcBookNo: 'KA02CD5678',
//         isVerified: false,
//       },
//     ]);
  
//     return (
//       <div className="flex min-h-screen bg-gray-100">
//         <Head>
//           <title>Car Management Dashboard</title>
//           <meta name="description" content="Car Management Dashboard" />
//           <link rel="icon" href="/favicon.ico" />
//         </Head>
  
//         {/* Sidebar */}
//         <div className="w-64 bg-blue-100 p-4">
//           <div className="flex flex-col items-center mb-8">
//             <div className="w-16 h-16 rounded-full bg-gray-300 mb-2 overflow-hidden">
//               <Image 
//                 src="/images/user.png" 
//                 alt="Profile" 
//                 width={64} 
//                 height={64} 
//                 className="rounded-full"
//               />
//             </div>
//             <h3 className="text-lg font-semibold">John Doe</h3>
//             <p className="text-sm text-gray-600">john.doe@example.com</p>
//           </div>
  
//           {/* Navigation */}
//           <nav>
//             <ul className="space-y-2">
//               <NavItem icon="👤" label="Personal Details" />
//               <NavItem icon="📍" label="Address" />
//               <NavItem icon="🆔" label="ID Proof & Agreement" />
//               <NavItem icon="🚗" label="Your Cars" active />
//               <NavItem icon="📅" label="Bookings" />
//               <NavItem icon="📝" label="Report & Complaint" />
//               <NavItem icon="💰" label="Revenue" />
//               <NavItem icon="💬" label="Chat" />
//               <NavItem icon="⚙️" label="Settings" />
//               <NavItem icon="🚪" label="Logout" />
//             </ul>
//           </nav>
//         </div>
  
//         {/* Main Content */}
//         <div className="flex-1 p-8">
//           <div className="flex justify-between items-center mb-8">
//             <h1 className="text-2xl font-semibold">Your Cars</h1>
//             <div className="flex space-x-4">
//               <button className="bg-gray-800 text-white px-4 py-2 rounded-md">
//                 Agreement
//               </button>
//               <button className="bg-gray-800 text-white px-4 py-2 rounded-md flex items-center">
//                 <FaPlus className="mr-2" /> Add New Car
//               </button>
//             </div>
//           </div>
  
//           {/* Car List */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {cars.map((car) => (
//               <CarCard key={car.id} car={car} />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   // NavItem Component
//   function NavItem({ icon, label, active = false}: NavItemProps ) {
//     return (
//       <li className={`flex items-center p-2 rounded-md ${active ? 'bg-blue-200' : 'hover:bg-blue-200'}`}>
//         <span className="mr-3">{icon}</span>
//         <span className="text-sm">{label}</span>
//       </li>
//     );
//   }
  
//   // CarCard Component
//   function CarCard({ car }: { car: Car }) {
//     return (
//       <div className="bg-white p-4 rounded-md shadow">
//         <div className="flex justify-between items-start mb-2">
//           <div className="flex items-center">
//             <h3 className="text-lg font-semibold">{car.model}</h3>
//             {car.isVerified && (
//               <span className="ml-2 text-green-500 text-lg">✓</span>
//             )}
//             {!car.isVerified && (
//               <span className="ml-2 text-orange-500 text-lg">⚠</span>
//             )}
//           </div>
//           <div className="flex space-x-2">
//             <button className="text-blue-500 hover:text-blue-700">
//               <FaEdit />
//             </button>
//             <button className="text-red-500 hover:text-red-700">
//               <FaTrash />
//             </button>
//           </div>
//         </div>
//         <p className="text-gray-600 mb-2">{car.year}</p>
//         <div className="space-y-1">
//           <p className="text-sm">
//             <span className="font-medium">Fuel Type:</span> {car.fuelType}
//           </p>
//           <p className="text-sm">
//             <span className="font-medium">RC Book No:</span> {car.rcBookNo}
//           </p>
//         </div>
//       </div>
//     );
//   }


"use client"

// File: pages/cars/index.tsx
import React, { useState } from 'react';
import Head from 'next/head';
import { FaPlus } from 'react-icons/fa';
import Image from 'next/image';
import AddNewCarModal from '@/components/cars/addcar';

// Define car data interface
interface Car {
  id: string;
  carName: string;
  brand: string;
  year: string;
  fuelType: string;
  expectedWage: string;
  location: string;
  images: string[];
}

interface CarFormData {
  carName: string;
  brand: string;
  year: string;
  fuelType: string;
  rcBookNo: string;
  expectedWage: string;
  location: string;
  images: File[];
  videos: File[];
}

const YourCarsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  React.useEffect(() => {
    // Fetch cars data
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/cars');
        const data = await response.json();
        setCars(data.cars || []);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCars();
  }, []);
  
  const handleAddCar = async (carData: CarFormData) => {
    // Create FormData for file uploads
    const formData = new FormData();
    
    // Add form fields to FormData
    Object.entries(carData).forEach(([key, value]) => {
      if (key !== 'images' && key !== 'videos') {
        formData.append(key, value as string);
      }
    });
    
    // Add images
    carData.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });
    
    // Add videos
    carData.videos.forEach((video, index) => {
      formData.append(`videos[${index}]`, video);
    });
    
    // Send to API endpoint
    const response = await fetch('/api/cars', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to save car data');
    }
    
    // Get the response data
    const result = await response.json();
    
    // Update the cars list
    setCars([...cars, result.car]);
  };
  
  return (
    <>
      <Head>
        <title>Your Cars | Car Management System</title>
        <meta name="description" content="Manage your car fleet" />
      </Head>
      
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold">Your Cars</h1>
            <div className="flex space-x-4">
              <button className="bg-gray-800 text-white px-4 py-2 rounded-md">
                Agreement
              </button>
              <button 
                className="bg-gray-800 text-white px-4 py-2 rounded-md flex items-center"
                onClick={() => setIsModalOpen(true)}
              >
                <FaPlus className="mr-2" /> Add New Car
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-10">
              <p>Loading your cars...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.length > 0 ? (
                cars.map((car) => (
                  <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 bg-gray-200 relative">
                      {car.images && car.images.length > 0 ? (
                        <Image 
                          src={car.images[0]} 
                          alt={car.carName}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          No Image Available
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{car.carName}</h3>
                      <p className="text-gray-600">{car.brand} • {car.year}</p>
                      <div className="mt-2 flex justify-between">
                        <span className="text-sm">{car.fuelType}</span>
                        <span className="font-medium">₹{car.expectedWage}/day</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{car.location}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-gray-500">
                  No cars added yet. Click "Add New Car" to get started.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Modal for adding a new car */}
      <AddNewCarModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCar={handleAddCar}
      />
    </>
  );
};

export default YourCarsPage;