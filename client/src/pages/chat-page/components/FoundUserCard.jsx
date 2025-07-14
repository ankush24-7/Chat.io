import { useState } from "react";
import contactAPI from "@/services/api/contactAPI";
import SpinLoader from "@/components/loaders/SpinLoader";
import DisplayPicture from "@/components/ui/DisplayPicture";

const FoundUserCard = ({ user, label }) => {
  const [text, setText] = useState(label);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async () => {
    setIsLoading(true);
    const response = await contactAPI.sendRequest(user._id);
    if (response.status === 200) setText("Requested");
    setIsLoading(false);
  };

  const handleCancel = async () => {
    setIsLoading(true);
    const response = await contactAPI.cancelRequest(user._id);
    if (response.status === 200) setText("Add");
    setIsLoading(false);
  };

  return (
    <div className="w-full flex justify-between items-center p-2 border-b border-white/20">
      <div className="flex items-center gap-2">
        <DisplayPicture
          radius="40px"
          color={user.color}
          name={user.fullName}
          publicId={user.profilePic}
        />
        <span className="flex flex-col gap-0.5">
          <p className="leading-none text-white">{user.username}</p>
          <p className="text-sm text-gray-300">{user.fullName}</p>
        </span>
      </div>

      {isLoading ? (
        <SpinLoader width="24px" height="24px" />
      ) : (
        <span className="flex gap-3">
          {text === "Add" && (
            <button
              onClick={handleAdd}
              className="px-2.5 py-1 rounded-lg cursor-pointer text-prim-text bg-prim-accent hover:scale-101">
              Add
            </button>
          )}

          {text === "Requested" && (
            <button
              onClick={handleCancel}
              className="px-2 py-1 rounded-lg cursor-pointer hover:scale-101 text-prim-text border-1 border-white">
              Requested
            </button>
          )}
        </span>
      )}
    </div>
  );
};

export default FoundUserCard;
