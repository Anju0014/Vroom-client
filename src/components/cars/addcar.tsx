// // import React, { useState, useEffect } from 'react';
// // import { createPortal } from 'react-dom';
// // import InputField from '@/components/InputField';
// // import FileUpload from '@/components/FileUpload';
// // import { CarFormData } from '@/types/authTypes';
// // import { OwnerAuthService } from '@/services/carOwner/authService';
// // import toast from 'react-hot-toast';
// // import { carSchema } from '@/lib/validation';

// // interface AddNewCarModalProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onAddCar?: (carData: CarFormData) => Promise<void>;
// // }

// // const AddNewCarModal: React.FC<AddNewCarModalProps> = ({ isOpen, onClose, onAddCar }) => {
// //   const [formData, setFormData] = useState<CarFormData>({
// //     carName: '',
// //     brand: '',
// //     year: '',
// //     fuelType: '',
// //     rcBookNo: '',
// //     expectedWage: '',
// //     location: '',
// //     images: [],
// //     videos: [],
// //   });

// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [mounted, setMounted] = useState(false);
  
// //   useEffect(() => {
// //     setMounted(true);
// //     return () => setMounted(false);
// //   }, []);

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();


    
  
// //     setIsSubmitting(true);

// //     try {
  
  
// //        const result = carSchema.safeParse(formData);
// //        if (!result.success) {
// //          const errorMessages = result.error.errors.map((err) => err.message).join(", ");
// //          toast.error(errorMessages);
// //          return;
// //        }
// //       await OwnerAuthService.addCar(formData);
      
// //       // if (onAddCar) {
// //       //   await onAddCar(formData);
// //       // }

// //       // Show success toast
// //       toast.success('Car added successfully!');
      
    
// //       setFormData({
// //         carName: '',
// //         brand: '',
// //         year: '',
// //         fuelType: '',
// //         rcBookNo: '',
// //         expectedWage: '',
// //         location: '',
// //         images: [],
// //         videos: [],
// //       });
      
// //       // Close modal
// //       onClose();
// //     } catch (error) {
// //       console.error('Error adding new car:', error);
// //       toast.error('Failed to add new car. Please try again.');
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };
  
// //   if (!isOpen || !mounted) {
// //     return null;
// //   }

// //   return createPortal(
// //     <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
// //       <div className="bg-blue-100 rounded-xl shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        
// //         <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
// //           <h2 className="text-2xl font-bold text-gray-800">Add New Car</h2>
// //           <button 
// //             type="button" 
// //             onClick={onClose}
// //             className="text-gray-500 hover:text-gray-700 text-2xl font-bold hover:bg-gray-100 h-8 w-8 rounded-full flex items-center justify-center transition-colors"
// //             aria-label="Close"
// //           >
// //             ×
// //           </button>
// //         </div>

// //         <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg shadow-sm">
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
// //             <div className="">
// //               <InputField label="Car Name" name="carName" type="text"  onChange={handleChange}  />
// //               <InputField label="Manufacturing Year" name="year" type="number"  onChange={handleChange}  />
// //               <InputField label="Fuel Type" name="fuelType" type="text"  onChange={handleChange}/>

// //               <div className="mb-4">
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">Car Images</label>
// //                 <FileUpload 
// //                   accept="image/*"
// //                   multiple={true}
// //                   maxFiles={5}
// //                   onUploadComplete={(uploadedUrls) => {
// //                     if (Array.isArray(uploadedUrls)) {
// //                       setFormData(prev => ({ ...prev, images: uploadedUrls }));
// //                     }
// //                   }}
// //                 />
// //               </div>
// //             </div>

// //             <div>
// //               <InputField label="Brand" name="brand" type="text" onChange={handleChange}  />
// //               <InputField label="RC Book No" name="rcBookNo" type="text" onChange={handleChange} />
// //               <InputField label="Expected Wage Daily" name="expectedWage" type="number"  onChange={handleChange} />
// //               <InputField label="Location" name="location" type="text" onChange={handleChange}  />
              
// //               <div className="mb-4">
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">Car Video</label>
// //                 <FileUpload 
// //                   accept="video/*"
// //                   multiple={false}
// //                   maxFiles={1}
// //                   onUploadComplete={(uploadedUrl) => {
// //                     if (typeof uploadedUrl === 'string') {
// //                       setFormData(prev => ({ ...prev, videos: [uploadedUrl] }));  
// //                     }
// //                   }}
// //                 />
// //               </div>
// //             </div>
// //           </div>

// //           <div className="flex justify-end space-x-4 mt-8 pt-4 border-t border-gray-100">
// //             <button
// //               type="button"
// //               onClick={onClose}
// //               className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition-colors font-medium"
// //               disabled={isSubmitting}
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium"
// //               disabled={isSubmitting}
// //             >
// //               {isSubmitting ? 'Adding...' : 'Add Car'}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>,
// //     document.body
// //   );
// // };

