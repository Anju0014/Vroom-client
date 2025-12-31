

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchOwnerChats } from "@/services/common/chatService";

export default function OwnerChatsPage() {
  const [chats, setChats] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchOwnerChats()
      .then((data) => {
        setChats(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  // Group messages by bookingId
  const chatsByBooking: Record<string, any[]> = {};
  chats.forEach((msg) => {
    if (!chatsByBooking[msg.roomId]) chatsByBooking[msg.roomId] = [];
    chatsByBooking[msg.roomId].push(msg);
  });

  const getLastMessage = (messages: any[]) => {
    if (messages.length === 0) return null;
    const sorted = [...messages].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    return sorted[0];
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
            Active Chats
          </h1>
          <p className="text-gray-600">Manage your customer conversations</p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading chats...</p>
          </div>
        ) : Object.keys(chatsByBooking).length === 0 ? (
          // Empty State
          <div className="bg-white rounded-xl shadow-md p-12 text-center border border-blue-100">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-yellow-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No chats yet</h3>
            <p className="text-gray-600">When customers message you, they'll appear here</p>
          </div>
        ) : (
          // Chat List
          <div className="space-y-3">
            {Object.keys(chatsByBooking)
              .sort((a, b) => {
                const lastMsgA = getLastMessage(chatsByBooking[a]);
                const lastMsgB = getLastMessage(chatsByBooking[b]);
                if (!lastMsgA || !lastMsgB) return 0;
                return new Date(lastMsgB.timestamp).getTime() - new Date(lastMsgA.timestamp).getTime();
              })
              .map((bookingId) => {
                const messages = chatsByBooking[bookingId];
                const lastMessage = getLastMessage(messages);

                return (
                  <Link
                    key={bookingId}
                    href={`/carOwner/dashboard/chats/${bookingId}`}
                    className="block group"
                  >
                    <div className="bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-yellow-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-blue-100 hover:border-blue-300">
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>

                        {/* Chat Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                Booking #{bookingId}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                  </svg>
                                  {messages.length} {messages.length === 1 ? 'message' : 'messages'}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end gap-2">
                              {lastMessage && (
                                <span className="text-xs text-gray-500 font-medium">
                                  {formatTimestamp(lastMessage.timestamp)}
                                </span>
                              )}
                              <div className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">
                                Active
                              </div>
                            </div>
                          </div>

                          {/* Last Message Preview */}
                          {lastMessage && (
                            <div className="bg-gray-50 rounded-lg p-3 group-hover:bg-white transition-colors">
                              <p className="text-sm text-gray-600 line-clamp-2">
                                <span className="font-medium text-gray-700">{lastMessage.senderId}: </span>
                                {lastMessage.message}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Arrow Icon */}
                        <div className="flex-shrink-0 self-center">
                          <svg 
                            className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}