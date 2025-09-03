

'use client';

import React, { useEffect, useState } from "react";
import { SimpleTable, TableColumn } from "@/components/admin/UserTable"; // Update import path
import { AdminAuthService } from "@/services/admin/adminService";
import toast from "react-hot-toast";
import CarVerifyModal from "@/components/admin/CarVerifyModal";
import { Car, CarVerifyProps } from '@/types/carTypes';

const CarVerifyPage: React.FC<CarVerifyProps> = ({ carType }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchCars();
  }, [carType]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      
      const response = await AdminAuthService.getAllCars();

      console.log("response back");
      if (!response || !response.data) throw new Error("Failed to fetch cars");

      const filteredCars = response.data
        .filter((car: any) => car.verifyStatus === 0 && !car.isDeleted)
        .map((car: any) => ({
          id: car._id,
          carName: car.carName,
          brand: car.brand,
          year: car.year,
          fuelType: car.fuelType,
          rcBookNo: car.rcBookNo,
          expectedWage: car.expectedWage,
          location: car.location,
          make: car.make,
          carModel: car.carModel,
          verifyStatus: car.verifyStatus,
          images: car.images,
          videos: car.videos || [],
          rcBookProof: car.rcBookProof,
          insuranceProof: car.insuranceProof,
          owner: car.owner,
          available: car.available,
          createdAt: new Date(car.createdAt),
          // Add formatted fields for table display
          locationAddress: car.location?.address ?? "No address",
          statusBadge: getStatusBadge(car.verifyStatus),
          formattedDate: formatDate(new Date(car.createdAt)),
        }));

      setCars(filteredCars);
    } catch (err) {
      setError("Error fetching cars");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCar = async (carId: string, reason?: string) => {
    try {
      setIsProcessing((prev) => ({ ...prev, [carId]: true }));
      
      const status = reason ? -1 : 1;
      console.log("reason:", status);
    
      const response = await AdminAuthService.updateCarVerifyStatus(
        carId, 
        status,
        reason
      );
      
      if (response) {
        setCars((prevCars) => 
          prevCars.filter((car) => car.id !== carId)
        );
        
        if (selectedCar && selectedCar.id === carId) {
          setSelectedCar(null);
        }
        
        toast.success(
          status === 1 
            ? "Car verified successfully" 
            : "Car rejected successfully"
        );
        
        fetchCars();
      }
    } catch (err) {
      setError(reason ? "Failed to reject car" : "Failed to verify car");
      console.error(err);
    } finally {
      setIsProcessing((prev) => ({ ...prev, [carId]: false }));
    }
  };

  const getStatusBadge = (verifyStatus: number) => {
    if (verifyStatus === 1) {
      return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Verified</span>;
    } else {
      return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span>;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

 
  const columns: TableColumn[] = [
    { header: "Car Name", key: "carName" },
    { header: "Brand", key: "brand" },
    { header: "Location", key: "locationAddress" },
    { header: "Status", key: "statusBadge" },
    { header: "Price/Day", key: "expectedWage" },
    { header: "Listed On", key: "formattedDate" },
  ];

  const handleViewCar = (car: Car) => {
    setSelectedCar(car);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Car Verification
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <SimpleTable
        columns={columns}
        data={cars}
        itemsPerPage={10}
        showViewButton={true}
        onView={handleViewCar}
      />

      {selectedCar && (
        <CarVerifyModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          onVerifyCar={handleVerifyCar}
        />
      )}
    </div>
  );
};

export default CarVerifyPage;