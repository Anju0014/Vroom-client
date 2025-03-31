import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import InputField from '@/components/InputField';
import FileUpload from '@/components/FileUpload';
import { CarFormData } from '@/types/authTypes';
import { OwnerAuthService } from '@/services/carOwner/authService';
import toast from 'react-hot-toast';

interface AddNewCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCar?: (carData: CarFormData) => Promise<void>;
}

const AddNewCarModal: React.FC<AddNewCarModalProps> = ({ isOpen, onClose, onAddCar }) => {
  const [formData, setFormData] = useState<CarFormData>({
    carName: '',
    brand: '',
    year: '',
    fuelType: '',
    rcBookNo: '',
    expectedWage: '',
    location: '',
    images: [],
    videos: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (formData.images.length === 0) {
      toast.error('Please upload at least one image of your car');
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Call the service to add car
      await OwnerAuthService.addCar(formData);
      
      // if (onAddCar) {
      //   await onAddCar(formData);
      // }

      // Show success toast
      toast.success('Car added successfully!');
      
    
      setFormData({
        carName: '',
        brand: '',
        year: '',
        fuelType: '',
        rcBookNo: '',
        expectedWage: '',
        location: '',
        images: [],
        videos: [],
      });
      
      // Close modal
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="">
              <InputField label="Car Name" name="carName" type="text"  onChange={handleChange} required />
              <InputField label="Manufacturing Year" name="year" type="number"  onChange={handleChange} required />
              <InputField label="Fuel Type" name="fuelType" type="text"  onChange={handleChange} required />

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Car Images</label>
                <FileUpload 
                  accept="image/*"
                  multiple={true}
                  maxFiles={5}
                  onUploadComplete={(uploadedUrls) => {
                    if (Array.isArray(uploadedUrls)) {
                      setFormData(prev => ({ ...prev, images: uploadedUrls }));
                    }
                  }}
                />
              </div>
            </div>

            <div>
              <InputField label="Brand" name="brand" type="text" onChange={handleChange} required />
              <InputField label="RC Book No" name="rcBookNo" type="text" onChange={handleChange} required />
              <InputField label="Expected Wage Daily" name="expectedWage" type="number"  onChange={handleChange} required />
              <InputField label="Location" name="location" type="text" onChange={handleChange} required />
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Car Video</label>
                <FileUpload 
                  accept="video/*"
                  multiple={false}
                  maxFiles={1}
                  onUploadComplete={(uploadedUrl) => {
                    if (typeof uploadedUrl === 'string') {
                      setFormData(prev => ({ ...prev, videos: [uploadedUrl] }));  // ✅ Store as an array
                    }
                  }}
                />
              </div>
            </div>
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

