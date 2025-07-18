import { useUser } from "@/contexts/userContext";
import formatDateTime from "@/utils/formatDateTime";
import { useMessage } from "@/contexts/messageContext";
import ChatAreaLoader from "@/components/loaders/ChatAreaLoader";

const ChatArea = () => {
  const { user } = useUser();
  const { messages, isLoading, selectedUser } = useMessage();

  const messageBubble = (message, received) => {
    const myColor = user.color;
    const otherColor = selectedUser?.color;
    return (
      <div 
        key={message._id} 
        style={{alignItems: received ? "self-start" : "self-end"}}
        className="w-full flex flex-col gap-0.5">
        {message.image ? (
          <div 
            style={{backgroundColor: received ? otherColor : myColor}}
            className="max-w-1/2 relative rounded-lg flex flex-col">
            <img 
              src={`https://res.cloudinary.com/dcm0pdfet/image/upload/t_chat_img/${message.image}`}
              alt="message-image"
              className="rounded-lg m-2"
            />
            <div className="relative pr-9 pl-2 pb-2">
              <p className="leading-5 text-white">{message.text}</p>
              <span className="absolute bottom-0 right-1 text-[10px] leading-3 text-second-text">{formatDateTime.formatTime(message.createdAt)}</span>
            </div>
          </div>
        ) : (
          <div 
            style={{backgroundColor: received ? otherColor : myColor}}
            className="max-w-1/2 relative p-2 pr-9 rounded-lg">
            <p className="leading-5 text-white">{message.text}</p>
            <span className="absolute bottom-0 right-1 text-[10px] leading-4 text-second-text">{formatDateTime.formatTime(message.createdAt)}</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex-1 pl-4 pr-3 overflow-y-scroll vertical-scrollbar">
      {isLoading ? (
        <ChatAreaLoader />
      ) : messages?.length > 0 ? (
        <div className="w-full flex flex-col gap-2 py-1">
          {messages.map((message) => {
            const received = message.senderId === selectedUser?._id;
            return messageBubble(message, received);
          })} 
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-second-text">No messages found</p>
        </div>
      )}
    </div>
  );
};

export default ChatArea;
