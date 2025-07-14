import { useUser } from "@/contexts/UserContext";
import contactAPI from "@/services/api/contactAPI";
import DisplayPicture from "@/components/ui/DisplayPicture";

export function NotificationCard({ req }) {
  const { requests, setRequests, setContacts } = useUser();

  const updateRequests = () => setRequests((prev) => prev.filter((r) => r.sender._id !== req.sender._id));

  const handleAccept = async () => {
    await contactAPI.acceptRequest(req.sender._id);
    setContacts((prev) => [...prev, req.sender]);
    updateRequests();
  };

  const handleDismiss = async () => {
    await contactAPI.dismissRequest(req.sender._id);
    updateRequests();
  };

  return (
    <div className="flex items-center justify-between px-1 py-2 border-b border-white/20">
      <span className="flex items-center gap-2">
        <DisplayPicture 
          radius="40px"
          color={req.sender.color}
          name={req.sender.fullName}
          publicId={req.sender.profilePic}
        />
        <p className="max-w-40 line-clamp-2 leading-5 text-white">
          <span className="font-medium">{req.sender.username}</span> wants to chat with you!
        </p>
      </span>

      <span className="flex gap-1.5">
        <button
          onClick={handleAccept}
          className="px-2 py-1 rounded-lg cursor-pointer hover:scale-101 text-white bg-prim-accent">
          Accept
        </button>
        <button
          onClick={handleDismiss}
          className="px-2 py-1 rounded-lg cursor-pointer hover:scale-101 border border-white text-white hover:bg-red-600 hover:border-red-600">
          Dismiss
        </button>
      </span>
    </div>
  );
};

export default NotificationCard;