import axiosInstance from "@/utils/axiosInstance";

const getMessages = async (userId) => {
  try {
    const response = await axiosInstance.get(`api/message/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const sendMessage = async (userId, formData) => {
  try {
    const response = await axiosInstance.post(`api/message/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

const deleteMessage = async (messageId) => {
  try {
    const response = await axiosInstance.delete(`api/message/${messageId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
};

const messageAPI = {
  getMessages,
  sendMessage,
  deleteMessage,
};

export default messageAPI;
