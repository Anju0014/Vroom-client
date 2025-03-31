
import axiosInstance from "@/config/axiosInstance";
import { SignupData, GoogleSignInData,Address, CarFormData } from "@/types/authTypes";

const carOwnerApi = axiosInstance("carOwner");

export const OwnerAuthService = {
  registerCarOwner: async (userData: SignupData ) => {
    return await carOwnerApi.post("/owner/signup", userData);
  },
  verifyotpCarOwner: async ({ email, otp }: { email: string; otp: string }) => {
    return await carOwnerApi.post("/owner/verifyotp", { email, otp });
  },
  resendotpCarOwner: async ({ email }: { email: string }) => {
    return await carOwnerApi.post("/owner/resendotp", { email });
  },
  loginCarOwner: async ({ email, password }: { email: string; password: string }) => {
    return await carOwnerApi.post("/owner/login", { email, password });
  },
  forgotPasswordCarOwner:async({email}:{email:string})=>{
    return await carOwnerApi.post("owner/forgotpassword",{email})
 },
 resetPasswordCarOwner:async({token,newPassword}:{token:string|null,newPassword:string})=>{
  return await carOwnerApi.post("/resetpassword",{token,newPassword})
},
logoutOwner: async () => {
  return await carOwnerApi.post('/owner/logout', {}, { withCredentials: true });
},
googlesigninOwner: async (data: GoogleSignInData) => {
  return await carOwnerApi.post("owner/googleSignIn", data);
},
getOwnerProfile:async()=>{

  const response = await carOwnerApi.get("owner/getOwnerProfile");
  if (response.status !== 200) throw new Error("Failed to fetch profile");
  return response.data.owner; 
},
updateOwnerProfile: async (payload: { phoneNumber: string; address: Address,profileImage:string }) => {
  const response = await carOwnerApi.put("owner/updateProfile", payload);
  console.log(response.data)
  return response.data;
},
updateOwnerIdProof: async ({idProof}:{idProof:string}) => {
  const response = await carOwnerApi.put("owner/updateProfileIdProof", {idProof});
  console.log(response.data)
  return response.data;
},

addCar: async(data:CarFormData)=>{
  return await carOwnerApi.post("owner/carupload",data)
},

getCars: async () => {
  try {
    const response = await carOwnerApi.get("/owner/getcars"); 
    return response.data; // Assuming the backend returns { cars: [] }
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
},

};