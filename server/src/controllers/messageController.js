const { io, getUserSocketId } = require("../utils/socket");
const messageService = require("../services/messageService");

const getMessages = async (req, res) => {
  const { id: receiverId } = req.params;
  const senderId = req.user.userId;
  if (!receiverId || !senderId) {
    return res
      .status(400)
      .json({ message: "Contact ID and sender ID are required" });
  }
  if (receiverId === senderId) {
    return res.status(400).json({ message: "Cannot get messages with self" });
  }

  try {
    const messages = await messageService.getMessages(senderId, receiverId);
    return res.json({ messages });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const sendMessage = async (req, res) => {
  const { id: receiverId } = req.params;
  const senderId = req.user.userId;
  const { text } = req.body;
  const image = req.file;

  if (!receiverId || !senderId) {
    return res
      .status(400)
      .json({ message: "Receiver ID and sender ID are required" });
  }
  if (receiverId === senderId) {
    return res.status(400).json({ message: "Cannot send message to self" });
  }
  
  try {
    const newMessage = await messageService.sendMessage({
      senderId,
      receiverId,
      text,
      image: image ? image.buffer : null,
    });

    const receiverSocketId = getUserSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(200).json({ newMessage });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteMessage = async (req, res) => {
  const { id: messageId } = req.params;
  const senderId = req.user.userId;

  if (!messageId || !senderId) {
    return res.status(400).json({ message: "Message ID and sender ID are required" });
  }

  try {
    await messageService.deleteMessage(messageId, senderId);
    return res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getMessages,
  sendMessage,
  deleteMessage,
};
