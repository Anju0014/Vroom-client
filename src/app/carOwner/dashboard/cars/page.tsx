
"use client"

import React, { useState,useEffect } from 'react';
import Head from 'next/head';
import { FaPlus } from 'react-icons/fa';
import Image from 'next/image';
import AddNewCarModal from '@/components/cars/addcar';
import AgreementModal from '@/components/carOwner/dashboard/Agreement Modal';
import { Car,CarFormData } from '@/types/authTypes';
import { OwnerAuthService } from '@/services/carOwner/authService';

const YourCarsPage: React.FC = () => {
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAgreementOpen, setIsAgreementOpen] = useState<boolean>(false);
  const [isAddCarOpen, setIsAddCarOpen] = useState<boolean>(false);
  
  useEffect(() => {
   
    const fetchCars = async () => {
      try {
       const data= await OwnerAuthService.getCars();
        setCars(data.cars || []);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCars();
  }, []);

  const handleAddCarClick = () => {
    setIsAgreementOpen(true);
  };


  const handleAgree = () => {
    setIsAgreementOpen(false);
    setIsAddCarOpen(true);
  };
  


  // const handleAddCar = async (carData: CarFormData) => {
  //   const formData = new FormData();
  //   Object.entries(carData).forEach(([key, value]) => {
  //     if (key !== 'images' && key !== 'videos') {
  //       formData.append(key, value as string);
  //     }
  //   });
    
  //   carData.images.forEach((image, index) => {
  //     formData.append(`images[${index}]`, image);
  //   });
  //   carData.videos.forEach((video, index) => {
  //     formData.append(`videos[${index}]`, video);
  //   });
    
  
  //   const response =  await OwnerAuthService.getCars();
  //   if (!response.ok) {
  //     throw new Error('Failed to save car data');
  //   }
    

  //   const result = await response.json();
    

  //   setCars([...cars, result.car]);
  // };
  
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
              <button 
                className="bg-gray-800 text-white px-4 py-2 rounded-md flex items-center"
                onClick={handleAddCarClick}
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
                <div key={car._id || car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
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
      
      <AgreementModal
        isOpen={isAgreementOpen} 
        onClose={() => setIsAgreementOpen(false)} 
        onAgree={handleAgree} 
      />
    
      <AddNewCarModal 
        isOpen={isAddCarOpen}
        onClose={() => setIsAddCarOpen(false)}
        // onAddCar={handleAddCar}
      />
    </>
  );
};

export default YourCarsPage;