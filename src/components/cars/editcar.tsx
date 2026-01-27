
// import React, { useState, useEffect } from 'react';
// import { createPortal } from 'react-dom';
// import InputField from '@/components/InputField';
// import FileUpload from '@/components/FileUpload';
// import { Car, CarFormData } from '@/types/authTypes';
// import toast from 'react-hot-toast';
// import LocationPicker from '../maps/LocationPicker';
// import { MapPin } from 'lucide-react';

// interface EditCarModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   car: Car;
//   onUpdateCar: (carData: CarFormData) => Promise<void>;
// }

// const EditCarModal: React.FC<EditCarModalProps> = ({ isOpen, onClose, car, onUpdateCar }) => {
//   const [formData, setFormData] = useState<CarFormData>({
//     carName: car.carName || '',
//     brand: car.brand || '',
//     year: car.year || '',
//     fuelType: car.fuelType || '',
//     carType:car.carType ||'',
//     rcBookNo: car.rcBookNo || '',
//     rcBookProof:car.rcBookProof|| '',
//     insuranceProof:car.insuranceProof|| '',
//     expectedWage: car.expectedWage || '',
//     location: car.location || '',
//     images: car.images || [],
//     videos: car.videos || [],
//     available: car.available !== undefined ? car.available : true, // Default to true if not specified
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [mounted, setMounted] = useState(false);
  
//   useEffect(() => {
//     setMounted(true);
//     return () => setMounted(false);
//   }, []);

//   useEffect(() => {
//     if (isOpen) {
//       setFormData({
//         carName: car.carName || '',
//         brand: car.brand || '',
//         year: car.year || '',
//         fuelType: car.fuelType || '',
//         carType:car.carType ||'',
//         rcBookNo: car.rcBookNo || '',
//         rcBookProof:car.rcBookProof|| '',
//         insuranceProof:car.insuranceProof|| '',
//         expectedWage: car.expectedWage || '',
//         location: car.location || '',
//         images: car.images || [],
//         videos: car.videos || [],
//         available: car.available !== undefined ? car.available : true, // Default to true if not specified
//       });
//     }
//   }, [car, isOpen]);

//   const handleCancel = () => {
//     setFormData({
//       carName: car.carName || '',
//       brand: car.brand || '',
//       year: car.year || '',
//       fuelType: car.fuelType || '',
//       carType:car.carType ||'',
//       rcBookNo: car.rcBookNo || '',
//       rcBookProof:car.rcBookProof|| '',
//       insuranceProof:car.insuranceProof|| '',
//       expectedWage: car.expectedWage || '',
//       location: car.location || '',
//       images: car.images || [],
//       videos: car.videos || [],
//       available: car.available !== undefined ? car.available : true, // Default to true if not specified
//     });
//     onClose();
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
  
//     if (name === 'landmark') {
//       setFormData(prev => ({
//         ...prev,
//         location: {
//           ...prev.location,
//           landmark: value
//         }
//       }));
//     } else if (name === 'available') {
//       // Handle boolean value for availability
//       setFormData(prev => ({
//         ...prev,
//         available: value === 'true'
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     }
//   };
  
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     setIsSubmitting(true);

//     try {
//       await onUpdateCar(formData);
//       toast.success('Car updated successfully!');
//       onClose();
//     } catch (error) {
//       console.error('Error updating car:', error);
//       toast.error('Failed to update car. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleRemoveImage = (indexToRemove: number) => {
//     setFormData(prev => ({
//       ...prev,
//       images: prev.images.filter((_, index) => index !== indexToRemove)
//     }));
//   };

//   const handleRemoveVideo = () => {
//     setFormData(prev => ({
//       ...prev,
//       videos: []
//     }));
//   };
  
//   if (!isOpen || !mounted) {
//     return null;
//   }

