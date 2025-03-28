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
    phoneNumber?: string;
    role: UserRole;
    profileImage?: string;
    createdAt?: string;
    updatedAt?: string;
    address?:[],
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
    profileImage: string;
    provider: string;
    role?: "customer" | "carOwner";
  }



  // export interface Car {
  //   id: string;                
  //   carName: string;
  //   brand: string;
  //   year?: string;
  //   fuelType?: string;
  //   rcBookNo?: string;          
  //   expectedWage: string;
  //   location: string;
  //   make?: string;
  //   model: string;
  //   isVerified?:boolean
  //   images?: string[];          
  //   videos?: string[];         
  //   imageFiles?: File[];        
  //   videoFiles?: File[];        
  // }
  
  export interface Car {
    id: string;
    carName: string;
    brand: string;
    year?: string;
    fuelType?: string;
    rcBookNo?: string;
    expectedWage: string;
    location: string;
    make?: string;
    model: string;
    isVerified?: boolean;
    images?: string[];  
    videos?: string[]; 
   }


   export interface CarFormData {
    carName: string;
    brand: string;
    year: string;
    fuelType: string;
    rcBookNo: string;
    expectedWage: string;
    location: string;
    imageFiles: File[];  // Files to upload
    videoFiles: File[];  // Files to upload
  }

  export interface Address {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }



  export interface Customer {
    id: string;
    name: string;
    email: string;
    status: 'verified' | 'not_verified';
    isBlocked: boolean;
    createdAt: Date;
    lastLogin?: Date;
    phoneNumber?: string;
    address?: string;
  }