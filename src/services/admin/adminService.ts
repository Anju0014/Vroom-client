import axiosInstance from "@/config/axiosInstance";


export const AdminAuthService = {

  loginAdmin: async ({ email, password }: { email: string; password: string }) => {
    return await axiosInstance.post("/admin/login", { email, password });
  },

logoutAdmin: async () => {
  return await axiosInstance.post('/admin/logout', {}, { withCredentials: true });
}
};
