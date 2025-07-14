import { useMessage } from "@/contexts/messageContext";
import ChatAreaLoader from "@/components/loaders/ChatAreaLoader";

const ChatArea = () => {
  const { messages, isLoading } = useMessage();

  return (
    <div className="flex-1 px-3 overflow-y-scroll vertical-scrollbar">
      {isLoading ? (
        <ChatAreaLoader />
      ) : messages?.length > 0 ? (
        messages.map((message, index) => {})
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-400">No messages found</p>
        </div>
      )}
    </div>
  );
};

export default ChatArea;
