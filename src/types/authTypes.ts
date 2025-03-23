export interface SignupData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
  }
  


  export type UserRole = "admin" | "carOwner" | "customer";

  export interface IUser {
    id: string;
    fullName: string;
    email: string;
    phone?: string;
    role: UserRole;
    profileImage?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  


  export interface Car {
    id: string;
    make?: string;
    model: string;
    year?: number;
    fuelType?: string,
    rcBookNo?: string,
    licensePlate?: string;
    image?: string;
    isVerified?:boolean
  }
  
  export interface Booking {
    id: string;
    carId: string;
    startDate: string;
    endDate: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    totalPrice: number;
  }
  
  export interface Agreement {
    id: string;
    title: string;
    signedDate: string;
    expiryDate: string;
    documentUrl: string;
  }
  
  export interface IdProof {
    id: string;
    type: 'driver_license' | 'passport' | 'national_id';
    number: string;
    expiryDate: string;
    verificationStatus: 'pending' | 'verified' | 'rejected';
    documentUrl: string;
  }



  export interface GoogleSignInData {
    fullName: string;
    email: string;
    image: string;
    provider: string;
    role?: "customer" | "carOwner";
  }