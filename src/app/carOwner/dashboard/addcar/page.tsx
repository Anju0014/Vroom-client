// File: pages/cars/add-new.tsx


"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';

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

const AddNewCarPage: React.FC = () => {
  const router = useRouter();
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
      // Create FormData for file uploads
      const submitData = new FormData();
      
      // Add form fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'images' && key !== 'videos') {
          submitData.append(key, value);
        }
      });
      
      // Add images
      formData.images.forEach((image, index) => {
        submitData.append(`images[${index}]`, image);
      });
      
      // Add videos
      formData.videos.forEach((video, index) => {
        submitData.append(`videos[${index}]`, video);
      });
      
      // Send to API endpoint
      const response = await fetch('/api/cars', {
        method: 'POST',
        body: submitData,
      });
      
      if (response.ok) {
        // Redirect to cars list
        router.push('/cars');
      } else {
        throw new Error('Failed to save car data');
      }
    } catch (error) {
      console.error('Error adding new car:', error);
      alert('Failed to add new car. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    router.push('/cars');
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
  
  return (
    <>
      <Head>
        <title>Add New Car | Car Management System</title>
        <meta name="description" content="Add a new car to your fleet" />
      </Head>
      
      <div className="min-h-screen bg-blue-100">
        <div className="container mx-auto p-4">
          <div className="bg-blue-200 rounded-lg p-8 max-w-3xl mx-auto my-8">
            <h2 className="text-2xl font-semibold text-center mb-6">Add New Car</h2>
            
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
                  onClick={handleCancel}
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
        </div>
      </div>
    </>
  );
};

export default AddNewCarPage;