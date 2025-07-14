import { useMessage } from "@/contexts/messageContext";
import DisplayPicture from "./DisplayPicture";

const ContactCard = ({ user }) => {
  const { setSelectedUser } = useMessage();

  return (
    <button 
      onClick={() => setSelectedUser(user)}
      className="w-full px-1.5 py-3 flex gap-1.5 rounded-xl cursor-default hover:bg-card-hover">
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
          <p className="font-light text-xs text-second-text">30/04/2025</p>
        </span>
        <p className="max-w-full truncate font-light text-sm text-second-text">
          Last Message is the last message that was sent to the user.
        </p>
      </span>
    </button>
  );
};

export default ContactCard;
