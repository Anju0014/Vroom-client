// "use client";
// import { useEffect, useState } from "react";
// import socket from "@/services/common/socketService";
// import { fetchChatHistory } from "@/services/common/chatService";

// interface ChatMessage {
//   _id: string;
//   roomId: string;
//   senderId: string;
//   message: string;
//   timestamp: string;
// }

// export default function ChatBox({ roomId, currentUser,role }: { roomId: string; currentUser: string,role:string }) {
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [text, setText] = useState("");

//   useEffect(() => {
//     console.log("fetching messages")
//     fetchChatHistory(roomId, role).then(setMessages);
//     console.log("0000",messages)
//     socket.emit("joinChatRoom", roomId);


//     socket.on("receiveChatMessage", (msg: ChatMessage) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => {
//       socket.off("receiveChatMessage");
//     };
//   }, [roomId]);

//   const sendMessage = () => {
//     if (!text.trim()) return;
//     socket.emit("sendChatMessage", { roomId, senderId: currentUser, message: text });
//     setText("");
//   };

//   return (
//     <div className="p-4 border rounded w-full max-w-md">
//       <div className="h-64 overflow-y-auto border-b mb-2">
//         {messages.map((m) => (
//           <div key={m._id}>
//             <strong>{m.senderId === currentUser ? "You" : m.senderId}:</strong> {m.message}
//           </div>
//         ))}
//       </div>
//       <div className="flex gap-2 mt-2">
//         <input
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="Type a message..."
//           className="border flex-1 rounded px-2"
//         />
//         <button 
//         onClick={sendMessage} 
//         className="bg-blue-500 text-white px-4 rounded">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import socket from "@/services/common/socketService";
import { fetchChatHistory } from "@/services/common/chatService";

interface ChatMessage {
  _id: string;
  roomId: string;
  senderId: string;
  senderName:string;
  message: string;
  timestamp: string;
}

export default function ChatBox({ 
  roomId, 
  currentUser, 
  role 
}: { 
  roomId: string; 
  currentUser: string; 
  role: string;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("fetching messages");
    setIsLoading(true);
    fetchChatHistory(roomId, role)
      .then((msgs) => {
        setMessages(msgs);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));

    socket.emit("joinChatRoom", roomId);

    socket.on("receiveChatMessage", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveChatMessage");
    };
  }, [roomId, role]);

  const sendMessage = () => {
    if (!text.trim()) return;
    socket.emit("sendChatMessage", { 
      roomId, 
      senderId: currentUser, 
      message: text 
    });
    setText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg border border-blue-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-t-lg">
        <h2 className="text-lg font-semibold">Chat</h2>
        <p className="text-xs text-blue-100 mt-1">Room: {roomId}</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-blue-50/30 to-white">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-400">Loading messages...</div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-sm">No messages yet</p>
              <p className="text-xs mt-1">Start the conversation!</p>
            </div>
          </div>
        ) : (
          messages.map((m) => {
            const isCurrentUser = m.senderId === currentUser;
            return (
              <div
                key={m._id}
                className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 shadow-sm ${
                    isCurrentUser
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-sm"
                      : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs font-semibold ${
                        isCurrentUser ? "text-blue-100" : "text-blue-600"
                      }`}
                    >
                      {isCurrentUser ? "You" : m.senderName}
                    </span>
                    <span
                      className={`text-xs ${
                        isCurrentUser ? "text-blue-200" : "text-gray-400"
                      }`}
                    >
                      {formatTime(m.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed break-words">{m.message}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-blue-100 bg-white px-4 py-4 rounded-b-lg">
        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 border border-blue-200 rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <button
            onClick={sendMessage}
            disabled={!text.trim()}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white px-6 py-2.5 rounded-full font-medium transition-all transform hover:scale-105 active:scale-95 disabled:transform-none disabled:cursor-not-allowed shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}