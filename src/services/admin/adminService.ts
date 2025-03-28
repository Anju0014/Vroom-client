import axiosInstance from "@/config/axiosInstance";

const adminApi=axiosInstance('admin');
export const AdminAuthService = {

  loginAdmin: async ({ email, password }: { email: string; password: string }) => {
    return await adminApi.post("/admin/login", { email, password });
  },

logoutAdmin: async () => {
  return await adminApi.post('/admin/logout', {}, { withCredentials: true });
}
};
