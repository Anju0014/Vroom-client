export interface Car {
  id: string;
  carName: string;
  brand: string;
  year?: string;
  fuelType?: string;
  rcBookNo?: string;
  expectedWage: string;

  location: {
    coordinates: {
        lat: number;
        lng: number;
      };
      address: string;
      landmark?: string;
  };
  make?: string;
  carModel?: string;
  verifyStatus: number;
  blockStatus:number;
  images: string[];
  videos?: string[];
  owner:{
    fullName:string,
    id:string,
    email:string,
    phoneNumber?:string,
  };
  available: boolean;
  createdAt: Date;
  rcBookProof?:string;
  insuranceProof?:string;
  unavailableDates?:string[];
}

export interface CarVerifyProps {
  carType?: string;
}

export interface Booking {
  id: string;
  bookingId: string;
  carId: string;
  userId: string;
  carOwnerId: string;
  startDate: string; // ISO date string (e.g., "2025-08-20T00:00:00.000Z")
  endDate: string; // ISO date string
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'failed';
  paymentIntentId?: string;
  paymentMethod?: 'stripe' | 'wallet';
  cancellationFee?: number;
  refundedAmount?: number;
  cancelledAt?: string;
  createdAt?: string;
  updatedAt?: string;
  currentLocation?:{
    lat:number,
    lng:number,
  };
}