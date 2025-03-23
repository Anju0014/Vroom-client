
import axiosInstance from "@/config/axiosInstance";
import { SignupData, GoogleSignInData } from "@/types/authTypes";


export const OwnerAuthService = {
  registerCarOwner: async (userData: SignupData ) => {
    return await axiosInstance.post("/owner/signup", userData);
  },
  verifyotpCarOwner: async ({ email, otp }: { email: string; otp: string }) => {
    return await axiosInstance.post("/owner/verifyotp", { email, otp });
  },
  resendotpCarOwner: async ({ email }: { email: string }) => {
    return await axiosInstance.post("/owner/resendotp", { email });
  },
  loginCarOwner: async ({ email, password }: { email: string; password: string }) => {
    return await axiosInstance.post("/owner/login", { email, password });
  },
  forgotPasswordCarOwner:async({email}:{email:string})=>{
    return await axiosInstance.post("owner/forgotpassword",{email})
 },
 resetPasswordCarOwner:async({token,newPassword}:{token:string|null,newPassword:string})=>{
  return await axiosInstance.post("/resetpassword",{token,newPassword})
},
logoutOwner: async () => {
  return await axiosInstance.post('owner/logout', {}, { withCredentials: true });
},
googlesigninOwner: async (data: GoogleSignInData) => {
  return await axiosInstance.post("/googleSignIn", data);
},
};
