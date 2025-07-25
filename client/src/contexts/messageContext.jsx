import { useSocket } from "./socketContext";
import messageAPI from "@/services/api/messageAPI";
import { useEffect, useState, useContext, createContext } from "react";

const MessageContext = createContext();

export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const subscribeToMessages = () => {
    if (!selectedUser || !socket) return;

    socket.off("newMessage");
    
    socket.on("newMessage", (message) =>{
      if (message.senderId !== selectedUser._id) return;
      setMessages((prevMessages) => [...prevMessages, message])
    });
  };

  const unsubscribeFromMessages = () => {
    if(socket) socket.off("newMessage");
  }

  const getMessages = async () => {
    setIsLoading(true);
    try {
      const response = await messageAPI.getMessages(selectedUser?._id);
      setMessages(response.messages);
      subscribeToMessages();
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (formData) => {
    try {
      const response = await messageAPI.sendMessage(selectedUser._id, formData);
      setMessages((prevMessages) =>
        Array.isArray(prevMessages)
          ? [...prevMessages, response.newMessage]
          : [response.newMessage]
      );
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        setMessages,
        getMessages,
        isLoading,
        setIsLoading,
        selectedUser,
        setSelectedUser,
        sendMessage,
        subscribeToMessages,
        unsubscribeFromMessages,
      }}>
      {children}
    </MessageContext.Provider>
  );
};
