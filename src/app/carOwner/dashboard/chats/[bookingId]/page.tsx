"use client";

import ChatBox from "@/components/ChatBox";
import { useAuthStoreOwner } from "@/store/carOwner/authStore";
import { useParams } from "next/navigation";

export default function OwnerChatPage() {
  const { user } = useAuthStoreOwner();
  const params = useParams();

  if (!user) return null; 

  
  const bookingIdRaw = params.bookingId;
  if (!bookingIdRaw) return <p>Booking ID not found</p>;

  const bookingId = Array.isArray(bookingIdRaw) ? bookingIdRaw[0] : bookingIdRaw;
  const currentUser = user.id; 
  if(!user.id) return

  return (
    <div>
      <h1>Chat with Customer</h1>
      <ChatBox roomId={bookingId} currentUser={currentUser} role='carOwner' />
    </div>
  );
}
