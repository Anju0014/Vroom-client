"use client";
import ChatBox from "@/components/ChatBox";
import { useAuthStore } from "@/store/customer/authStore";

export default function BookingChatPage({ params }: { params: { bookingId: string } }) {
    const { user}= useAuthStore();
    if(!user){
        return
    }
  const currentUser = user.id;
  return (
    <div>
      <h1>Chat with Owner</h1>
      <ChatBox roomId={params.bookingId} currentUser={currentUser} />
    </div>
  );
}
