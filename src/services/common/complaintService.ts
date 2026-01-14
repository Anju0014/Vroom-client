
import { API_ROUTES } from "@/code/constants/apiRoutes";
import axiosInstance from "@/lib/axiosInstance";

const commonApi = axiosInstance;
import { Complaint, CreateComplaintDTO } from "@/types/complaintTypes";

export const complaintService = {
  createComplaint: async (data: CreateComplaintDTO): Promise<void> => {
    await commonApi.post("/complaints", data);
  },

  getMyComplaints: async (): Promise<Complaint[]> => {
    const res = await commonApi.get("/complaints");
    return res.data;
  },
};