// // export default AddNewCarModal;


// import React, { useState, useEffect } from 'react';
// import { createPortal } from 'react-dom';
// import InputField from '@/components/InputField';
// import FileUpload from '@/components/FileUpload';
// import { CarFormData } from '@/types/authTypes';
// import { OwnerAuthService } from '@/services/carOwner/authService';
// import toast from 'react-hot-toast';
// import { carSchema } from '@/lib/validation';
// import LocationPicker from "@/components/maps/LocationPicker";

// interface AddNewCarModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onAddCar?: (carData: CarFormData) => Promise<void>;
// }

// const AddNewCarModal: React.FC<AddNewCarModalProps> = ({ isOpen, onClose, onAddCar }) => {
//   const [formData, setFormData] = useState<CarFormData>({
//     carName: '',
//     brand: '',
//     year: '',
//     fuelType: '',
//     rcBookNo: '',
//     expectedWage: '',
//     location: '',
//     images: [],
//     videos: [],
//   });
//   const [latitude, setLatitude] = useState<number | null>(null);
//   const [longitude, setLongitude] = useState<number | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [imagesUploaded, setImagesUploaded] = useState(false);
//   const [videoUploaded, setVideoUploaded] = useState(false);
  
//   // Fuel type options
//   const fuelTypes = [
//     "Petrol",
//     "Diesel",
//     "Electric",
//     "Hybrid",
//     "CNG",
//     "LPG"
//   ];
  
//   useEffect(() => {
//     setMounted(true);
//     return () => setMounted(false);
//   }, []);

//   const handleLocationSelect = (lat: number, lng: number) => {
//     setLatitude(lat);
//     setLongitude(lng);
//   };
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     setIsSubmitting(true);

//     try {
//        const result = carSchema.safeParse(formData);
//        if (!result.success) {
//          const errorMessages = result.error.errors.map((err) => err.message).join(", ");
//          toast.error(errorMessages);
//          return;
//        }
//       await OwnerAuthService.addCar(formData);
      
//       // if (onAddCar) {
//       //   await onAddCar(formData);
//       // }

//       // Show success toast
//       toast.success('Car added successfully!');
    
//       setFormData({
//         carName: '',
//         brand: '',
//         year: '',
//         fuelType: '',
//         rcBookNo: '',
//         expectedWage: '',
//         location: '',
//         images: [],
//         videos: [],
//       });
      
//       // Reset upload states
//       setImagesUploaded(false);
//       setVideoUploaded(false);
      
//       // Close modal
//       onClose();
//     } catch (error) {
//       console.error('Error adding new car:', error);
//       toast.error('Failed to add new car. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  
//   if (!isOpen || !mounted) {
//     return null;
//   }

//   return createPortal(
//     <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//       <div className="bg-blue-100 rounded-xl shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        
//         <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
//           <h2 className="text-2xl font-bold text-gray-800">Add New Car</h2>
//           <button 
//             type="button" 
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 text-2xl font-bold hover:bg-gray-100 h-8 w-8 rounded-full flex items-center justify-center transition-colors"
//             aria-label="Close"
//           >
//             ×
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg shadow-sm">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
//             <div className="">
//               <InputField label="Car Name" name="carName" type="text" onChange={handleChange} />
//               <InputField label="Manufacturing Year" name="year" type="number" onChange={handleChange} />
              
//               {/* Fuel Type Dropdown */}
//               <div className="mb-4">
//                 <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">
//                   Fuel Type
//                 </label>
//                 <select
//                   id="fuelType"
//                   name="fuelType"
//                   value={formData.fuelType}
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
//                   required
//                 >
//                   <option value="" disabled>Select fuel type</option>
//                   {fuelTypes.map((type) => (
//                     <option key={type} value={type}>
//                       {type}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Car Images</label>
//                 {imagesUploaded ? (
//                   <div className="flex items-center">
//                     <div className="bg-green-100 text-green-800 px-3 py-2 rounded-md w-full">
//                       Images uploaded successfully! ({formData.images.length} images)
//                     </div>
//                     <button 
//                       type="button"
//                       onClick={() => {
//                         setImagesUploaded(false);
//                         setFormData(prev => ({ ...prev, images: [] }));
//                       }}
//                       className="ml-2 text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded"
//                     >
//                       Reset
//                     </button>
//                   </div>
//                 ) : (
//                   <FileUpload 
//                     accept="image/*"
//                     multiple={true}
//                     maxFiles={5}
//                     onUploadComplete={(uploadedUrls) => {
//                       if (Array.isArray(uploadedUrls) && uploadedUrls.length > 0) {
//                         setFormData(prev => ({ ...prev, images: uploadedUrls }));
//                         setImagesUploaded(true);
//                         toast.success(`${uploadedUrls.length} image(s) uploaded successfully!`);
//                       }
//                     }}
//                   />
//                 )}
//               </div>
//               <div>
//         <h3 className="font-medium">Select Car Location</h3>
//         <LocationPicker onSelectLocation={handleLocationSelect} />
//         {latitude && longitude && (
//           <p className="mt-2 text-sm text-gray-600">
//             Selected: {latitude.toFixed(6)}, {longitude.toFixed(6)}
//           </p>
//         )}
//       </div>
//             </div>

