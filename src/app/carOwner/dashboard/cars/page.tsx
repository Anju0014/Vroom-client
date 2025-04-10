
// 2 success




// "use client"

// import React, { useState, useEffect } from 'react';
// import Head from 'next/head';
// import { FaPlus, FaPencilAlt, FaTrashAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
// import Image from 'next/image';
// import AddNewCarModal from '@/components/cars/addcar';
// import AgreementModal from '@/components/carOwner/dashboard/Agreement Modal';
// import { Car, CarFormData } from '@/types/authTypes';
// import { OwnerAuthService } from '@/services/carOwner/authService';

// const YourCarsPage: React.FC = () => {
  
//   const [cars, setCars] = useState<Car[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [isAgreementOpen, setIsAgreementOpen] = useState<boolean>(false);
//   const [isAddCarOpen, setIsAddCarOpen] = useState<boolean>(false);
  
//   useEffect(() => {
   
//     const fetchCars = async () => {
//       try {
//        const data = await OwnerAuthService.getCars();
//         setCars(data.cars || []);
//       } catch (error) {
//         console.error('Error fetching cars:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchCars();
//   }, []);

//   const handleAddCarClick = () => {
//     setIsAgreementOpen(true);
//   };

//   const handleAgree = () => {
//     setIsAgreementOpen(false);
//     setIsAddCarOpen(true);
//   };

//   const handleEditCar = (carId: string) => {
//     console.log("Edit car:", carId);
//     // Implement edit functionality
//   };

//   const handleDeleteCar = (carId: string) => {
//     console.log("Delete car:", carId);
//     // Implement delete functionality with confirmation
//   };
  
//   return (
//     <>
//       <Head>
//         <title>Your Cars | Car Management System</title>
//         <meta name="description" content="Manage your car fleet" />
//       </Head>
      
//       <div className="min-h-screen bg-gray-100">
//         <div className="container mx-auto p-4">
//           <div className="flex justify-between items-center mb-8">
//             <h1 className="text-2xl font-semibold">Your Cars</h1>
//             <div className="flex space-x-4">
//               <button 
//                 className="bg-gray-800 text-white px-4 py-2 rounded-md flex items-center hover:bg-gray-700 transition-colors"
//                 onClick={handleAddCarClick}
//               >
//                 <FaPlus className="mr-2" /> Add New Car
//               </button>
//             </div>
//           </div>
          
//           {loading ? (
//             <div className="text-center py-10">
//               <p>Loading your cars...</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {cars.length > 0 ? (
//                 cars.map((car, index) => {
//                   // Simulate some cars being verified and some not
//                   const isVerified = false;
                  
//                   return (
//                     <div key={car._id || car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//                       <div className="h-48 bg-gray-200 relative">
//                         {/* Verification badge */}
//                         <div className="absolute top-2 left-2 z-10">
//                           {isVerified ? (
//                             <span className="bg-green-500 text-white text-xs py-1 px-2 rounded-full flex items-center">
//                               <FaCheckCircle className="mr-1" /> Verified
//                             </span>
//                           ) : (
//                             <span className="bg-red-500 text-white text-xs py-1 px-2 rounded-full flex items-center">
//                               <FaTimesCircle className="mr-1" /> Not Verified
//                             </span>
//                           )}
//                         </div>
                        
//                         {/* Action buttons */}
//                         <div className="absolute top-2 right-2 z-10 flex space-x-2">
//                           <button
//                             onClick={() => handleEditCar(car._id || car.id|| null}
//                             className="bg-white p-2 rounded-full shadow-md hover:bg-blue-50 transition-colors"
//                             title="Edit"
//                           >
//                             <FaPencilAlt className="text-blue-600" size={14} />
//                           </button>
//                           <button
//                             onClick={() => handleDeleteCar(car._id || car.id)}
//                             className="bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
//                             title="Delete"
//                           >
//                             <FaTrashAlt className="text-red-600" size={14} />
//                           </button>
//                         </div>
                        
//                         {car.images && car.images.length > 0 ? (
//                           <Image 
//                             src={car.images[0]} 
//                             alt={car.carName}
//                             fill
//                             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                             style={{ objectFit: 'cover' }}
//                             priority
//                           />
//                         ) : (
//                           <div className="flex items-center justify-center h-full text-gray-400">
//                             No Image Available
//                           </div>
//                         )}
//                       </div>
//                       <div className="p-4">
//                         <h3 className="font-semibold text-lg">{car.carName}</h3>
//                         <p className="text-gray-600">{car.brand} • {car.year}</p>
//                         <div className="mt-2 flex justify-between">
//                           <span className="text-sm">{car.fuelType}</span>
//                           <span className="font-medium">₹{car.expectedWage}/day</span>
//                         </div>
//                         <p className="text-sm text-gray-500 mt-1">{car.location}</p>
//                       </div>
//                     </div>
//                   );
//                 })
//               ) : (
//                 <div className="col-span-full text-center py-10 text-gray-500">
//                   No cars added yet. Click "Add New Car" to get started.
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
      
