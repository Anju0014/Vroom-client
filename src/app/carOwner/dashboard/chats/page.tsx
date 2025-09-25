// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { fetchOwnerChats } from "@/services/common/chatService";

// export default function OwnerChatsPage() {
//   const [chats, setChats] = useState<any[]>([]);

//   useEffect(() => {
//     fetchOwnerChats().then(setChats);
//   }, []);

//   return (
//     <div>
//       <h1>Active Chats</h1>
//       {chats.length === 0 && <p>No chats yet.</p>}
//       {chats.map((c) => (
//         <div key={c.bookingId} className="p-2 border mb-2">
//           <Link href={`/carOwner/dashboard/chats/${c.bookingId}`}>
//             Booking {c.bookingId} - Last: {c.lastMessage}
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchOwnerChats } from "@/services/common/chatService";

export default function OwnerChatsPage() {
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    fetchOwnerChats().then(setChats);
  }, []);

  // Group messages by bookingId
  const chatsByBooking: Record<string, any[]> = {};
  chats.forEach(msg => {
    if (!chatsByBooking[msg.roomId]) chatsByBooking[msg.roomId] = [];
    chatsByBooking[msg.roomId].push(msg);
  });

  return (
    <div>
      <h1>Active Chats</h1>
      {Object.keys(chatsByBooking).length === 0 && <p>No chats yet.</p>}

      {Object.keys(chatsByBooking).map((bookingId) => (
        <div key={bookingId} className="p-2 border mb-2">
          <Link href={`/carOwner/dashboard/chats/${bookingId}`}>
            Booking {bookingId} - Messages: {chatsByBooking[bookingId].length}
          </Link>
        </div>
      ))}
    </div>
  );
}
