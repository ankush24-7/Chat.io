import userAPI from "@/services/api/userAPI";
import { useNavigate } from "react-router-dom";
import SpinLoader from "@/components/loaders/SpinLoader";
import { useEffect, useState, useContext, createContext } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await userAPI.getUser();
        if (!response.user) {
          navigate("/", { replace: true });
          return;
        }

        const filteredUser = {
          _id: response.user._id,
          fullName: response.user.fullName,
          color: response.user.color,
          email: response.user.email,
          username: response.user.username,
          profilePic: response.user.profilePic,
        };
        setUser(filteredUser);
        setContacts(response.user.contacts);
        setRequests(response.user.requests);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        contacts,
        setContacts,
        requests,
        setRequests,
      }}>

      {isLoading ? (
        <div className="w-full h-dvh flex items-center justify-center bg-gradient-to-b from-grad-top to-grad-bottom">
          <SpinLoader width="50px" height="50px" />
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};
