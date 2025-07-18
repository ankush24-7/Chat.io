import messageAPI from "@/services/api/messageAPI";
import { useEffect, useState, useContext, createContext } from "react";

const MessageContext = createContext();

export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      setIsLoading(true);
      try {
        const response = await messageAPI.getMessages(selectedUser?._id);
        setMessages(response.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getMessages();
  }, [selectedUser]);

  const sendMessage = async (formData) => {
    try {
      const response = await messageAPI.sendMessage(selectedUser._id, formData);
      setMessages((prevMessages) => Array.isArray(prevMessages) ? [...prevMessages, response.newMessage] : [response.newMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }

  return (
    <MessageContext.Provider
      value={{
        messages,
        setMessages,
        isLoading,
        setIsLoading,
        selectedUser,
        setSelectedUser,
        sendMessage,
      }}>

      {children}
    </MessageContext.Provider>
  );
};
