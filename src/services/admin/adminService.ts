import axiosInstance from "@/config/axiosInstance";

const adminApi=axiosInstance('admin');
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
getAllCustomers:async()=>{
  const response=await adminApi.get('/admin/customers');
  return response.data

},
getAllCarOwners:async()=>{
  const response=await adminApi.get('/admin/owners');
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


};
