import axiosInstance from "@/config/axiosInstance";
import { SignupData } from "@/types/authTypes";

export const AuthService = {
  registerCustomer: async (userData: SignupData) => {
    return await axiosInstance.post("/signup", userData);
  },
  verifyotpCustomer: async ({ email, otp }: { email: string; otp: string }) => {
    return await axiosInstance.post("/verifyotp", { email, otp });
  },
  resendotpCustomer:async ({email}:{email:string})=>{
    return await axiosInstance.post("/resendotp",{email})
  },
  loginCustomer: async ({email,password}:{email:string,password:string})=>{
    return await axiosInstance.post("/login",{email,password});
  },
  forgotPasswordCustomer:async({email}:{email:string})=>{
     return await axiosInstance.post("/forgotpassword",{email})
  },
  resetPasswordCustomer:async({token,newPassword}:{token:string|null,newPassword:string})=>{
    return await axiosInstance.post("/resetpassword",{token,newPassword})
  },
  logoutCustomer: async () => {
    return await axiosInstance.post('/logout', {}, { withCredentials: true });
  }

};