//       <AgreementModal
//         isOpen={isAgreementOpen} 
//         onClose={() => setIsAgreementOpen(false)} 
//         onAgree={handleAgree} 
//       />
    
//       <AddNewCarModal 
//         isOpen={isAddCarOpen}
//         onClose={() => setIsAddCarOpen(false)}
     
//       />
//     </>
//   );
// };

// export default YourCarsPage;







"use client"

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FaPlus, FaPencilAlt, FaTrashAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Image from 'next/image';
import AddNewCarModal from '@/components/cars/addcar';
import AgreementModal from '@/components/carOwner/dashboard/Agreement Modal';
import { Car, CarFormData } from '@/types/authTypes';
import { OwnerAuthService } from '@/services/carOwner/authService';
import DeleteCarModal from '@/components/cars/deletecar';
import EditCarModal from '@/components/cars/editcar';

const YourCarsPage: React.FC = () => {
  
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAgreementOpen, setIsAgreementOpen] = useState<boolean>(false);
  const [isAddCarOpen, setIsAddCarOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await OwnerAuthService.getCars();
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

  const handleEditCar = (carId: string) => {
    const car = cars.find(car => car._id === carId || car.id === carId);
    if (car) {
      setSelectedCar(car);
      setIsEditModalOpen(true);
    }
  };

  const handleDeleteCar = (carId: string) => {
    const car = cars.find(car => car._id === carId || car.id === carId);
    if (car) {
      setSelectedCar(car);
      setIsDeleteModalOpen(true);
    }
  };
  
  const handleConfirmDelete = async () => {
    if (selectedCar) {
      try {
        // Call the delete API
        await OwnerAuthService.deleteCar((selectedCar._id ?? selectedCar.id)!);
        // Remove the car from the state
        setCars(cars.filter(car => (car._id || car.id) !== (selectedCar._id || selectedCar.id)));
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error('Error deleting car:', error);
      }
    }
  };

  const handleUpdateCar = async (updatedCarData: CarFormData) => {

    console.log("reach here dsjdhuf")
    if (selectedCar) {
      try {
        // Call the update API

        const carId = selectedCar._id ?? selectedCar.id;
        if (!carId) {
                 console.error("Missing car ID");
             return;
             }
        console.log("upohdgcycae fadrs",updatedCarData)
        await OwnerAuthService.updateCar(carId, updatedCarData);
        // await OwnerAuthService.updateCar(selectedCar._id || selectedCar.id, updatedCarData);
        // Update the car in the state
        setCars(cars.map(car => {
          if ((car._id || car.id) === (selectedCar._id || selectedCar.id)) {
            return { ...car, ...updatedCarData };
          }
          return car;
        }));
        setIsEditModalOpen(false);
      } catch (error) {
        console.error('Error updating car:', error);
      }
    }
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
              <button 
                className="bg-gray-800 text-white px-4 py-2 rounded-md flex items-center hover:bg-gray-700 transition-colors"
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
                cars.map((car) => {
                  // Simulate some cars being verified and some not
                  const isVerified = false;
                  const carId = car._id || car.id;
                  
                  return (
                    <div key={carId} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="h-48 bg-gray-200 relative">
                        {/* Verification badge */}
                        <div className="absolute top-2 left-2 z-10">
                          {isVerified ? (
                            <span className="bg-green-500 text-white text-xs py-1 px-2 rounded-full flex items-center">
                              <FaCheckCircle className="mr-1" /> Verified
                            </span>
                          ) : (
                            <span className="bg-red-500 text-white text-xs py-1 px-2 rounded-full flex items-center">
                              <FaTimesCircle className="mr-1" /> Not Verified
                            </span>
                          )}
                        </div>
                        
                        {/* Action buttons */}
                        <div className="absolute top-2 right-2 z-10 flex space-x-2">
                        {(car._id ?? car.id) && (
                          <>
                          <button
                            onClick={() => handleEditCar(car._id ?? car.id!)}
                            className="bg-white p-2 rounded-full shadow-md hover:bg-blue-50 transition-colors"
                            title="Edit"
                          >
                            <FaPencilAlt className="text-blue-600" size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteCar(car._id ?? car.id!)}
                            className="bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <FaTrashAlt className="text-red-600" size={14} />
                          </button>
                          </>
                          )}
                        </div>
                        
                        {car.images && car.images.length > 0 ? (
                          <Image 
                            src={car.images[0]} 
                            alt={car.carName}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'cover' }}
                            priority
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
                  );
                })
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
      />

      {selectedCar && (
        <>
          <DeleteCarModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
            carName={selectedCar.carName}
          />
          
          <EditCarModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            car={selectedCar}
            onUpdateCar={handleUpdateCar}
          />
        </>
      )}
    </>
  );
};

export default YourCarsPage;