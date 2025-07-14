import authAPI from "@/services/api/authAPI";
import DropDown from "../dropdowns/DropDown";
import useDropDown from "@/hooks/useDropDown";
import DisplayPicture from "./DisplayPicture";
import { useUser } from "@/contexts/userContext";
import { Link, useNavigate } from "react-router-dom";
import { Profile, Logout } from "@/assets/icons/icons";

const User = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { isOpen, setIsOpen, dropdownRef } = useDropDown();

  const handleLogout = async () => {
    await authAPI.logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full cursor-pointer"
        aria-label="display picture">
        <DisplayPicture
          radius="40px"
          color={user?.color || "#B1401B"}
          name={user?.fullName || ""}
          publicId={user?.profilePic || ""}
        />
      </button>

      {isOpen && (
        <DropDown
          showHeader={false}
          position="bottom-right"
          children={
            <div className="flex flex-col p-0.75 rounded-xl bg-card-hover">
              <Link to={`/profile/${user?._id}`}>
                <button onClick={() => setIsOpen(false)} className="w-full flex gap-2 pl-2 pr-4 py-2 items-center whitespace-nowrap cursor-pointer rounded-xl text-white hover:bg-second-dark">
                  <Profile className="w-5 h-5 stroke-white" />
                  <p>My Profile</p>
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex gap-2 pl-2 pr-4 py-2 items-center whitespace-nowrap cursor-pointer rounded-xl text-white hover:bg-second-dark">
                <Logout className="w-5 h-5 stroke-white" />
                <p>Logout</p>
              </button>
            </div>
          }
        />
      )}
    </div>
  );
};

export default User;
