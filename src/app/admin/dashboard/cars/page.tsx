'use client';

import React, { useEffect, useState } from "react";
import { DataTable, Column } from "@/components/admin/UserTable";
import { AdminAuthService } from "@/services/admin/adminService";
import { Eye } from "lucide-react";
import CarDetailsModal from "@/components/admin/CarDetailsModal";
import { Car } from '@/types/carTypes';


const VerifiedCarsPage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVerifiedCars();
  }, []);

  const fetchVerifiedCars = async () => {
    try {
      setLoading(true);
      
      const response = await AdminAuthService.getAllCars();

      if (!response || !response.data) throw new Error("Failed to fetch cars");

    
      const verifiedCars = response.data
        .filter((car: any) => car.verifyStatus === 1 && !car.isDeleted)
        .map((car: any) => ({
          id: car._id,
          carName: car.carName,
          brand: car.brand,
          year: car.year,
          fuelType: car.fuelType,
          rcBookNo: car.rcBookNo,
          expectedWage: car.expectedWage,
          location: car.location,
          verifyStatus: car.verifyStatus,
          images: car.images,
          videos: car.videos || [],
          owner: car.owner,
          available: car.available,
          createdAt: new Date(car.createdAt),
        }));

      setCars(verifiedCars);
    } catch (err) {
      setError("Error fetching verified cars");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getAvailabilityBadge = (available: boolean) => {
    if (available) {
      return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Available</span>;
    } else {
      return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Not Available</span>;
    }
  };

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
      header: "Owner",
      accessor: (car: Car) => car.owner?.fullName || "Unknown",
      sortable: true,
    },
    {
      header: "Location",
      accessor: (car: Car) => car.location.address ?? "No address",
      sortable: true,
    },
    {
      header: "Availability",
      accessor: (car: Car) => getAvailabilityBadge(car.available),
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
        Verified Cars
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
        searchKeys={["carName", "brand", "location", "owner.fullName"] as Array<keyof Car>}
        loading={loading}
        emptyMessage="No verified cars available"
      />

      {selectedCar && (
        <CarDetailsModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
        />
      )}
    </div>
  );
};

export default VerifiedCarsPage;