import axiosInstance from "@/config/axiosInstance";
import axiosInstanceAdmin from "@/config/axiosInstanceAdmin";

const adminApi=axiosInstanceAdmin();
export const AdminAuthService = {

  loginAdmin: async ({ email, password }: { email: string; password: string }) => {
    return await adminApi.post("/admin/login", { email, password });
  },

logoutAdmin: async () => {
  return await adminApi.post('/admin/logout', {}, { withCredentials: true });
},
getAdminProfile:async()=>{
  const response = await adminApi.get("owner/getAdminProfile");
  if (response.status !== 200) throw new Error("Failed to fetch profile");
  return response.data.owner; 
},
getAllCustomers:async(page: number, limit: number, filters: { search: string })=>{
  const response=await adminApi.get('/admin/customers',{
      params: {
        page,
        limit,
        search: filters.search || '',
      },
    });
  return response.data

},
getAllCarOwners:async(page: number, limit: number, filters: { search: string })=>{
  const response=await adminApi.get('/admin/owners',{
      params: {
        page,
        limit,
        search: filters.search || '',
      },
    });
  return response.data
},

getAllOwnerforVerify:async(page: number, limit: number, filters: { search: string })=>{
  console.log("sending request")
  const response=await adminApi.get('/admin/ownerpending', {
      params: {
        page,
        limit,
        search: filters.search || '',
      },
    });
  return response.data
},

toggleBlockCustomer: async (customerId: string, newStatus: boolean) => {
  try {
    const response = await adminApi.patch(`/customers/${customerId}/toggle-block`, {
      isBlocked: newStatus,
    });

    return response.data;
  } catch (error) {
    console.error('Error toggling block status:', error);
    throw new Error('Failed to update block status');
  }
},
toggleBlockOwner: async (ownerId: string, newStatus: boolean) => {
  try {
    const response = await adminApi.patch(`/owner/${ownerId}/toggle-block`, {
      isBlocked: newStatus,
    });

    return response.data;
  } catch (error) {
    console.error('Error toggling block status:', error);
    throw new Error('Failed to update block status');
  }
},

updateBlockStatus: async (userId: string, status: number, userType: "customer" | "owner") => {
  try {
    const endpoint = userType === "customer"
      ? `/admin/customers/updateblockstatus/${userId}`
      : `/admin/owners/updateblockstatus/${userId}`;

      console.log(status)
    const response = await adminApi.patch(endpoint, { status }); 

    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error updating user status:", error);
    throw new Error("Failed to update user status");
  }
},

updateCarBlockStatus: async (carId: string, status: number) => {
  try {
    const endpoint = `/admin/cars/updateblockstatus/${carId}`;

      console.log(status)
    const response = await adminApi.patch(endpoint, { status }); 
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error updating user status:", error);
    throw new Error("Failed to update user status");
  }
},
updateUserStatus: async (userId: string, status: number, userType: "customer" | "owner") => {
  try {
    const endpoint = userType === "customer"
      ? `/admin/customers/updatestatus/${userId}`
      : `/admin/owners/updatestatus/${userId}`;

      console.log(status)
    const response = await adminApi.patch(endpoint, { status }); 

    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error updating user status:", error);
    throw new Error("Failed to update user status");
  }
},

updateVerifyStatus: async (userId: string, status: number, userType: "customer" | "owner",reason?:string) => {
  try {
    const endpoint = userType === "customer"
      ? `/admin/customers/updateverifystatus/${userId}`
      : `/admin/owners/updateverifystatus/${userId}`;

      console.log(status)
    const response = await adminApi.patch(endpoint, { status , reason}); 
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error updating user status:", error);
    throw new Error("Failed to update user status");
  }
},


 getAllUnVerifiedCars:async(page: number, limit: number, filters: { search: string })=> {
  try {
    const response = await adminApi.get('/admin/pendingcars', {
      params: {
        page,
        limit,
        search: filters.search || '',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pending cars:', error);
    throw error;
  }
},


 getAllVerifiedCars:async(page: number, limit: number, filters: { search: string })=> {
  try {
    console.log("sending data")
    const response = await adminApi.get('/admin/verifiedcars', {
      params: {
        page,
        limit,
        search: filters.search || '',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pending cars:', error);
    throw error;
  }
},

getAllBookings:async(page: number, limit: number, filters: { search: string })=> {
  try {
  
     const response = await adminApi.get('/admin/bookings', {
      params: {
        page,
        limit,
        search: filters.search || '',
      },
    });
    return response.data
  } catch (error) {
    console.error('Error fetching booking cars:', error);
    throw error;
  }
},
// Update car verification status
updateCarVerifyStatus:async(carId: string, status:number, reason?: string) =>{
  try {
    const response = await adminApi.patch(`/admin/cars/updateverifystatus/${carId}`, {
      status,
      reason,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating car verification status:', error);
    throw error;
  }
}

};