//             <div>
//               <InputField label="Brand" name="brand" type="text" onChange={handleChange} />
//               <InputField label="RC Book No" name="rcBookNo" type="text" onChange={handleChange} />
//               <InputField label="Expected Wage Daily" name="expectedWage" type="number" onChange={handleChange} />
//               <InputField label="Location" name="location" type="text" onChange={handleChange} />
              
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Car Video</label>
//                 {videoUploaded ? (
//                   <div className="flex items-center">
//                     <div className="bg-green-100 text-green-800 px-3 py-2 rounded-md w-full">
//                       Video uploaded successfully!
//                     </div>
//                     <button 
//                       type="button"
//                       onClick={() => {
//                         setVideoUploaded(false);
//                         setFormData(prev => ({ ...prev, videos: [] }));
//                       }}
//                       className="ml-2 text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded"
//                     >
//                       Reset
//                     </button>
//                   </div>
//                 ) : (
//                   <FileUpload 
//                     accept="video/*"
//                     multiple={false}
//                     maxFiles={1}
//                     onUploadComplete={(uploadedUrl) => {
//                       if (typeof uploadedUrl === 'string') {
//                         setFormData(prev => ({ ...prev, videos: [uploadedUrl] }));
//                         setVideoUploaded(true);
//                         toast.success('Video uploaded successfully!');
//                       }
//                     }}
//                   />
//                 )}
//               </div>

//             </div>
//           </div>

//           <div className="flex justify-end space-x-4 mt-8 pt-4 border-t border-gray-100">
//             <button
//               type="button"
//               onClick={onClose}
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
//               {isSubmitting ? 'Adding...' : 'Add Car'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>,
//     document.body
//   );
// };

// export default AddNewCarModal;





import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import InputField from '@/components/InputField';
import FileUpload from '@/components/FileUpload';
import { Car,CarFormData } from '@/types/authTypes';
import { OwnerAuthService } from '@/services/carOwner/authService';
import toast from 'react-hot-toast';
import { carSchema } from '@/lib/validation';
import LocationPicker from "@/components/maps/LocationPicker";
import { MapPin } from 'lucide-react';
import { transformGeoCoordinates } from '@/utils/transformGeoCoordinates';

interface AddNewCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCarAdded?: (car: Car) => void; 
  onAddCar?: (carData: CarFormData) => Promise<void>;
}

