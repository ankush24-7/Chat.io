const Message = require("../models/Message");

const findMessageById = async (messageId) => {
  try {
    const message = await Message.findById(messageId);
    if (!message) {
      throw new Error("Message not found");
    }
    return message;
  } catch (error) {
    throw new Error("Could not find message");
  }
};

const getMessages = async (senderId, receiverId) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });

    return messages;
  } catch (error) {
    throw new Error("Could not fetch messages");
  }
};

const sendMessage = async (newMessage) => {
  try {
    const message = new Message(newMessage);
    await message.save();
  } catch (error) {
    throw new Error("Could not send message");
  }
};

const deleteMessage = async (messageId) => {
  try {
    const result = await Message.findByIdAndDelete(messageId);
    if (!result) {
      throw new Error("Message not found");
    }
    return result;
  } catch (error) {
    throw new Error("Could not delete message");
  }
};

module.exports = {
  getMessages,
  sendMessage,
  deleteMessage,
  findMessageById,
};
