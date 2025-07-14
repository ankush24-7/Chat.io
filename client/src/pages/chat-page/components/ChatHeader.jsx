import { Close } from "@/assets/icons/icons";
import { useMessage } from "@/contexts/messageContext";
import DisplayPicture from "@/components/ui/DisplayPicture";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useMessage();

  return (
    <div className="flex items-center justify-between py-2 px-4 border-b border-b-white/10">
      <span className="h-full flex gap-2 items-center">
        <DisplayPicture
          radius="40px"
          color={selectedUser.color}
          name={selectedUser.fullName}
          publicId={selectedUser.profilePic}
        />

        <span className="flex flex-col h-full justify-center gap-1">
          <p className="leading-4 text-white">
            {selectedUser.username}
          </p>
          <p className="text-xs text-second-text">
            {selectedUser?.status || ""}
          </p>
        </span>
      </span>

      <button 
        onClick={() => setSelectedUser(null)}
        className="p-1 rounded-full cursor-pointer hover:bg-card-hover/80" aria-label="Close chat">
        <Close />
      </button>
    </div>
  );
};

export default ChatHeader;
