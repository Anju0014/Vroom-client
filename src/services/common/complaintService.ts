
import { API_ROUTES } from "@/code/constants/apiRoutes";
import { plainAxios } from "@/code/plainAxios";

const commonApi = plainAxios;
import { Complaint, CreateComplaintDTO } from "@/types/complaintTypes";

export const complaintService = {
  createComplaint: async (data: CreateComplaintDTO): Promise<void> => {
    await plainAxios.post("/complaints", data);
  },

  getMyComplaints: async (): Promise<Complaint[]> => {
    const res = await plainAxios.get("/complaints");
    return res.data;
  },
};
