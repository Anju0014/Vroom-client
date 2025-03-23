// File: components/AddNewCarModal.tsx
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

// Define the car data interface
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

interface AddNewCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCar: (carData: CarFormData) => Promise<void>;
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
    videos: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  
  // Handle client-side mounting for portal
  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: Array.from(files)
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onAddCar(formData);
      // Reset form
      setFormData({
        carName: '',
        brand: '',
        year: '',
        fuelType: '',
        rcBookNo: '',
        expectedWage: '',
        location: '',
        images: [],
        videos: []
      });
      // Close modal
      onClose();
    } catch (error) {
      console.error('Error adding new car:', error);
      alert('Failed to add new car. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Form field component
  const FormField: React.FC<{
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
  }> = ({ label, name, type = "text", value, onChange, required = false }) => {
    return (
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  };
  
  // If not open or not mounted (client-side), don't render
  if (!isOpen || !mounted) {
    return null;
  }
  
  // Use portal to render modal outside of normal DOM hierarchy
  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-blue-200 rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Add New Car</h2>
          <button 
            type="button" 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              <FormField 
                label="Car Name" 
                name="carName"
                value={formData.carName}
                onChange={handleChange}
                required
              />
              
              <FormField 
                label="Manufacturing Year" 
                name="year" 
                type="number"
                value={formData.year}
                onChange={handleChange}
                required
              />
              
              <FormField 
                label="Fuel Type" 
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                required
              />
              
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Car Images</label>
                <input 
                  type="file" 
                  name="images"
                  onChange={handleFileChange}
                  accept="image/*"
                  multiple
                  className="block w-full text-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Car Videos</label>
                <input 
                  type="file" 
                  name="videos"
                  onChange={handleFileChange}
                  accept="video/*"
                  multiple
                  className="block w-full text-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            {/* Right Column */}
            <div>
              <FormField 
                label="Brand" 
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
              />
              
              <FormField 
                label="RC Book No" 
                name="rcBookNo"
                value={formData.rcBookNo}
                onChange={handleChange}
                required
              />
              
              <FormField 
                label="Expected Wage Daily" 
                name="expectedWage"
                type="number"
                value={formData.expectedWage}
                onChange={handleChange}
                required
              />
              
              <FormField 
                label="Location" 
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          {/* Form Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-6 py-2 rounded-md"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-md"
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