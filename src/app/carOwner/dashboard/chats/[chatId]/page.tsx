import ChatBox from "@/components/ChatBox";

export default function OwnerChatPage({ params }: { params: { chatId: string } }) {
  const currentUser = "owner123"; // later from auth
  return (
    <div>
      <h1>Chat with Customer</h1>
      <ChatBox roomId={params.chatId} currentUser={currentUser} />
    </div>
  );
}