const AddNewCarModal: React.FC<AddNewCarModalProps> = ({ isOpen, onClose, onCarAdded}) => {
  const [formData, setFormData] = useState<CarFormData>({
    carName: '',
    brand: '',
    year: '',
    fuelType: '',
    carType:'',
    rcBookNo: '',
    expectedWage: '',
    location: {
      address: '',
      landmark: '',
      coordinates: {
        lat: null,
        lng: null
      }
    },
    images: [],
    videos: [],
    rcBookProof:'',
    insuranceProof:''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [imagesUploaded, setImagesUploaded] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  
  // Fuel type options
  const fuelTypes = [
    "Petrol",
    "Diesel",
    "Electric",
    "Hybrid",
    
  ];
 
  const carTypes=[
    "Sedan",
    "SUV",
    "Hatchback",
    "VAN/MUV"
  ]
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleLocationSelect = (lat: number, lng: number) => {
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates: {
          lat,
          lng
        }
      }
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested location fields
    if (name === 'address' || name === 'landmark') {
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: value
        }
      }));
    } else {
      // Handle other fields
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
   const handleFileInsuranceUpload = async (uploadedUrl: string | string[]) => {
      if (typeof uploadedUrl === "string") {
        setFormData((prev) => ({ ...prev, insuranceProof: uploadedUrl }));
        toast.success("Insurance Proof uploaded successfully!");
      }
    };
     const handleFileRCUpload = async (uploadedUrl: string | string[]) => {
      if (typeof uploadedUrl === "string") {
        setFormData((prev) => ({ ...prev, rcBookProof: uploadedUrl }));
        toast.success("RC BOOK Proof uploaded successfully!");
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log(formData.location.coordinates.lat, formData.location.coordinates.lng)
    // Check if location coordinates are selected
    if (!formData.location.coordinates.lat || !formData.location.coordinates.lng) {
      toast.error("Please select a location for the car on the map");
      return;
    }

    setIsSubmitting(true);

    try {
      // Validate the data
      const result = carSchema.safeParse(formData);
      if (!result.success) {
        const errorMessages = result.error.errors.map((err) => err.message).join(", ");
        toast.error(errorMessages);
        return;
      }

    //       const addedCar = await OwnerAuthService.addCar(formData); // <-- backend response

    // // Call the callback to update page state
    // if (onCarAdded) {
    //   console.log(addedCar)
    //   console.log(formData)
    //   const formattedCar = transformGeoCoordinates(addedCar); // optional
    //   onCarAdded(formattedCar);
    // }
    //   // // Send data to the backend
    //   // await OwnerAuthService.addCar(formData);
      
    //   // if (onAddCar) {
    //   //   await onAddCar(formData);
    //   // }


    const response = await OwnerAuthService.addCar(formData);
      console.log("Backend response:", response);

      // Check if response has the car data
      if (response && response.car && onCarAdded) {
        // Transform the coordinates if needed
        const formattedCar = transformGeoCoordinates(response.car);
        console.log("Formatted car:", formattedCar);
        
        // Call the callback to update page state
        onCarAdded(formattedCar);
      }
  
      toast.success('Car added successfully!');
    
   
      setFormData({
        carName: '',
        brand: '',
        year: '',
        fuelType: '',
        carType:'',
        rcBookNo: '',
        expectedWage: '',
        location: {
          address: '',
          landmark: '',
          coordinates: {
            lat: null,
            lng: null
          }
        },
        images: [],
        videos: [],
        insuranceProof:'',
        rcBookProof:''
      });
      
  
      setImagesUploaded(false);
      setVideoUploaded(false);
      

      onClose();
    } catch (error) {
      console.error('Error adding new car:', error);
      toast.error('Failed to add new car. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!isOpen || !mounted) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-blue-100 rounded-xl shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Add New Car</h2>
          <button 
            type="button" 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold hover:bg-gray-100 h-8 w-8 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg shadow-sm">
 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <InputField label="Car Name" name="carName" type="text" onChange={handleChange} />
              <InputField label="Manufacturing Year" name="year" type="number" onChange={handleChange} />
              

              <div className="mb-4">
                <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Type
                </label>
                <select
                  id="fuelType"
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  
                >
                  <option value="" disabled>Select fuel type</option>
                  {fuelTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            

            <div className="mb-4">
                <label htmlFor="carType" className="block text-sm font-medium text-gray-700 mb-1">
                  Car Type
                </label>
                <select
                  id="carType"
                  name="carType"
                  value={formData.carType}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  
                >
                  <option value="" disabled>Select car type</option>
                  {carTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <InputField label="Brand" name="brand" type="text" onChange={handleChange} />
              <InputField label="RC Book No" name="rcBookNo" type="text" onChange={handleChange} />
              <InputField label="Expected Wage Daily" name="expectedWage" type="number" onChange={handleChange} />
            </div>
          </div>

          {/* Location section - Full width */}
          <div className="mb-6 border-t border-gray-100 pt-6">
            <h3 className="text-lg font-semibold mb-4">Car Location</h3>
            
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <InputField 
                label="Area/City" 
                name="address" 
                type="text" 
                onChange={handleChange} 
                value={formData.location.address}
              />
              <InputField 
                label="Landmark" 
                name="landmark" 
                type="text" 
                onChange={handleChange} 
                value={formData.location.landmark}
                placeholder="Nearby landmark (e.g., opposite to mall)"
              />
            </div> */}

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pin Location on Map <span className="text-red-500">*</span>
              </label>
              <div className="h-72 w-full rounded-lg overflow-hidden border border-gray-300">
                {/* <LocationPicker onSelectLocation={handleLocationSelect} /> */}
                <LocationPicker
  onSelectLocation={(lat, lng, address, landmark) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates: { lat, lng },
        address: address || "",
        

      },
    }));
  }}
/>

              </div>

              {formData.location.coordinates.lat && formData.location.coordinates.lng && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected coordinates: {formData.location.coordinates.lat.toFixed(6)}, {formData.location.coordinates.lng.toFixed(6)}
                </p>
              )}
              {formData.location.address && (
  <p className="text-sm text-gray-500">
    <MapPin className="w-4 h-4 text-gray-500 inline-block mr-1" /> {formData.location.address}
  </p>
)}
 {formData.location.landmark && (
  <p className="text-sm text-gray-500">
    <MapPin className="w-4 h-4 text-gray-500 inline-block mr-1" /> {formData.location.landmark}
  </p>
)}
 {formData.location.coordinates && (
 <InputField 
                label="Landmark" 
                name="landmark" 
                type="text" 
                onChange={handleChange} 
                value={formData.location.landmark}
                placeholder="Nearby landmark (e.g., opposite to mall)"
              />
            )}
            </div>
          </div>

          {/* Images and Video section */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 border-t border-gray-100 pt-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Car Images</label>
              {imagesUploaded ? (
                <div className="flex items-center">
                  <div className="bg-green-100 text-green-800 px-3 py-2 rounded-md w-full">
                    Images uploaded successfully! ({formData.images.length} images)
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      setImagesUploaded(false);
                      setFormData(prev => ({ ...prev, images: [] }));
                    }}
                    className="ml-2 text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded"
                  >
                    Reset
                  </button>
                </div>
              ) : (
                <FileUpload 
                  accept="image/*"
                  multiple={true}
                  maxFiles={5}
                  onUploadComplete={(uploadedUrls) => {
                    if (Array.isArray(uploadedUrls) && uploadedUrls.length > 0) {
                      setFormData(prev => ({ ...prev, images: uploadedUrls }));
                      setImagesUploaded(true);
                      toast.success(`${uploadedUrls.length} image(s) uploaded successfully!`);
                    }
                  }}
                />
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Car Video</label>
              {videoUploaded ? (
                <div className="flex items-center">
                  <div className="bg-green-100 text-green-800 px-3 py-2 rounded-md w-full">
                    Video uploaded successfully!
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      setVideoUploaded(false);
                      setFormData(prev => ({ ...prev, videos: [] }));
                    }}
                    className="ml-2 text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded"
                  >
                    Reset
                  </button>
                </div>
              ) : (
                <FileUpload 
                  accept="video/*"
                  multiple={false}
                  maxFiles={1}
                  onUploadComplete={(uploadedUrl) => {
                    if (typeof uploadedUrl === 'string') {
                      setFormData(prev => ({ ...prev, videos: [uploadedUrl] }));
                      setVideoUploaded(true);
                      toast.success('Video uploaded successfully!');
                    }
                  }}
                />
              )}
            </div>
          </div> */}
          
          // Updated parent component logic
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 border-t border-gray-100 pt-6">
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">Car Images</label>
    
    {/* Show uploaded images preview if any */}
    {formData.images.length > 0 && (
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-green-800 text-sm font-medium">
            {formData.images.length} image(s) uploaded ({5 - formData.images.length} remaining)
          </span>
          <button 
            type="button"
            onClick={() => {
              setFormData(prev => ({ ...prev, images: [] }));
              toast.success('Images reset!');
            }}
            className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded"
          >
            Reset All
          </button>
        </div>
        
        {/* Image previews grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {formData.images.map((imageUrl, index) => (
            <div key={index} className="relative group border rounded-lg overflow-hidden shadow-sm bg-gray-50">
              <img
                src={imageUrl}
                alt={`Car image ${index + 1}`}
                className="w-full h-24 object-cover"
              />
              
              {/* Individual image remove button */}
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    images: prev.images.filter((_, i) => i !== index)
                  }));
                  toast.success('Image removed!');
                }}
                className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title={`Remove image ${index + 1}`}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Image number indicator */}
              <div className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-xs px-1 rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
    
    {/* Show upload component if not at max capacity */}
    {formData.images.length < 5 && (
      <FileUpload 
        accept="image/*"
        multiple={true}
        maxFiles={5 - formData.images.length} // Adjust max files based on already uploaded
        onUploadComplete={(uploadedUrls) => {
          if (Array.isArray(uploadedUrls) && uploadedUrls.length > 0) {
            setFormData(prev => ({ 
              ...prev, 
              images: [...prev.images, ...uploadedUrls] // Append to existing images
            }));
            toast.success(`${uploadedUrls.length} image(s) uploaded successfully!`);
          }
        }}
      />
    )}
    
    {/* Show completion message when at max capacity */}
    {formData.images.length >= 5 && (
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-blue-800 text-sm">
        Maximum images uploaded (5/5). Use Reset All to start over.
      </div>
    )}
  </div>

  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">Car Video</label>
    {formData.videos.length > 0 ? (
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-green-800 text-sm font-medium">Video uploaded successfully!</span>
          <button 
            type="button"
            onClick={() => {
              setFormData(prev => ({ ...prev, videos: [] }));
              toast.success('Video reset!');
            }}
            className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded"
          >
            Reset
          </button>
        </div>
        
        {/* Video preview */}
        <div className="border rounded-lg overflow-hidden shadow-sm bg-gray-50">
          <video
            src={formData.videos[0]}
            controls
            className="w-full h-48 object-cover"
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    ) : (
      <FileUpload 
        accept="video/*"
        multiple={false}
        maxFiles={1}
        onUploadComplete={(uploadedUrl) => {
          if (typeof uploadedUrl === 'string') {
            setFormData(prev => ({ ...prev, videos: [uploadedUrl] }));
            toast.success('Video uploaded successfully!');
          }
        }}
      />
    )}
  </div>
