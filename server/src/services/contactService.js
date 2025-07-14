const userDAO = require("../dao/userDAO");

const sendRequest = async (senderId, receiverId) => {
  const request = {
    sender: senderId,
  };
  return await userDAO.createRequest(receiverId, request);
};

const cancelRequest = async (senderId, receiverId) => {
  return await userDAO.cancelRequest(senderId, receiverId);
}

const acceptRequest = async (senderId, receiverId) => {
  const sender = await userDAO.findUserById(senderId);
  const receiver = await userDAO.findUserById(receiverId);
  if (!sender || !receiver) {
    throw new Error("Sender or Receiver not found");
  }
  receiver.contacts.push(senderId);
  sender.contacts.push(receiverId);
  receiver.requests = receiver.requests.filter(req => req.sender.toString() !== senderId);
  await userDAO.saveUser(sender);
  await userDAO.saveUser(receiver);
}

const dismissRequest = async (senderId, receiverId) => {
  const receiver = await userDAO.findUserById(receiverId);
  if (!receiver) {
    throw new Error("Receiver not found");
  }
  receiver.requests = receiver.requests.filter(req => req.sender.toString() !== senderId);
  await userDAO.saveUser(receiver);
}

module.exports = {
  sendRequest,
  cancelRequest,
  acceptRequest,
  dismissRequest,
};
