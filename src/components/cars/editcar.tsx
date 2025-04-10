// import React, { useState, useEffect } from 'react';
// import { createPortal } from 'react-dom';
// import InputField from '@/components/InputField';
// import FileUpload from '@/components/FileUpload';
// import { Car, CarFormData } from '@/types/authTypes';
// import toast from 'react-hot-toast';

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
//     rcBookNo: car.rcBookNo || '',
//     expectedWage: car.expectedWage || '',
//     location: car.location || '',
//     images: car.images || [],
//     videos: car.videos || [],
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [imagesUploaded, setImagesUploaded] = useState(car.images && car.images.length > 0);
//   const [videoUploaded, setVideoUploaded] = useState(car.videos && car.videos.length > 0);
  
//   useEffect(() => {
//     setMounted(true);
//     return () => setMounted(false);
//   }, []);

//   // Update form data when car prop changes
//   useEffect(() => {
//     setFormData({
//       carName: car.carName || '',
//       brand: car.brand || '',
//       year: car.year || '',
//       fuelType: car.fuelType || '',
//       rcBookNo: car.rcBookNo || '',
//       expectedWage: car.expectedWage || '',
//       location: car.location || '',
//       images: car.images || [],
//       videos: car.videos || [],
//     });
//     setImagesUploaded(car.images && car.images.length > 0);
//     setVideoUploaded(car.videos && car.videos.length > 0);
//   }, [car]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
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

//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Car Images</label>
//                 {imagesUploaded ? (
//                   <div className="flex items-center">
//                     <div className="bg-green-100 text-green-800 px-3 py-2 rounded-md w-full">
//                       Images uploaded ({formData.images.length} images)
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
              
//               <InputField 
//                 label="Location" 
//                 name="location" 
//                 type="text" 
//                 value={formData.location}
//                 onChange={handleChange} 
//               />
              
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



// import React, { useState, useEffect } from 'react';
// import { createPortal } from 'react-dom';
// import InputField from '@/components/InputField';
// import FileUpload from '@/components/FileUpload';
// import { Car, CarFormData } from '@/types/authTypes';
// import toast from 'react-hot-toast';

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
//     rcBookNo: car.rcBookNo || '',
//     expectedWage: car.expectedWage || '',
//     location: car.location || '',
//     images: car.images || [],
//     videos: car.videos || [],
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [mounted, setMounted] = useState(false);
  
//   useEffect(() => {
//     setMounted(true);
//     return () => setMounted(false);
//   }, []);

//   // Update form data when car prop changes
//   useEffect(() => {
//     setFormData({
//       carName: car.carName || '',
//       brand: car.brand || '',
//       year: car.year || '',
//       fuelType: car.fuelType || '',
//       rcBookNo: car.rcBookNo || '',
//       expectedWage: car.expectedWage || '',
//       location: car.location || '',
//       images: car.images || [],
//       videos: car.videos || [],
//     });
//   }, [car]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
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

//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Car Images</label>
//                 {formData.images.length > 0 ? (
//                   <div className="space-y-3">
//                     <div className="grid grid-cols-2 gap-2">
//                       {formData.images.map((imageUrl, index) => (
//                         <div key={index} className="relative group">
//                           <img 
//                             src={imageUrl} 
//                             alt={`Car image ${index + 1}`} 
//                             className="w-full h-32 object-cover rounded-md border border-gray-200"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => handleRemoveImage(index)}
//                             className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
//                             title="Remove image"
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-sm text-gray-600">{formData.images.length} {formData.images.length === 1 ? 'image' : 'images'}</span>
//                       {formData.images.length < 5 && (
//                         <FileUpload 
//                           accept="image/*"
//                           multiple={true}
//                           maxFiles={5 - formData.images.length}
//                           onUploadComplete={(uploadedUrls) => {
//                             if (Array.isArray(uploadedUrls) && uploadedUrls.length > 0) {
//                               setFormData(prev => ({ 
//                                 ...prev, 
//                                 images: [...prev.images, ...uploadedUrls] 
//                               }));
//                               toast.success(`${uploadedUrls.length} image(s) added!`);
//                             }
//                           }}
//                         >
//                           <button 
//                             type="button" 
//                             className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded"
//                           >
//                             Add more
//                           </button>
//                         </FileUpload>
//                       )}
//                     </div>
//                   </div>
//                 ) : (
//                   <FileUpload 
//                     accept="image/*"
//                     multiple={true}
//                     maxFiles={5}
//                     onUploadComplete={(uploadedUrls) => {
//                       if (Array.isArray(uploadedUrls) && uploadedUrls.length > 0) {
//                         setFormData(prev => ({ ...prev, images: uploadedUrls }));
//                         toast.success(`${uploadedUrls.length} image(s) uploaded successfully!`);
//                       }
//                     }}
//                   />
//                 )}
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
              