</div>
           <div>
                    <label className="block text-gray-700">Upload Insurance Proof *</label>
                    <FileUpload accept="image/*,application/pdf" multiple={false} onUploadComplete={handleFileInsuranceUpload} />
                    {formData.insuranceProof && <p className="text-green-600 mt-1">File uploaded successfully.</p>}
                  </div>
          

            <div>
                    <label className="block text-gray-700">Upload RCBook  Proof *</label>
                    <FileUpload accept="image/*,application/pdf" multiple={false} onUploadComplete={handleFileRCUpload} />
                    {formData.rcBookProof && <p className="text-green-600 mt-1">File uploaded successfully.</p>}
                  </div>
          


          <div className="flex justify-end space-x-4 mt-8 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition-colors font-medium"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Car'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default AddNewCarModal;


// import React, { useState, useEffect } from 'react';
// import { createPortal } from 'react-dom';
// import InputField from '@/components/InputField';
// import FileUpload from '@/components/FileUpload';
// import { CarFormData } from '@/types/authTypes';
// import { OwnerAuthService } from '@/services/carOwner/authService';
// import toast from 'react-hot-toast';
// import { carSchema } from '@/lib/validation';
// import LocationPicker from "@/components/maps/LocationPicker";
// import { MapPin, Car, FileText, Camera, MapIcon } from 'lucide-react';

