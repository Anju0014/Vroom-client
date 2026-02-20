
export const API_ROUTES = {
  auth: {
    customer: {
      signup: "/sign-up",
      verifyOtp: "/verify-otp",
      resendOtp: "/resend-otp",
      login: "/login",
      forgotPassword: "/forgot-password",
      resetPassword: "/reset-password",
      logout: "/auth/logout",
      googleSignIn: "/auth/google",
    },
    admin: {
      login: "/admin/auth/login",
      logout: "/admin/auth/logout",
    },
    owner: {
      signup: "/owner/sign-up",
      verifyOtp: "/owner/verify-otp",
      resendOtp: "/owner/resend-otp",
      login: "/owner/login",
      forgotPassword: "/owner/forgot-password",
      resetPassword: "/reset-password",
      logout: "/owner/logout",
      googleSignIn: "/owner/auth/google",
      completeRegistration: "/owner/complete-registration",
    },
  },
  profile: {
    customer: {
      getProfile: "/me",
      updateProfile: "/me",
      updateIdProof: "/me/id-proof",
      changePassword: "/me/password",
    },
    admin: {
      getProfile: "/owner/getAdminProfile", // Note: Possible typo in your original code
    },
    owner: {
      getProfile: "/owner/me",
      updateProfile: "/owner/me",
      updateIdProof: "/owner/me/id-proof",
      changePassword: "/owner/me/password",
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
        ? `/admin/customers/block-status/${userId}`
        : `/admin/owners/block-status/${userId}`,
    updateCarBlockStatus: (carId: string) => `/admin/cars/block-status/${carId}`,
    updateUserStatus: (userId: string, userType: "customer" | "owner") =>
      userType === "customer"
        ? `/admin/customers/updatestatus/${userId}`
        : `/admin/owners/updatestatus/${userId}`,
    updateVerifyStatus: (userId: string, userType: "customer" | "owner") =>
      userType === "customer"
        ? `/admin/customers/verify-status/${userId}`
        : `/admin/owners/verify-status/${userId}`,
    getAllUnverifiedCars: "/admin/pendingcars",
    getAllVerifiedCars: "/admin/verifiedcars",
    getAllBookings: "/admin/bookings",
    updateCarVerifyStatus: (carId: string) => `/admin/cars/verify-status/${carId}`,
    getAllComplaints: "/complaints/admin",
    updateComplaint: (id: string) => `/complaints/admin/${id}`,
    getStats:"/admin/getStats",

  },
  owner: {
    addCar: "/owner/car",
    getCars: "/owner/cars",
    updateCar: (carId: string) => `/owner/cars/${carId}`,
    deleteCar: (carId: string) => `/owner/cars/${carId}`,
    getBookingList: "/owner/bookings",
    getBookingsForCar: (carId: string) => `/owner/cars/${carId}/bookings`,
    updateCarAvailability: (carId: string) => `/owner/cars/${carId}/availability`,
    getActiveBookingForCar: (carId: string) => `/owner/activebooking/${carId}`,
    cancelBooking: (bookingId: string) => `/bookings/${bookingId}/cancel`,
    receiptUrlBooking: (bookingId: string) => `/owner/booking/${bookingId}/receipt-url`,
    markCarReturned:(bookingId: string) => `/owner/bookings/${bookingId}/markCarReturned`,
    getOwnerStats:"/owner/getStats",
  },
  customer: {
    nearByCars: "/car/nearby",
    getAllCars: "/cars",
    featuredCarList: "/car/featured",
    findCarDetails: (carId: string) => `/car/car-details/${carId}`,
    findBookingDetails: (carId: string) => `/car/booking-details/${carId}`,
    checkBookingAvailability:"/bookings/availability",
    findCustomerBookingDetails: "/me/bookings",
    findCustomerWalletDetails: "/me/wallet",
    updatePendingBooking:(bookingId:string)=>`/bookings/${bookingId}/pendingBooking`,
    createPendingBooking: "/bookings/create",
    confirmBooking: (bookingId: string) => `/bookings/${bookingId}/confirm`,
    failBooking: (bookingId: string) => `/bookings/${bookingId}/fail`,
    cancelBooking: (bookingId: string) => `/bookings/${bookingId}/cancel`,
    
  },
  chat: {
    ownerChats: "/chats/owner-chats",
    chatHistory: (roomId: string) => `/chats/room/${roomId}`,
  },
  stripe: {
    createPaymentIntent: "api/stripe/create-payment-intent",
  },
  tracking: {
    updateLocation: "tracking/update",
  },
  notification:{
   getNotification: "notifications",          
    getUnreadCount: "notifications/unread-count", 
    markAsRead: "notifications",  
  },
  s3: {
    generatePresignedUrl: "api/s3/generatePresignedUrl",
      presignedUpload: "api/s3/generate-upload-url",
  presignedView: "api/s3/generate-view-url",
  },
//   s3: {
//   presignedUpload: "api/s3/generate-upload-url",
//   presignedView: "api/s3/generate-view-url",
// }
};

// export const API_ROUTES = {
//   auth: {
//     customer: {
//       signup: "/signup",
//       verifyOtp: "/verifyotp",
//       resendOtp: "/resendotp",
//       login: "/login",
//       forgotPassword: "/forgotpassword",
//       resetPassword: "/resetpassword",
//       logout: "/logout",
//       googleSignIn: "/googleSignIn",
//     },
//     admin: {
//       login: "/admin/login",
//       logout: "/admin/logout",
//     },
//     owner: {
//       signup: "/owner/signup",
//       verifyOtp: "/owner/verifyotp",
//       resendOtp: "/owner/resendotp",
//       login: "/owner/login",
//       forgotPassword: "/owner/forgotpassword",
//       resetPassword: "/resetpassword",
//       logout: "/owner/logout",
//       googleSignIn: "/owner/googleSignIn",
//       completeRegistration: "/owner/completeregistration",
//     },
//   },
//   profile: {
//     customer: {
//       getProfile: "/getCustomerProfile",
//       updateProfile: "/updateProfile",
//       updateIdProof: "/updateProfileIdProof",
//       changePassword: "/changepassword",
//     },
//     admin: {
//       getProfile: "/owner/getAdminProfile", // Note: Possible typo in your original code
//     },
//     owner: {
//       getProfile: "/owner/getOwnerProfile",
//       updateProfile: "/owner/updateProfile",
//       updateIdProof: "/owner/updateProfileIdProof",
//       changePassword: "/owner/changepassword",
//     },
//   },
//   admin: {
//     getAllCustomers: "/admin/customers",
//     getAllOwners: "/admin/owners",
//     getAllPendingOwners: "/admin/ownerpending",
//     toggleBlockCustomer: (customerId: string) => `/customers/${customerId}/toggle-block`,
//     toggleBlockOwner: (ownerId: string) => `/owner/${ownerId}/toggle-block`,
//     updateBlockStatus: (userId: string, userType: "customer" | "owner") =>
//       userType === "customer"
//         ? `/admin/customers/updateblockstatus/${userId}`
//         : `/admin/owners/updateblockstatus/${userId}`,
//     updateCarBlockStatus: (carId: string) => `/admin/cars/updateblockstatus/${carId}`,
//     updateUserStatus: (userId: string, userType: "customer" | "owner") =>
//       userType === "customer"
//         ? `/admin/customers/updatestatus/${userId}`
//         : `/admin/owners/updatestatus/${userId}`,
//     updateVerifyStatus: (userId: string, userType: "customer" | "owner") =>
//       userType === "customer"
//         ? `/admin/customers/updateverifystatus/${userId}`
//         : `/admin/owners/updateverifystatus/${userId}`,
//     getAllUnverifiedCars: "/admin/pendingcars",
//     getAllVerifiedCars: "/admin/verifiedcars",
//     getAllBookings: "/admin/bookings",
//     updateCarVerifyStatus: (carId: string) => `/admin/cars/updateverifystatus/${carId}`,
//     getAllComplaints: "/complaints/admin",
//     updateComplaint: (id: string) => `/complaints/admin/${id}`,
//   },
//   owner: {
//     addCar: "/owner/carupload",
//     getCars: "/owner/getcars",
//     updateCar: (carId: string) => `/owner/updatecars/${carId}`,
//     deleteCar: (carId: string) => `/owner/deletecars/${carId}`,
//     getBookingList: "/owner/bookings",
//     getBookingsForCar: (carId: string) => `/owner/cars/${carId}/bookings`,
//     updateCarAvailability: (carId: string) => `/owner/cars/${carId}/availability`,
//     getActiveBookingForCar: (carId: string) => `/owner/activebooking/${carId}`,
//     cancelBooking: (bookingId: string) => `/bookings/${bookingId}/cancel`,
//     receiptUrlBooking: (bookingId: string) => `owner/booking/${bookingId}/receipt-url`
//   },
//   customer: {
//     nearByCars: "/car/nearby",
//     getAllCars: "/car/getAllCars",
//     featuredCarList: "/car/featured",
//     findCarDetails: (carId: string) => `/car/getCarDetails/${carId}`,
//     findBookingDetails: (carId: string) => `/car/getBookingDetails/${carId}`,
//     checkBookingAvailability:"/bookings/checkBookingAvailability",
//     findCustomerBookingDetails: "/getCustomerBookingDetails",
//     findCustomerWalletDetails: "/getCustomerWalletDetails",
//     updatePendingBooking:(bookingId:string)=>`/bookings/${bookingId}/updatePendingBooking`,
//     createPendingBooking: "/bookings/create",
//     confirmBooking: (bookingId: string) => `/bookings/${bookingId}/confirm`,
//     failBooking: (bookingId: string) => `/bookings/${bookingId}/fail`,
//     cancelBooking: (bookingId: string) => `/bookings/${bookingId}/cancel`,
    
//   },
//   chat: {
//     ownerChats: "/chats/ownerchats",
//     chatHistory: (roomId: string) => `/chats/room/${roomId}`,
//   },
//   stripe: {
//     createPaymentIntent: "api/stripe/create-payment-intent",
//   },
//   tracking: {
//     updateLocation: "tracking/update",
//   },
//   notification:{
//    getNotification: "notifications",          
//     getUnreadCount: "notifications/unread-count", 
//     markAsRead: "notifications",  
//   },
//   s3: {
//     generatePresignedUrl: "api/s3/generatePresignedUrl",
//   },
// //   s3: {
// //   presignedUpload: "api/s3/generate-upload-url",
// //   presignedView: "api/s3/generate-view-url",
// // }
// };
