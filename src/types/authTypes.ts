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
    profilePicture?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  