// interface AddNewCarModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onAddCar?: (carData: CarFormData) => Promise<void>;
// }

// const AddNewCarModal: React.FC<AddNewCarModalProps> = ({ isOpen, onClose, onAddCar }) => {
//   const [formData, setFormData] = useState<CarFormData>({
//     carName: '',
//     brand: '',
//     year: '',
//     fuelType: '',
//     rcBookNo: '',
//     expectedWage: '',
//     location: {
//       address: '',
//       landmark: '',
//       coordinates: {
//         lat: null,
//         lng: null
//       }
//     },
//     images: [],
//     videos: [],
//     rcbookProof: '',
//     insuranceProof: ''
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [activeTab, setActiveTab] = useState('basic'); // Tab state
//   const [uploadStates, setUploadStates] = useState({
//     images: false,
//     video: false,
//     insurance: false,
//     rcbook: false
//   });

//   const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];

//   useEffect(() => {
//     setMounted(true);
//     return () => setMounted(false);
//   }, []);

//   const handleLocationSelect = (lat: number, lng: number, address?: string, landmark?: string) => {
//     setFormData(prev => ({
//       ...prev,
//       location: {
//         ...prev.location,
//         coordinates: { lat, lng },
//         address: address || prev.location.address,
//         landmark: landmark || prev.location.landmark
//       }
//     }));
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
    
//     if (name === 'address' || name === 'landmark') {
//       setFormData(prev => ({
//         ...prev,
//         location: {
//           ...prev.location,
//           [name]: value
//         }
//       }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleInsuranceUpload = async (uploadedUrl: string | string[]) => {
//     if (typeof uploadedUrl === 'string') {
//       setFormData(prev => ({ ...prev, insuranceProof: uploadedUrl }));
//       setUploadStates(prev => ({ ...prev, insurance: true }));
//       toast.success("Insurance proof uploaded successfully!");
//     }
//   };

//   const handleRCBookUpload = async (uploadedUrl: string | string[]) => {
//     if (typeof uploadedUrl === 'string') {
//       setFormData(prev => ({ ...prev, rcbookProof: uploadedUrl }));
//       setUploadStates(prev => ({ ...prev, rcbook: true }));
//       toast.success("RC Book proof uploaded successfully!");
//     }
//   };

//   const handleImagesUpload = async (uploadedUrl: string | string[]) => {
//     if (Array.isArray(uploadedUrl)) {
//       setFormData(prev => ({ ...prev, images: uploadedUrl }));
//       setUploadStates(prev => ({ ...prev, images: true }));
//       toast.success(`${uploadedUrl.length} image(s) uploaded successfully!`);
//     }
//   };

//   const handleVideoUpload = async (uploadedUrl: string | string[]) => {
//     if (typeof uploadedUrl === 'string') {
//       setFormData(prev => ({ ...prev, videos: [uploadedUrl] }));
//       setUploadStates(prev => ({ ...prev, video: true }));
//       toast.success("Video uploaded successfully!");
//     }
//   };

//   const resetInsuranceUpload = () => {
//     setUploadStates(prev => ({ ...prev, insurance: false }));
//     setFormData(prev => ({ ...prev, insuranceProof: '' }));
//   };

//   const resetRCBookUpload = () => {
//     setUploadStates(prev => ({ ...prev, rcbook: false }));
//     setFormData(prev => ({ ...prev, rcbookProof: '' }));
//   };

//   const resetImagesUpload = () => {
//     setUploadStates(prev => ({ ...prev, images: false }));
//     setFormData(prev => ({ ...prev, images: [] }));
//   };

//   const resetVideoUpload = () => {
//     setUploadStates(prev => ({ ...prev, video: false }));
//     setFormData(prev => ({ ...prev, videos: [] }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!formData.location.coordinates.lat || !formData.location.coordinates.lng) {
//       toast.error("Please select a location for the car on the map");
//       setActiveTab('location');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const result = carSchema.safeParse(formData);
//       if (!result.success) {
//         const errorMessages = result.error.errors.map((err) => err.message).join(", ");
//         toast.error(errorMessages);
//         return;
//       }

