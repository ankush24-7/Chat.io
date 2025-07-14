import ChatArea from "./ChatArea";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import { useMessage } from "@/contexts/messageContext";

const ChatBox = () => {
  const { selectedUser } = useMessage();

  return (
    <div className="w-full h-full bg-second-dark">
      <div className="w-full h-full rounded-tl-xl rounded-br-xl bg-[#111]">
        {selectedUser ? (
          <div className="h-full w-full flex flex-col justify-between">
            <ChatHeader />
            <ChatArea />
            <ChatInput />
          </div>
        ) : (
          <div className="flex flex-col gap-2 items-center h-full">
            <p className="text-4xl mt-60 text-second-text">
              Welcome to Chat.io!
            </p>
            <p className="tracking-wide text-second-text">
              Select a user to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