//   return createPortal(
//     <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//       <div className="bg-blue-100 rounded-xl shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        
//         <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
//           <h2 className="text-2xl font-bold text-gray-800">Edit Car Details</h2>
//           <button 
//             type="button" 
//             onClick={handleCancel}
//             className="text-gray-500 hover:text-gray-700 text-2xl font-bold hover:bg-gray-100 h-8 w-8 rounded-full flex items-center justify-center transition-colors"
//             aria-label="Close"
//           >
//             ×
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg shadow-sm">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
//             <div>
//               {/* Car Name - Disabled */}
//               <div className="mb-4">
//                 <label htmlFor="carName" className="block text-sm font-medium text-gray-700 mb-1">
//                   Car Name
//                 </label>
//                 <input
//                   type="text"
//                   id="carName"
//                   name="carName"
//                   value={formData.carName}
//                   disabled
//                   className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md text-gray-500"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Car name cannot be changed</p>
//               </div>
              
//               <InputField 
//                 label="Manufacturing Year" 
//                 name="year" 
//                 type="number" 
//                 value={formData.year}
//                 onChange={handleChange}
//                 disabled
//               />
              
//               {/* Fuel Type - Disabled */}
//               <div className="mb-4">
//                 <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">
//                   Fuel Type
//                 </label>
//                 <input
//                   type="text"
//                   id="fuelType"
//                   name="fuelType"
//                   value={formData.fuelType}
//                   disabled
//                   className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md text-gray-500"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Fuel type cannot be changed</p>
//               </div>

//                <div className="mb-4">
//                 <label htmlFor="carType" className="block text-sm font-medium text-gray-700 mb-1">
//                   Car Type
//                 </label>
//                 <input
//                   type="text"
//                   id="carType"
//                   name="carType"
//                   value={formData.carType}
//                   className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md text-gray-500"
//                 />
                
//               </div>
              
//             </div>

//             <div>
//               <InputField 
//                 label="Brand" 
//                 name="brand" 
//                 type="text" 
//                 value={formData.brand}
//                 onChange={handleChange} 
//               />
              
//               {/* RC Book No - Disabled */}
//               <div className="mb-4">
//                 <label htmlFor="rcBookNo" className="block text-sm font-medium text-gray-700 mb-1">
//                   RC Book No
//                 </label>
//                 <input
//                   type="text"
//                   id="rcBookNo"
//                   name="rcBookNo"
//                   value={formData.rcBookNo}
//                   disabled
//                   className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md text-gray-500"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">RC Book No cannot be changed</p>
//               </div>
              
//               <InputField 
//                 label="Expected Wage Daily" 
//                 name="expectedWage" 
//                 type="number" 
//                 value={formData.expectedWage}
//                 onChange={handleChange} 
//               />
              
//               {/* Availability - Boolean select input */}
//               <div className="mb-4">
//                 <label htmlFor="available" className="block text-sm font-medium text-gray-700 mb-1">
//                   Availability
//                 </label>
//                 <select
//                   id="available"
//                   name="available"
//                   value={formData.available?.toString()}
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
//                   required
//                 >
//                   <option value="true">Available</option>
//                   <option value="false">Not Available</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className="mb-6 border-t border-gray-100 pt-6">
//             <h3 className="text-lg font-semibold mb-4">Car Location</h3>
//             <div className="mt-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Pin Location on Map <span className="text-red-500">*</span>
//               </label>

//               <div className="h-72 w-full rounded-lg overflow-hidden border border-gray-300">
//                 {formData.location.coordinates.lat !== null &&
//                  formData.location.coordinates.lng !== null && (
//                   <LocationPicker
//                     onSelectLocation={(lat, lng, address, landmark) => {
//                       setFormData((prev) => ({
//                         ...prev,
//                         location: {
//                           ...prev.location,
//                           coordinates: { lat, lng },
//                           address: address || "",
//                         },
//                       }));
//                     }}
//                   />
//                 )}
//               </div>
  
