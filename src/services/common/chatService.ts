import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}api/chats`;

import axiosInstanceOwner from "@/config/axiosInstanceOwner";
const carOwnerApi = axiosInstanceOwner();

export const fetchChatHistory = async (roomId: string) => {
  const res = await axios.get(`${API_URL}/room/${roomId}`, { withCredentials: true });
  return res.data;
};

export const fetchOwnerChats = async () => {
    console.log("sending request")
  const res = await axios.get(`${API_URL}/ownerchats`, { withCredentials: true });
  console.log("response?",res)
  return res.data;
};
