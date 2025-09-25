"use client";
import { useEffect, useState } from "react";
import socket from "@/services/common/socketService";
import { fetchChatHistory } from "@/services/common/chatService";

interface ChatMessage {
  _id: string;
  roomId: string;
  senderId: string;
  message: string;
  timestamp: string;
}

export default function ChatBox({ roomId, currentUser }: { roomId: string; currentUser: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchChatHistory(roomId).then(setMessages);
    socket.emit("joinChatRoom", roomId);


    socket.on("receiveChatMessage", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveChatMessage");
    };
  }, [roomId]);

  const sendMessage = () => {
    if (!text.trim()) return;
    socket.emit("sendChatMessage", { roomId, senderId: currentUser, message: text });
    setText("");
  };

  return (
    <div className="p-4 border rounded w-full max-w-md">
      <div className="h-64 overflow-y-auto border-b mb-2">
        {messages.map((m) => (
          <div key={m._id}>
            <strong>{m.senderId === currentUser ? "You" : m.senderId}:</strong> {m.message}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="border flex-1 rounded px-2"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
