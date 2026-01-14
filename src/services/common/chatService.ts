// chatService.ts
import axiosInstance from "@/lib/axiosInstance";

const commonApi = axiosInstance;


export const fetchOwnerChats = async () => {
  const res = await commonApi.get("/chats/ownerchats"); 
  return res.data;
};

export const fetchChatHistory = async (roomId: string, role:string) => {
// const api = role === "carOwner" ? carOwnerApi : customerApi;
  const res = await commonApi.get(`/chats/room/${roomId}`);
  return res.data;
};



// import { axiosOwner } from "@/code/axiosCarOwner";
// import { API_ROUTES } from "@/code/constants/apiRoutes";

// const carOwnerApi = axiosOwner;

// export const ChatService = {
//   fetchOwnerChats: async () => {
//     const res = await carOwnerApi.get(API_ROUTES.chat.ownerChats);
//     return res.data;
//   },

//   fetchChatHistory: async (roomId: string) => {
//     const res = await carOwnerApi.get(API_ROUTES.chat.chatHistory(roomId));
//     return res.data;
//   },
// };
