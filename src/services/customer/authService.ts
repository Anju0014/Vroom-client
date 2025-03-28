import axiosInstance from "@/config/axiosInstance";
import { SignupData, GoogleSignInData,Address } from "@/types/authTypes";

const customerApi=axiosInstance('customer')

export const AuthService = {
  registerCustomer: async (userData: SignupData) => {
    return await customerApi.post("/signup", userData);
  },
  verifyotpCustomer: async ({ email, otp }: { email: string; otp: string }) => {
    return await customerApi.post("/verifyotp", { email, otp });
  },
  resendotpCustomer:async ({email}:{email:string})=>{
    return await customerApi.post("/resendotp",{email})
  },
  loginCustomer: async ({email,password}:{email:string,password:string})=>{
    return await customerApi.post("/login",{email,password});
  },
  forgotPasswordCustomer:async({email}:{email:string})=>{
     return await customerApi.post("/forgotpassword",{email})
  },
  resetPasswordCustomer:async({token,newPassword}:{token:string|null,newPassword:string})=>{
    return await customerApi.post("/resetpassword",{token,newPassword})
  },
  logoutCustomer: async () => {
    return await customerApi.post('/logout', {}, { withCredentials: true });
  },
  googlesigninCustomer: async (data: GoogleSignInData) => {
    return await customerApi.post("/googleSignIn", data);
  },
  getCustomerProfile:async()=>{
    const response = await customerApi.get("/getCustomerProfile");
    if (response.status !== 200) throw new Error("Failed to fetch profile");
    return response.data.customer; 
  },
  updateCustomerProfile: async (payload: { phoneNumber: string; address: Address,profileImage:string }) => {
    const response = await customerApi.put("/updateProfile", payload);
    console.log(response.data)
    return response.data;
  },
  updateCustomerIdProof: async ({idProof}:{idProof:string}) => {
    const response = await customerApi.put("/updateProfileIdProof", {idProof});
    console.log(response.data)
    return response.data;
  },

};

