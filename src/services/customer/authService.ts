import axiosInstance from "@/config/axiosInstance";
import { SignupData, GoogleSignInData,Address,ChangePasswordData } from "@/types/authTypes";
import { BookingData,CancelBookingResponse,BookingResponse,ConfirmBookingResponse } from "@/types/workTypes";
const customerApi=axiosInstance()

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
    return response.data; 
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
  
  changePassword: async (data: ChangePasswordData) => {
    const response = await customerApi.post("/changepassword",data)
    return response.data;
  },

  nearByCars:async(latitude:number,longitude:number) =>{
    console.log("sending")

    console.log(`/car/nearby?lat=${latitude}&lng=${longitude}&maxDistance=50`);

    let response= await customerApi.get(`/car/nearby?lat=${latitude}&lng=${longitude}&maxDistance=50`);
    console.log("have came back")
    return response.data
},



  async getAllCars(page: number, limit: number, filters: {
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    carType?:string;
    location?:string;
    startDate?:string;
    endDate?:string;
    
  }) {
    try {
      const response = await customerApi.get('/car/getAllCars', {
        params: {
          page,
          limit,
          search: filters.search,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          carType:filters.carType,
          location:filters.location,
          startDate:filters.startDate,
          endDate:filters.endDate
        },
      });
      console.log('getAllCars response:', response.data);
      return response.data; 
    } catch (error) {
      console.error('Error fetching all cars:', error);
      throw error;
    }
  },









  featuredCarList:async ()=>{
    let response=await customerApi.get("/car/featured");
    return response.data
},
findCarDetails:async(carId:string)=>{
  let response=await customerApi.get(`/car/getCarDetails/${carId}`)
  return response.data.data
},
findBookingDetails:async(carId:string)=>{
  console.log("sending to enquire booking deatils");
  let response=await customerApi.get(`/car/getBookingDetails/${carId}`)
  return response.data
  
},

findCustomerBookingDetails:async(page=1, limit=5)=>{
  console.log('sending request for user booking');
  let response=await customerApi.get(`/getCustomerBookingDetails?page=${page}&limit=${limit}`)
  console.log('getBookings response:', response.data);
      return response.data;
 
},






createPendingBooking:async (data: BookingData): Promise<BookingResponse> => {
  try {
    console.log('Sending booking data to:', `/bookings/create`, data);
    const response = await customerApi.post<BookingResponse>('/bookings/create', data);
    console.log('Booking created:', response.data);

    if (!response.data.bookingId) {
      throw new Error('Invalid response: bookingId not found');
    }

    return response.data;
  } catch (error: any) {
    console.error('Booking API error:', error.response?.data || error.message);
    throw new Error(`Failed to create booking: ${error.response?.data?.error || error.message}`);
  }
},

confirmBooking:async (bookingId: string, paymentIntentId: string): Promise<ConfirmBookingResponse> => {
  try {
    console.log('Confirming booking:', { bookingId, paymentIntentId });
    const response = await customerApi.patch<ConfirmBookingResponse>(
      `/bookings/${bookingId}/confirm`,
      { paymentIntentId }
    );
    console.log('Booking confirmed:', response.data);

    if (!response.data.success || !response.data.bookingId) {
      throw new Error('Invalid response: success or bookingId not found');
    }

    return response.data;
  } catch (error: any) {
    console.error('Confirm booking API error:', error.response?.data || error.message);
    throw new Error(`Failed to confirm booking: ${error.response?.data?.error || error.message}`);
  }
},


failBooking:async (bookingId: string): Promise<CancelBookingResponse> => {
  try {
    console.log('Cancelling booking:', bookingId);
    const response = await customerApi.patch<CancelBookingResponse>(`/bookings/${bookingId}/fail`);
    console.log('Booking cancelled:', response.data);

    if (!response.data.success) {
      throw new Error('Invalid response: success not found');
    }

    return response.data;
  } catch (error: any) {
    console.error('Cancel booking API error:', error.response?.data || error.message);
    throw new Error(`Failed to cancel booking: ${error.response?.data?.error || error.message}`);
  }
},


cancelBooking:async (bookingId: string): Promise<CancelBookingResponse> => {
  try {
    console.log('Cancelling booking:', bookingId);
    const response = await customerApi.patch<CancelBookingResponse>(`/bookings/${bookingId}/cancel`);
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
  

};

