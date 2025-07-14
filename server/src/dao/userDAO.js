const User = require("../models/User");

const saveUser = async (user) => {
  return await user.save();
}

const createUser = async (userData) => {
  console.log("Creating user with data:", userData);
  const newUser = new User(userData);
  return await newUser.save();
}

const searchUsers = async (excludeUserId, search) => {
  const filter = {
    $or: [
      { "fullName": { $regex: `^${search}`, $options: "i" } },
      { username: { $regex: search, $options: "i" } },
    ],
    _id: { $ne: excludeUserId },
  };

  return User.find(filter)
    .select("-password -refreshToken")
    .populate("contacts", "fullName username")
    .populate("requests.sender", "fullName username")
    .lean()
    .exec();
};

const getUser = async (userId) => {
  return User.findById(userId)
    .select("-password -refreshToken")
    .populate("contacts", "color fullName username")
    .populate("requests.sender", "color fullName username")
    .lean()
    .exec();
};

const findUserById = async (userId) => {
  return User.findById(userId).exec();
}

const findUserByEmail = async (email) => {
  return await User.findOne({ email }).exec();
}

const findUserByUsername = async (username) => {
  return await User.findOne({ username }).lean().exec();
}

const findUserByRefreshToken = async (refreshToken) => {
  return await User.findOne({ refreshToken }).exec();
}

const findUserByEmailOrUsername = async (input) => {
  if (input.includes("@")) {
    return await User.findOne({ email: input }).exec();
  } else {
    return await User.findOne({ username: input }).exec();
  }
}

const createRequest = async (receiverId, request) => {
  const reciever = await User.findById(receiverId).exec();
  if (!reciever) {
    throw new Error("Receiver not found");
  }
  reciever.requests.push(request);
  return await reciever.save();
}

const cancelRequest = async (senderId, receiverId) => {
  const receiver = await User.findById(receiverId).exec();
  if (!receiver) {
    throw new Error("Receiver not found");
  }

  const newRequests = receiver.requests.filter(req => req.sender.toString() !== senderId);
  receiver.requests = newRequests;
  return await receiver.save();
}

module.exports = {
  getUser,
  saveUser,
  createUser,
  searchUsers,
  findUserById,
  createRequest,
  cancelRequest,
  findUserByEmail,
  findUserByUsername,
  findUserByRefreshToken,
  findUserByEmailOrUsername,
};
