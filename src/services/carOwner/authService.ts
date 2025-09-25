

import axiosInstanceOwner from "@/config/axiosInstanceOwner";
import { SignupData, GoogleSignInData,Address,ChangePasswordData, CarFormData, RegistrationCarOwner } from "@/types/authTypes";
import { Booking } from "@/types/carTypes";

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
  // return await carOwnerApi.post("owner/carupload",data)
  const response = await carOwnerApi.post("owner/carupload", data);
  return response.data;
},

changePassword: async (data: ChangePasswordData) => {
  const response = await carOwnerApi.post("owner/changepassword",data)
  return response.data;
},

getCars: async (page=1,limit=5) => {
  try {
    const response = await carOwnerApi.get(`/owner/getcars?page=${page}&limit=${limit}`); 
    return response.data; 
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
  const response = await carOwnerApi.put(`/owner/updatecars/${carId}`, carData);
  return response.data;
},

deleteCar: async (carId: string) => {
  const response = await carOwnerApi.delete(`/owner/deletecars/${carId}`);
  return response.data;
},

getBookingList:async(page=1,limit=9)=>{
  const response=await carOwnerApi.get(`/owner/bookings?page=${page}&limit=${limit}`);
  return response.data
},


getBookingsForCar: async (carId: string): Promise<{ data: Booking[] }> => {
    const response = await carOwnerApi.get(`/owner/cars/${carId}/bookings`);
      return {
      data: response.data.data.map((booking: any) => ({
        id: booking._id,
        bookingId: booking.bookingId,
        carId: booking.carId.toString(),
        userId: booking.userId.toString(),
        carOwnerId: booking.carOwnerId.toString(),
        startDate: booking.startDate,
        endDate: booking.endDate,
        totalPrice: booking.totalPrice,
        status: booking.status,
        paymentIntentId: booking.paymentIntentId,
        paymentMethod: booking.paymentMethod,
        cancellationFee: booking.cancellationFee,
        refundedAmount: booking.refundedAmount,
        cancelledAt: booking.cancelledAt,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      })),
    };
  },

  updateCarAvailability: async (carId: string, data: { unavailableDates: string[] }): Promise<void> => {
    console.log("unavailable",data)
    await carOwnerApi.patch(`/owner/cars/${carId}/availability`, data);
  },
getActiveBookingForCar:async(carId:string):Promise<Booking>=>{
  const response=await carOwnerApi.get(`/owner/activebooking/${carId}`)
  console.log("bookingsfor today? ",response.data)
  const bookingData = response.data.booking;

  if (!bookingData) return bookingData;
  return {
    ...bookingData,
    id: bookingData?._id, 
  };
},

cancelBooking:async (bookingId: string) =>{
  try {
    console.log('Cancelling booking:', bookingId);
    const response = await carOwnerApi.patch(`/bookings/${bookingId}/cancel`);
    console.log('Booking cancelled:', response.data);

    if (!response.data.success) {
      throw new Error('Invalid response: success not found');
    }

    return response.data;
  } catch (error: any) {
    console.error('Cancel booking API error:', error.response?.data || error.message);
    throw new Error(`Failed to cancel booking: ${error.response?.data?.error || error.message}`);
  }
}
  


}