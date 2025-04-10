'use client';

import React, { useEffect, useState } from "react";
import { DataTable, Column } from "@/components/admin/UserTable";
import { AdminAuthService } from "@/services/admin/adminService";
import toast from "react-hot-toast";
import CarVerifyModal from "@/components/admin/CarVerifyModal";
import { Eye } from "lucide-react";

interface Car {
  id: string;
  carName: string;
  brand: string;
  year?: string;
  fuelType?: string;
  rcBookNo?: string;
  expectedWage: string;
  location: string;
  make?: string;
  carModel?: string;
  isVerified: boolean;
  images: string[];
  videos?: string[];
  owner: string;
  available?: boolean;
  createdAt: Date;
}

interface CarVerifyProps {
  carType?: string;
}

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
      
      // Assuming you'll have a method to get all pending cars in your AdminAuthService
      const response = await AdminAuthService.getAllCars();

      console.log("response back")
      if (!response || !response.data) throw new Error("Failed to fetch cars");

      const filteredCars = response.data
        .filter((car: any) => car.isVerified === false && !car.isDeleted)
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
          isVerified: car.isVerified || false,
          images: car.images,
          videos: car.videos || [],
          owner: car.owner,
          available: car.available,
          createdAt: new Date(car.createdAt),
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
      
      // If reason is provided, we're rejecting the car
      // Otherwise, we're verifying the car
      const isVerified = !reason;
      
      // Assuming you'll implement this method in your AdminAuthService
      const response = await AdminAuthService.updateCarVerificationStatus(
        carId, 
        isVerified,
        reason
      );
      
      if (response) {
        // Update local state to reflect the change
        setCars((prevCars) => 
          prevCars.filter((car) => car.id !== carId)
        );
        
        // Close modal if the updated car was selected
        if (selectedCar && selectedCar.id === carId) {
          setSelectedCar(null);
        }
        
        toast.success(
          isVerified 
            ? "Car verified successfully" 
            : "Car rejected successfully"
        );
        
        // Refresh the car list
        fetchCars();
      }
    } catch (err) {
      setError(reason ? "Failed to reject car" : "Failed to verify car");
      console.error(err);
    } finally {
      setIsProcessing((prev) => ({ ...prev, [carId]: false }));
    }
  };

  const getStatusBadge = (isVerified: boolean) => {
    if (isVerified) {
      return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Verified</span>;
    } else {
      return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span>;
    }
  };

  // Format date to readable string
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  // Table columns definition
  const columns: Column<Car>[] = [
    {
      header: "Car Name",
      accessor: "carName" as keyof Car,
      sortable: true,
    },
    {
      header: "Brand",
      accessor: "brand" as keyof Car,
      sortable: true,
    },
    {
      header: "Location",
      accessor: "location" as keyof Car,
      sortable: true,
    },
    {
      header: "Status",
      accessor: (car: Car) => getStatusBadge(car.isVerified),
      className: "whitespace-nowrap",
    },
    {
      header: "Price/Day",
      accessor: "expectedWage" as keyof Car,
      sortable: true,
    },
    {
      header: "Listed On",
      accessor: (car: Car) => formatDate(car.createdAt),
      sortable: true,
    },
    {
      header: "Actions",
      accessor: (car: Car) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCar(car);
            }}
            className="p-1 rounded text-blue-600 hover:bg-blue-100"
            title="View Details"
            disabled={isProcessing[car.id]}
          >
            <Eye size={18} />
          </button>
        </div>
      ),
      className: "w-24",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Car Verification
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <DataTable
        data={cars}
        columns={columns}
        keyExtractor={(car) => car.id}
        onRowClick={setSelectedCar}
        pagination={true}
        itemsPerPage={10}
        searchable={true}
        searchKeys={["carName", "brand", "location"] as Array<keyof Car>}
        loading={loading}
        emptyMessage="No cars pending verification"
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