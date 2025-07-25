import DisplayPicture from "./DisplayPicture";
import { useSocket } from "@/contexts/socketContext";
import { useMessage } from "@/contexts/messageContext";

const ContactCard = ({ user }) => {
  const { onlineUsers } = useSocket();
  const { setSelectedUser } = useMessage();

  return (
    <button 
      onClick={() => setSelectedUser(user)}
      className="w-full px-1.5 py-3 flex gap-1.5 rounded-xl cursor-default bg-card hover:bg-card-hover">
      <DisplayPicture
        radius="40px"
        color={user?.color || "#B1401B"}
        name={user?.fullName || ""}
        publicId={user?.profilePic || ""}
      />
      <span className="w-[calc(100%-46px)] h-full flex flex-col items-start justify-between">
        <span className="w-full flex justify-between items-baseline">
          <p className="max-w-3/5 text-ellipsis overflow-hidden whitespace-nowrap text-sm leading-none text-prim-text">
            {user.username}
          </p>
          {/* <p className="font-light text-xs text-second-text">30/04/2025</p> */}
        </span>
        <p className="max-w-full truncate font-light text-sm text-second-text">
          {onlineUsers.includes(user._id) ? "Online" : "Offline"}
        </p>
      </span>
    </button>
  );
};

export default ContactCard;
