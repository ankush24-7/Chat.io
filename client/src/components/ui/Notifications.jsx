import { useEffect, useState } from "react";
import { Bell } from "@/assets/icons/icons";
import DropDown from "../dropdowns/DropDown";
import useDropDown from "@/hooks/useDropDown";
import SpinLoader from "../loaders/SpinLoader";
import { useUser } from "@/contexts/userContext";
import NotificationCard from "./NotificationCard";

const Notifications = () => {
  const { requests } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const { isOpen, setIsOpen, dropdownRef } = useDropDown();

  useEffect(() => {
    const getNotifications = async () => {
      try {
        if (!requests) return;
        requests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const alertCards = requests.map((req, i) => (
          <NotificationCard key={i} req={req} />
        ));
        setNotifications(alertCards);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getNotifications();
  }, [requests]);

  const bellStroke = requests.length === 0 && "white";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-1.5 rounded-full cursor-pointer hover:bg-card-hover">
        <Bell className={`stroke-${bellStroke}`} />
        {requests.length > 0 && (
          <span className="absolute right-0.5 top-1 h-2 w-2 rounded-full bg-gradient-to-r from-accent-left to-accent-right"></span>
        )}
      </button>

      {isOpen && (
        <DropDown
          width="24rem"
          position="bottom-right"
          bgColor="#242526"
          header="Notifications"
          setIsOpen={setIsOpen}
          children={
            <div className="h-80 max-h-80 rounded-b-xl overflow-y-scroll vertical-scrollbar bg-card-hover">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <SpinLoader width={20} height={20} />
                </div>
              ) : (
                <div className="flex flex-col p-1 gap-1">
                  {notifications.length > 0 ? (
                    notifications
                  ) : (
                    <p className="text-center mt-28 text-gray-400">
                      No new notifications
                    </p>
                  )}
                </div>
              )}
            </div>
          }
        />
      )}
    </div>
  );
};

export default Notifications;
