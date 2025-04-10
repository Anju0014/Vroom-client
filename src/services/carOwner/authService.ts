

import axiosInstanceOwner from "@/config/axiosInstanceOwner";
import { SignupData, GoogleSignInData,Address,ChangePasswordData, CarFormData, RegistrationCarOwner } from "@/types/authTypes";

// const carOwnerApi = axiosInstance("carOwner");
const carOwnerApi = axiosInstanceOwner();

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
  return await carOwnerApi.post("car/carupload",data)
},

changePassword: async (data: ChangePasswordData) => {
  const response = await carOwnerApi.post("owner/changepassword",data)
  return response.data;
},

getCars: async () => {
  try {
    const response = await carOwnerApi.get("/car/getcars"); 
    return response.data; // Assuming the backend returns { cars: [] }
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
},
completeRegistration:async(data:RegistrationCarOwner)=>{
      const response = await carOwnerApi.post("/owner/completeregistration", data);
      return response.data;
},


updateCar: async (carId: string, carData: CarFormData) => {
  const response = await carOwnerApi.put(`/car/updatecars/${carId}`, carData);
  return response.data;
},

deleteCar: async (carId: string) => {
  const response = await carOwnerApi.delete(`/car/deletecars/${carId}`);
  return response.data;
}

}