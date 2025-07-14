const messageDAO = require("../dao/messageDAO");
const streamifier = require("streamifier");
const cloudinary = require("../utils/cloudinary");

const getMessages = async (senderId, receiverId) => {
  return await messageDAO.getMessages(senderId, receiverId);
};

const sendMessage = async ({ senderId, receiverId, text, image }) => {
  const uploadFromBuffer = (buffer) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "chatImages",
          eager: ["t_chat_img"]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(buffer).pipe(stream);
    });
  }

  let result;
  if (image){
    result = await uploadFromBuffer(image);
  }

  const newMessage = {
    senderId,
    receiverId,
    text,
    image: result?.public_id || "",
  };
  
  return await messageDAO.sendMessage(newMessage);
};

const deleteMessage = async (messageId, senderId) => {
  const message = await messageDAO.getMessageById(messageId);
  if (!message || message.senderId !== senderId) {
    throw new Error("Message not found or unauthorized");
  }

  await messageDAO.deleteMessage(messageId);
}

module.exports = {
  getMessages,
  sendMessage,
  deleteMessage,
};