//       await OwnerAuthService.addCar(formData);
//       toast.success('Car added successfully!');
      
//       // Reset form
//       setFormData({
//         carName: '',
//         brand: '',
//         year: '',
//         fuelType: '',
//         rcBookNo: '',
//         expectedWage: '',
//         location: {
//           address: '',
//           landmark: '',
//           coordinates: { lat: null, lng: null }
//         },
//         images: [],
//         videos: [],
//         insuranceProof: '',
//         rcbookProof: ''
//       });
      
//       setUploadStates({
//         images: false,
//         video: false,
//         insurance: false,
//         rcbook: false
//       });
      
//       setActiveTab('basic');
//       onClose();
//     } catch (error) {
//       console.error('Error adding new car:', error);
//       toast.error('Failed to add new car. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!isOpen || !mounted) {
//     return null;
//   }

//   return createPortal(
//     <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        
//         {/* Header */}
//         <div className="flex justify-between items-center p-6 border-b border-gray-200">
//           <h2 className="text-2xl font-bold text-gray-800">Add New Car</h2>
//           <button 
//             type="button" 
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 text-2xl font-bold hover:bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center transition-colors"
//             aria-label="Close"
//           >
//             ×
//           </button>
//         </div>

//         {/* Tab Navigation */}
//         <div className="flex border-b border-gray-200 px-6">
//           {[
//             { id: 'basic', label: 'Basic Info', icon: Car },
//             { id: 'location', label: 'Location', icon: MapIcon },
//             { id: 'media', label: 'Media', icon: Camera },
//             { id: 'documents', label: 'Documents', icon: FileText }
//           ].map(({ id, label, icon: Icon }) => (
//             <button
//               key={id}
//               type="button"
//               onClick={() => setActiveTab(id)}
//               className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
//                 activeTab === id
//                   ? 'border-blue-500 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               <Icon size={18} />
//               <span className="font-medium">{label}</span>
//             </button>
//           ))}
//         </div>

//         {/* Tab Content */}
//         <div className="flex-1 overflow-hidden flex flex-col">
//           <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
//             <div className="flex-1 overflow-y-auto p-6">
            
//             {/* Basic Info Tab */}
//             {activeTab === 'basic' && (
//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     <InputField label="Car Name" name="carName" type="text" onChange={handleChange} value={formData.carName} />
//                     <InputField label="Brand" name="brand" type="text" onChange={handleChange} value={formData.brand} />
//                     <InputField label="Manufacturing Year" name="year" type="number" onChange={handleChange} value={formData.year} />
//                   </div>
//                   <div className="space-y-4">
//                     <div>
//                       <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">
//                         Fuel Type
//                       </label>
//                       <select
//                         id="fuelType"
//                         name="fuelType"
//                         value={formData.fuelType}
//                         onChange={handleChange}
//                         className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         required
//                       >
//                         <option value="" disabled>Select fuel type</option>
//                         {fuelTypes.map((type) => (
//                           <option key={type} value={type}>{type}</option>
//                         ))}
//                       </select>
//                     </div>
//                     <InputField label="RC Book No" name="rcBookNo" type="text" onChange={handleChange} value={formData.rcBookNo} />
//                     <InputField label="Expected Daily Wage" name="expectedWage" type="number" onChange={handleChange} value={formData.expectedWage} />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Location Tab */}
//             {activeTab === 'location' && (
//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                   <InputField 
//                     label="Area/City" 
//                     name="address" 
//                     type="text" 
//                     onChange={handleChange} 
//                     value={formData.location.address}
//                   />
//                   <InputField 
//                     label="Landmark" 
//                     name="landmark" 
//                     type="text" 
//                     onChange={handleChange} 
//                     value={formData.location.landmark}
//                     placeholder="Nearby landmark (e.g., opposite to mall)"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Pin Location on Map <span className="text-red-500">*</span>
//                   </label>
//                   <div className="h-80 w-full rounded-lg overflow-hidden border border-gray-300">
//                     <LocationPicker onSelectLocation={handleLocationSelect} />
//                   </div>
                  
