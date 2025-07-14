const contactService = require("../services/contactService");

const sendRequest = async (req, res) => {
  const receiverId = req.params.receiverId;
  const senderId = req.user.userId;

  if (!receiverId || !senderId) {
    return res.status(400).json({ message: "Receiver ID and Sender ID are required." });
  }

  try {
    await contactService.sendRequest(senderId, receiverId);
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const cancelRequest = async (req, res) => {
  const receiverId = req.params.receiverId; 
  const senderId = req.user.userId;

  if (!receiverId || !senderId) {
    return res.status(400).json({ message: "Receiver ID and Sender ID are required." });
  }

  try {
    await contactService.cancelRequest(senderId, receiverId);
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const acceptRequest = async (req, res) => {
  const senderId = req.params.senderId;
  const receiverId = req.user.userId;

  try {
    await contactService.acceptRequest(senderId, receiverId);
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const dismissRequest = async (req, res) => {
  const senderId = req.params.senderId;
  const receiverId = req.user.userId;

  try {
    await contactService.dismissRequest(senderId, receiverId);
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });  
  }
};

module.exports = {
  sendRequest,
  cancelRequest,
  acceptRequest,
  dismissRequest,
};
