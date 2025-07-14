import ChatBox from "./components/ChatBox";
import ChatSidebar from "./components/ChatSidebar";
import { MessageProvider } from "@/contexts/messageContext";

const ChatPage = () => {
  return (
    <div className="w-full h-dvh flex overflow-y-hidden">
      <MessageProvider>
        <ChatSidebar />
        <ChatBox />
      </MessageProvider>
    </div>
  );
};

export default ChatPage;