//                   {formData.location.coordinates.lat && formData.location.coordinates.lng && (
//                     <div className="mt-3 p-3 bg-green-50 rounded-lg">
//                       <p className="text-sm text-green-800 flex items-center">
//                         <MapPin className="w-4 h-4 mr-2" />
//                         Location selected: {formData.location.coordinates.lat.toFixed(6)}, {formData.location.coordinates.lng.toFixed(6)}
//                       </p>
//                       {formData.location.address && (
//                         <p className="text-sm text-green-700 mt-1">Address: {formData.location.address}</p>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Media Tab */}
//             {activeTab === 'media' && (
//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Car Images</label>
//                     {uploadStates.images ? (
//                       <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
//                         <span className="text-green-800">
//                           {formData.images.length} image(s) uploaded successfully!
//                         </span>
//                         <button 
//                           type="button"
//                           onClick={resetImagesUpload}
//                           className="text-sm bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded"
//                         >
//                           Reset
//                         </button>
//                       </div>
//                     ) : (
//                       <FileUpload 
//                         accept="image/*"
//                         multiple={true}
//                         maxFiles={5}
//                         onUploadComplete={handleImagesUpload}
//                       />
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Car Video</label>
//                     {uploadStates.video ? (
//                       <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
//                         <span className="text-green-800">Video uploaded successfully!</span>
//                         <button 
//                           type="button"
//                           onClick={resetVideoUpload}
//                           className="text-sm bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded"
//                         >
//                           Reset
//                         </button>
//                       </div>
//                     ) : (
//                       <FileUpload 
//                         accept="video/*"
//                         multiple={false}
//                         maxFiles={1}
//                         onUploadComplete={handleVideoUpload}
//                       />
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Documents Tab */}
//             {activeTab === 'documents' && (
//               <div className="space-y-12"> {/* Increased spacing between sections */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Split into two columns on larger screens */}
//                   {/* Insurance Proof Section */}
//                   <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 shadow-sm"> {/* Added shadow for depth */}
//                     <label className="block text-lg font-semibold text-gray-800 mb-3">
//                       📄 Insurance Proof <span className="text-red-500">*</span>
//                     </label>
//                     <p className="text-sm text-gray-600 mb-4">Upload your car insurance document (PDF or Image)</p>
//                     {uploadStates.insurance ? (
//                       <div className="flex items-center justify-between p-4 bg-green-50 border border-green-300 rounded-lg">
//                         <div className="flex items-center space-x-2">
//                           <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                           <span className="text-green-800 font-medium">Insurance proof uploaded successfully!</span>
//                         </div>
//                         <button 
//                           type="button"
//                           onClick={resetInsuranceUpload}
//                           className="text-sm bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded font-medium"
//                         >
//                           Remove & Re-upload
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 bg-white"> {/* White background for contrast */}
//                         <FileUpload 
//                           accept="image/*,application/pdf" 
//                           multiple={false} 
//                           onUploadComplete={handleInsuranceUpload} 
//                         />
//                       </div>
//                     )}
//                   </div>

//                   {/* RC Book Proof Section */}
//                   <div className="bg-orange-50 p-6 rounded-lg border border-orange-200 shadow-sm"> {/* Added shadow for depth */}
//                     <label className="block text-lg font-semibold text-gray-800 mb-3">
//                       📋 RC Book Proof <span className="text-red-500">*</span>
//                     </label>
//                     <p className="text-sm text-gray-600 mb-4">Upload your RC Book document (PDF or Image)</p>
//                     {uploadStates.rcbook ? (
//                       <div className="flex items-center justify-between p-4 bg-green-50 border border-green-300 rounded-lg">
//                         <div className="flex items-center space-x-2">
//                           <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                           <span className="text-green-800 font-medium">RC Book proof uploaded successfully!</span>
//                         </div>
//                         <button 
//                           type="button"
//                           onClick={resetRCBookUpload}
//                           className="text-sm bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded font-medium"
//                         >
//                           Remove & Re-upload
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="border-2 border-dashed border-orange-300 rounded-lg p-4 bg-white"> {/* White background for contrast */}
//                         <FileUpload 
//                           accept="image/*,application/pdf" 
//                           multiple={false} 
//                           onUploadComplete={handleRCBookUpload} 
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//             </div>

//             {/* Footer - Navigation */}
//             <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50 mt-auto">
//               <div className="flex space-x-2">
//                 {activeTab !== 'basic' && (
//                   <button
//                     type="button"
//                     onClick={() => {
//                       const tabs = ['basic', 'location', 'media', 'documents'];
//                       const currentIndex = tabs.indexOf(activeTab);
//                       setActiveTab(tabs[currentIndex - 1]);
//                     }}
//                     className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
//                     disabled={isSubmitting}
//                   >
//                     Previous
//                   </button>
//                 )}
//                 {activeTab !== 'documents' && (
//                   <button
//                     type="button"
//                     onClick={() => {
//                       const tabs = ['basic', 'location', 'media', 'documents'];
//                       const currentIndex = tabs.indexOf(activeTab);
//                       setActiveTab(tabs[currentIndex + 1]);
//                     }}
//                     className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
//                     disabled={isSubmitting}
//                   >
//                     Next
//                   </button>
//                 )}
//               </div>
              
//               <div className="flex space-x-4">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors font-medium"
//                   disabled={isSubmitting}
//                 >
//                   Cancel
//                 </button>
//                 {/* Submit button only on last tab */}
//                 {activeTab === 'documents' && (
//                   <button
//                     type="submit"
//                     className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium disabled:opacity-50"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? 'Adding Car...' : 'Add Car'}
//                   </button>
//                 )}
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// };

// export default AddNewCarModal;