//               <InputField 
//                 label="Location" 
//                 name="location" 
//                 type="text" 
//                 value={formData.location}
//                 onChange={handleChange} 
//               />
              
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Car Video</label>
//                 {formData.videos.length > 0 ? (
//                   <div className="space-y-3">
//                     <div className="relative group">
//                       <video 
//                         src={formData.videos[0]} 
//                         controls
//                         className="w-full h-48 object-cover rounded-md border border-gray-200"
//                       />
//                       <button
//                         type="button"
//                         onClick={handleRemoveVideo}
//                         className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
//                         title="Remove video"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <FileUpload 
//                     accept="video/*"
//                     multiple={false}
//                     maxFiles={1}
//                     onUploadComplete={(uploadedUrl) => {
//                       if (typeof uploadedUrl === 'string') {
//                         setFormData(prev => ({ ...prev, videos: [uploadedUrl] }));
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






import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import InputField from '@/components/InputField';
import FileUpload from '@/components/FileUpload';
import { Car, CarFormData } from '@/types/authTypes';
import toast from 'react-hot-toast';

interface EditCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: Car;
  onUpdateCar: (carData: CarFormData) => Promise<void>;
}

const EditCarModal: React.FC<EditCarModalProps> = ({ isOpen, onClose, car, onUpdateCar }) => {
  const [formData, setFormData] = useState<CarFormData>({
    carName: car.carName || '',
    brand: car.brand || '',
    year: car.year || '',
    fuelType: car.fuelType || '',
    rcBookNo: car.rcBookNo || '',
    expectedWage: car.expectedWage || '',
    location: car.location || '',
    images: car.images || [],
    videos: car.videos || [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Reset form data whenever the modal opens or car changes
  useEffect(() => {
    // Only reset when the modal is open to ensure fresh data
    if (isOpen) {
      setFormData({
        carName: car.carName || '',
        brand: car.brand || '',
        year: car.year || '',
        fuelType: car.fuelType || '',
        rcBookNo: car.rcBookNo || '',
        expectedWage: car.expectedWage || '',
        location: car.location || '',
        images: car.images || [],
        videos: car.videos || [],
      });
    }
  }, [car, isOpen]);

  // Handle cancellation - also reset form data to original values
  const handleCancel = () => {
    // Reset form data to original values from car prop
    setFormData({
      carName: car.carName || '',
      brand: car.brand || '',
      year: car.year || '',
      fuelType: car.fuelType || '',
      rcBookNo: car.rcBookNo || '',
      expectedWage: car.expectedWage || '',
      location: car.location || '',
      images: car.images || [],
      videos: car.videos || [],
    });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);

    try {
      await  onUpdateCar(formData);
      toast.success('Car updated successfully!');
      onClose();
    } catch (error) {
      console.error('Error updating car:', error);
      toast.error('Failed to update car. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleRemoveVideo = () => {
    setFormData(prev => ({
      ...prev,
      videos: []
    }));
  };
  
  if (!isOpen || !mounted) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-blue-100 rounded-xl shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Edit Car Details</h2>
          <button 
            type="button" 
            onClick={handleCancel}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold hover:bg-gray-100 h-8 w-8 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="">
              {/* Car Name - Disabled */}
              <div className="mb-4">
                <label htmlFor="carName" className="block text-sm font-medium text-gray-700 mb-1">
                  Car Name
                </label>
                <input
                  type="text"
                  id="carName"
                  name="carName"
                  value={formData.carName}
                  disabled
                  className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">Car name cannot be changed</p>
              </div>
              
              <InputField 
                label="Manufacturing Year" 
                name="year" 
                type="number" 
                value={formData.year}
                onChange={handleChange}
                disabled
              />
              
              {/* Fuel Type - Disabled */}
              <div className="mb-4">
                <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Type
                </label>
                <input
                  type="text"
                  id="fuelType"
                  name="fuelType"
                  value={formData.fuelType}
                  disabled
                  className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">Fuel type cannot be changed</p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Car Images</label>
                {formData.images.length > 0 ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      {formData.images.map((imageUrl, index) => (
                        <div key={`${imageUrl}-${index}`} className="relative group">
                          <img 
                            src={imageUrl} 
                            alt={`Car image ${index + 1}`} 
                            className="w-full h-32 object-cover rounded-md border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove image"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{formData.images.length} {formData.images.length === 1 ? 'image' : 'images'}</span>
                      {formData.images.length < 5 && (
                        <FileUpload 
                          accept="image/*"
                          multiple={true}
                          maxFiles={5 - formData.images.length}
                          onUploadComplete={(uploadedUrls) => {
                            if (Array.isArray(uploadedUrls) && uploadedUrls.length > 0) {
                              setFormData(prev => ({ 
                                ...prev, 
                                images: [...prev.images, ...uploadedUrls] 
                              }));
                              toast.success(`${uploadedUrls.length} image(s) added!`);
                            }
                          }}
                        >
                          <button 
                            type="button" 
                            className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded"
                          >
                            Add more
                          </button>
                        </FileUpload>
                      )}
                    </div>
                  </div>
                ) : (
                  <FileUpload 
                    accept="image/*"
                    multiple={true}
                    maxFiles={5}
                    onUploadComplete={(uploadedUrls) => {
                      if (Array.isArray(uploadedUrls) && uploadedUrls.length > 0) {
                        setFormData(prev => ({ ...prev, images: uploadedUrls }));
                        toast.success(`${uploadedUrls.length} image(s) uploaded successfully!`);
                      }
                    }}
                  />
                )}
              </div>
            </div>

            <div>
              <InputField 
                label="Brand" 
                name="brand" 
                type="text" 
                value={formData.brand}
                onChange={handleChange} 
              />
              
              {/* RC Book No - Disabled */}
              <div className="mb-4">
                <label htmlFor="rcBookNo" className="block text-sm font-medium text-gray-700 mb-1">
                  RC Book No
                </label>
                <input
                  type="text"
                  id="rcBookNo"
                  name="rcBookNo"
                  value={formData.rcBookNo}
                  disabled
                  className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">RC Book No cannot be changed</p>
              </div>
              
              <InputField 
                label="Expected Wage Daily" 
                name="expectedWage" 
                type="number" 
                value={formData.expectedWage}
                onChange={handleChange} 
              />
              
              <InputField 
                label="Location" 
                name="location" 
                type="text" 
                value={formData.location}
                onChange={handleChange} 
              />
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Car Video</label>
                {formData.videos && formData.videos.length > 0 ? (
                  <div className="space-y-3">
                    <div className="relative group">
                      <video 
                        src={formData.videos[0]} 
                        controls
                        className="w-full h-48 object-cover rounded-md border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveVideo}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove video"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
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
                      } else if (Array.isArray(uploadedUrl) && uploadedUrl.length > 0) {
                        // Handle case where FileUpload might return an array even for single file
                        setFormData(prev => ({ ...prev, videos: [uploadedUrl[0]] }));
                        toast.success('Video uploaded successfully!');
                      }
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleCancel}
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
              {isSubmitting ? 'Updating...' : 'Update Car'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default EditCarModal;