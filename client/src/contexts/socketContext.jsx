import { io } from "socket.io-client";
import { useState, createContext, useContext } from "react";

const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const baseURL =
    process.env.NODE_ENV === "production"
      ? "https://chat-io-backend-jhed.onrender.com"
      : "http://localhost:3000";

  const connectSocket = (userId) => {
    if (socket && socket.connected) return;
    const newSocket = io(baseURL, {
      query: {
        userId: userId,
      },
    });

    newSocket.connect();
    setSocket(newSocket);

    newSocket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });
  };

  const disconnectSocket = () => {
    if (socket && socket.connected) {
      socket.disconnect();
      setSocket(null);
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        onlineUsers,
        setOnlineUsers,
        connectSocket,
        disconnectSocket,
      }}>
      {children}
    </SocketContext.Provider>
  );
};
