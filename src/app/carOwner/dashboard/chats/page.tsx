"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchOwnerChats } from "@/services/common/chatService"

export default function OwnerChatsPage() {
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    fetchOwnerChats().then(setChats);
  }, []);

  return (
    <div>
      <h1>Active Chats</h1>
      {chats.map((c) => (
        <div key={c._id} className="p-2 border mb-2">
          <Link href={`/carOwner/dashboard/chats/${c._id}`}>
            Booking {c._id} - Last: {c.lastMessage}
          </Link>
        </div>
      ))}
    </div>
  );
}
