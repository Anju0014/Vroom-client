
export const API_ROUTES = {
  auth: {
    customer: {
      signup: "/signup",
      verifyOtp: "/verifyotp",
      resendOtp: "/resendotp",
      login: "/login",
      forgotPassword: "/forgotpassword",
      resetPassword: "/resetpassword",
      logout: "/logout",
      googleSignIn: "/googleSignIn",
    },
    admin: {
      login: "/admin/login",
      logout: "/admin/logout",
    },
    owner: {
      signup: "/owner/signup",
      verifyOtp: "/owner/verifyotp",
      resendOtp: "/owner/resendotp",
      login: "/owner/login",
      forgotPassword: "/owner/forgotpassword",
      resetPassword: "/resetpassword",
      logout: "/owner/logout",
      googleSignIn: "/owner/googleSignIn",
      completeRegistration: "/owner/completeregistration",
    },
  },
  profile: {
    customer: {
      getProfile: "/getCustomerProfile",
      updateProfile: "/updateProfile",
      updateIdProof: "/updateProfileIdProof",
      changePassword: "/changepassword",
    },
    admin: {
      getProfile: "/owner/getAdminProfile", // Note: Possible typo in your original code
    },
    owner: {
      getProfile: "/owner/getOwnerProfile",
      updateProfile: "/owner/updateProfile",
      updateIdProof: "/owner/updateProfileIdProof",
      changePassword: "/owner/changepassword",
    },
  },
  admin: {
    getAllCustomers: "/admin/customers",
    getAllOwners: "/admin/owners",
    getAllPendingOwners: "/admin/ownerpending",
    toggleBlockCustomer: (customerId: string) => `/customers/${customerId}/toggle-block`,
    toggleBlockOwner: (ownerId: string) => `/owner/${ownerId}/toggle-block`,
    updateBlockStatus: (userId: string, userType: "customer" | "owner") =>
      userType === "customer"
        ? `/admin/customers/updateblockstatus/${userId}`
        : `/admin/owners/updateblockstatus/${userId}`,
    updateCarBlockStatus: (carId: string) => `/admin/cars/updateblockstatus/${carId}`,
    updateUserStatus: (userId: string, userType: "customer" | "owner") =>
      userType === "customer"
        ? `/admin/customers/updatestatus/${userId}`
        : `/admin/owners/updatestatus/${userId}`,
    updateVerifyStatus: (userId: string, userType: "customer" | "owner") =>
      userType === "customer"
        ? `/admin/customers/updateverifystatus/${userId}`
        : `/admin/owners/updateverifystatus/${userId}`,
    getAllUnverifiedCars: "/admin/pendingcars",
    getAllVerifiedCars: "/admin/verifiedcars",
    getAllBookings: "/admin/bookings",
    updateCarVerifyStatus: (carId: string) => `/admin/cars/updateverifystatus/${carId}`,
  },
  owner: {
    addCar: "/owner/carupload",
    getCars: "/owner/getcars",
    updateCar: (carId: string) => `/owner/updatecars/${carId}`,
    deleteCar: (carId: string) => `/owner/deletecars/${carId}`,
    getBookingList: "/owner/bookings",
    getBookingsForCar: (carId: string) => `/owner/cars/${carId}/bookings`,
    updateCarAvailability: (carId: string) => `/owner/cars/${carId}/availability`,
    getActiveBookingForCar: (carId: string) => `/owner/activebooking/${carId}`,
    cancelBooking: (bookingId: string) => `/bookings/${bookingId}/cancel`,
  },
  customer: {
    nearByCars: "/car/nearby",
    getAllCars: "/car/getAllCars",
    featuredCarList: "/car/featured",
    findCarDetails: (carId: string) => `/car/getCarDetails/${carId}`,
    findBookingDetails: (carId: string) => `/car/getBookingDetails/${carId}`,
    findCustomerBookingDetails: "/getCustomerBookingDetails",
    createPendingBooking: "/bookings/create",
    confirmBooking: (bookingId: string) => `/bookings/${bookingId}/confirm`,
    failBooking: (bookingId: string) => `/bookings/${bookingId}/fail`,
    cancelBooking: (bookingId: string) => `/bookings/${bookingId}/cancel`,
  },
  chat: {
    ownerChats: "/chats/ownerchats",
    chatHistory: (roomId: string) => `/chats/room/${roomId}`,
  },
  stripe: {
    createPaymentIntent: "api/stripe/create-payment-intent",
  },
  tracking: {
    updateLocation: "tracking/update",
  },
  s3: {
    generatePresignedUrl: "api/s3/generatePresignedUrl",
  },
};
