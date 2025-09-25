// chatService.ts
import axiosInstanceOwner from "@/config/axiosInstanceOwner";

const carOwnerApi = axiosInstanceOwner();

export const fetchOwnerChats = async () => {
  const res = await carOwnerApi.get("/chats/ownerchats"); 
  return res.data;
};

export const fetchChatHistory = async (roomId: string) => {
  const res = await carOwnerApi.get(`/chats/room/${roomId}`);
  return res.data;
};