//               {formData.location.coordinates.lat && formData.location.coordinates.lng && (
//                 <p className="mt-2 text-sm text-gray-600">
//                   Selected coordinates: {formData.location.coordinates.lat.toFixed(6)}, {formData.location.coordinates.lng.toFixed(6)}
//                 </p>
//               )}
//               {formData.location.address && (
//                 <p className="text-sm text-gray-500">
//                   <MapPin className="w-4 h-4 text-gray-500 inline-block mr-1" /> {formData.location.address}
//                 </p>
//               )}
//               {formData.location.landmark && (
//                 <p className="text-sm text-gray-500">
//                   <MapPin className="w-4 h-4 text-gray-500 inline-block mr-1" /> {formData.location.landmark}
//                 </p>
//               )}
//               {formData.location.coordinates && (
//                 <InputField 
//                   label="Landmark" 
//                   name="landmark" 
//                   type="text" 
//                   onChange={handleChange} 
//                   value={formData.location.landmark}
//                   placeholder="Nearby landmark (e.g., opposite to mall)"
//                 />
//               )}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 border-t border-gray-100 pt-6">
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Car Images</label>
//               {formData.images.length > 0 ? (
//                 <div className="space-y-3">
//                   <div className="grid grid-cols-2 gap-2">
//                     {formData.images.map((imageUrl, index) => (
//                       <div key={`${imageUrl}-${index}`} className="relative group">
//                         <img 
//                           src={imageUrl} 
//                           alt={`Car image ${index + 1}`} 
//                           className="w-full h-32 object-cover rounded-md border border-gray-200"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => handleRemoveImage(index)}
//                           className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
//                           title="Remove image"
//                         >
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                           </svg>
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm text-gray-600">{formData.images.length} {formData.images.length === 1 ? 'image' : 'images'}</span>
//                     {formData.images.length < 5 && (
//                       <FileUpload 
//                         accept="image/*"
//                         multiple={true}
//                         maxFiles={5 - formData.images.length}
//                         onUploadComplete={(uploadedUrls) => {
//                           if (Array.isArray(uploadedUrls) && uploadedUrls.length > 0) {
//                             setFormData(prev => ({ 
//                               ...prev, 
//                               images: [...prev.images, ...uploadedUrls] 
//                             }));
//                             toast.success(`${uploadedUrls.length} image(s) added!`);
//                           }
//                         }}
//                       >
//                         <button 
//                           type="button" 
//                           className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded"
//                         >
//                           Add more
//                         </button>
//                       </FileUpload>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <FileUpload 
//                   accept="image/*"
//                   multiple={true}
//                   maxFiles={5}
//                   onUploadComplete={(uploadedUrls) => {
//                     if (Array.isArray(uploadedUrls) && uploadedUrls.length > 0) {
//                       setFormData(prev => ({ ...prev, images: uploadedUrls }));
//                       toast.success(`${uploadedUrls.length} image(s) uploaded successfully!`);
//                     }
//                   }}
//                 />
//               )}
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Car Video</label>
//               {formData.videos && formData.videos.length > 0 ? (
//                 <div className="space-y-3">
//                   <div className="relative group">
//                     <video 
//                       src={formData.videos[0]} 
//                       controls
//                       className="w-full h-48 object-cover rounded-md border border-gray-200"
//                     />
//                     <button
//                       type="button"
//                       onClick={handleRemoveVideo}
//                       className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
//                       title="Remove video"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <FileUpload 
//                   accept="video/*"
//                   multiple={false}
//                   maxFiles={1}
//                   onUploadComplete={(uploadedUrl) => {
//                     if (typeof uploadedUrl === 'string') {
//                       setFormData(prev => ({ ...prev, videos: [uploadedUrl] }));
//                       toast.success('Video uploaded successfully!');
//                     } else if (Array.isArray(uploadedUrl) && uploadedUrl.length > 0) {
//                       // Handle case where FileUpload might return an array even for single file
//                       setFormData(prev => ({ ...prev, videos: [uploadedUrl[0]] }));
//                       toast.success('Video uploaded successfully!');
//                     }
//                   }}
//                 />
//               )}
//             </div>
//           </div>

//           <div className="flex justify-end space-x-4 mt-8 pt-4 border-t border-gray-100">
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition-colors font-medium"
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? 'Updating...' : 'Update Car'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>,
//     document.body
//   );
// };

// export default EditCarModal;



'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, Trash, MapPin } from 'lucide-react';

import InputField from '@/components/InputField';
import FileUpload from '@/components/FileUpload';
import LocationPicker from '@/components/maps/LocationPicker';
import toast from 'react-hot-toast';

import { Car, CarFormData } from '@/types/authTypes';

interface EditCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: Car;
  onUpdateCar: (updatedCar: CarFormData) => void | Promise<void>;
}

const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
const carTypes = ['Sedan', 'SUV', 'Hatchback', 'VAN/MUV'];

export default function EditCarModal({
  isOpen,
  onClose,
  car,
  onUpdateCar,
}: EditCarModalProps) {
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState<CarFormData>({
    carName: car.carName || '',
    brand: car.brand || '',
    year: car.year || '',
    fuelType: car.fuelType || '',
    carType: car.carType || '',
    rcBookNo: car.rcBookNo || '',
    expectedWage: car.expectedWage || '',
    location:
      car.location || {
        address: '',
        landmark: '',
        coordinates: { lat: null, lng: null },
      },
    images: car.images || [],
    videos: car.videos || [],
    available: car.available ?? true,
    rcBookProof: car.rcBookProof || '',
    insuranceProof: car.insuranceProof || '',
  });

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        carName: car.carName || '',
        brand: car.brand || '',
        year: car.year || '',
        fuelType: car.fuelType || '',
        carType: car.carType || '',
        rcBookNo: car.rcBookNo || '',
        expectedWage: car.expectedWage || '',
        location:
          car.location || {
            address: '',
            landmark: '',
            coordinates: { lat: null, lng: null },
          },
        images: car.images || [],
        videos: car.videos || [],
        available: car.available ?? true,
        rcBookProof: car.rcBookProof || '',
        insuranceProof: car.insuranceProof || '',
      });
    }
  }, [car, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'address' || name === 'landmark') {
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: value,
        },
      }));
      return;
    }

    if (name === 'available') {
      setFormData((prev) => ({ ...prev, available: value === 'true' }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== indexToRemove),
    }));
  };

  const handleRemoveVideo = () => {
    setFormData((prev) => ({ ...prev, videos: [] }));
  };


  const handleFileInsuranceUpload = (uploadedUrl: string | string[]) => {
    if (typeof uploadedUrl === 'string') {
      setFormData((prev) => ({ ...prev, insuranceProof: uploadedUrl }));
      toast.success('Insurance proof uploaded!');
    } else if (uploadedUrl[0]) {
      setFormData((prev) => ({ ...prev, insuranceProof: uploadedUrl[0] }));
      toast.success('Insurance proof uploaded!');
    }
  };

  const handleFileRCUpload = (uploadedUrl: string | string[]) => {
    if (typeof uploadedUrl === 'string') {
      setFormData((prev) => ({ ...prev, rcBookProof: uploadedUrl }));
      toast.success('RC book proof uploaded!');
    } else if (uploadedUrl[0]) {
      setFormData((prev) => ({ ...prev, rcBookProof: uploadedUrl[0] }));
      toast.success('RC book proof uploaded!');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdateCar(formData);
    toast.success('Car updated successfully!');
    onClose();
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        {/* header */}
        <div className="flex justify-between items-center mb-6 pb-3 border-b">
          <h2 className="text-2xl font-bold">Edit Car Details</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 rounded-full p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <InputField
                label="Car Name"
                name="carName"
                type="text"
                value={formData.carName}
                onChange={handleChange}
                className="focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter car name (e.g., Toyota Corolla)"
              />

              <InputField
                label="Manufacturing Year"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                className="focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 2019"
              />

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Type
                </label>
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>
                    Select fuel type
                  </option>
                  {fuelTypes.map((ft) => (
                    <option key={ft} value={ft}>
                      {ft}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Car Type
                </label>
                <select
                  name="carType"
                  value={formData.carType}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>
                    Select car type
                  </option>
                  {carTypes.map((ct) => (
                    <option key={ct} value={ct}>
                      {ct}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <InputField
                label="Brand"
                name="brand"
                type="text"
                value={formData.brand}
                onChange={handleChange}
                className="focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter car brand (e.g., Honda, BMW)"
              />

              <InputField
                label="RC Book No"
                name="rcBookNo"
                type="text"
                value={formData.rcBookNo}
                onChange={handleChange}
                className="focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter RC book number"
              />

              <InputField
                label="Expected Wage Daily"
                name="expectedWage"
                type="number"
                value={formData.expectedWage}
                onChange={handleChange}
                className="focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter daily rent (e.g., 1500)"
              />

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Availability
                </label>
                <select
                  name="available"
                  value={formData.available?.toString()}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>
              </div>
            </div>
          </div>

          
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Car Location</h3>

            <div className="h-72 w-full rounded-lg overflow-hidden border">
              <LocationPicker
                onSelectLocation={(lat, lng, address, landmark) => {
                  setFormData((prev) => ({
                    ...prev,
                    location: {
                      ...prev.location,
                      coordinates: { lat, lng },
                      address: address || prev.location.address,
                      landmark: landmark || prev.location.landmark,
                    },
                  }));
                }}
              />
            </div>

            {formData.location.coordinates?.lat != null &&
              formData.location.coordinates?.lng != null && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected coordinates:{' '}
                  {formData.location.coordinates.lat.toFixed(6)},{' '}
                  {formData.location.coordinates.lng.toFixed(6)}
                </p>
              )}

            {formData.location.address && (
              <p className="text-sm text-gray-500 mt-1">
                <MapPin className="w-4 h-4 inline-block mr-1" />
                {formData.location.address}
              </p>
            )}

            <InputField
              label="Landmark"
              name="landmark"
              type="text"
              value={formData.location.landmark}
              onChange={handleChange}
              className="focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nearby landmark (e.g., opposite City Mall)"
            />
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Car Images
              </label>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {formData.images.map((url, idx) => (
                    <div key={`${url}-${idx}`} className="relative group">
                      <img
                        src={url}
                        alt={`img-${idx + 1}`}
                        className="w-full h-32 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                        title="Remove image"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <FileUpload
                accept="image/*"
                multiple
                maxFiles={Math.max(0, 5 - formData.images.length)}
                onUploadComplete={(uploaded) => {
                  const urls = Array.isArray(uploaded) ? uploaded : [uploaded];
                  const safe = urls.filter(Boolean) as string[];
                  if (!safe.length) return;
                  setFormData((prev) => ({
                    ...prev,
                    images: [...prev.images, ...safe].slice(0, 5),
                  }));
                  toast.success(`${safe.length} image(s) added!`);
                }}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.images.length}/5 images
              </p>
            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Car Video
              </label>

              {formData.videos.length > 0 ? (
                <div className="relative group mb-3">
                  <video
                    src={formData.videos[0]}
                    controls
                    className="w-full h-48 object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveVideo}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              ) : null}

              {formData.videos.length === 0 && (
                <FileUpload
                  accept="video/*"
                  multiple={false}
                  maxFiles={1}
                  onUploadComplete={(uploaded) => {
                    const url =
                      typeof uploaded === 'string' ? uploaded : uploaded?.[0];
                    if (!url) return;
                    setFormData((prev) => ({ ...prev, videos: [url] }));
                    toast.success('Video uploaded!');
                  }}
                />
              )}
            </div>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Insurance Proof *
              </label>
              <FileUpload
                accept="image/*,application/pdf"
                multiple={false}
                onUploadComplete={handleFileInsuranceUpload}
              />
              {formData.insuranceProof && (
                <div className="mt-2 text-sm">
                  {formData.insuranceProof.toLowerCase().endsWith('.pdf') ? (
                    <a
                      href={formData.insuranceProof}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View uploaded PDF
                    </a>
                  ) : (
                    <img
                      src={formData.insuranceProof}
                      alt="Insurance Proof"
                      className="w-28 h-28 object-cover rounded border"
                    />
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload RC Book Proof *
              </label>
              <FileUpload
                accept="image/*,application/pdf"
                multiple={false}
                onUploadComplete={handleFileRCUpload}
              />
              {formData.rcBookProof && (
                <div className="mt-2 text-sm">
                  {formData.rcBookProof.toLowerCase().endsWith('.pdf') ? (
                    <a
                      href={formData.rcBookProof}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View uploaded PDF
                    </a>
                  ) : (
                    <img
                      src={formData.rcBookProof}
                      alt="RC Book Proof"
                      className="w-28 h-28 object-cover rounded border"
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          
          <div className="flex justify-end gap-3 border-t pt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800"
            >
              Update Car
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>,
    document.body
  );
}
