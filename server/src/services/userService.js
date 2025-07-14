const bcrypt = require('bcrypt');
const userDAO = require('../dao/userDAO');
const streamifier = require('streamifier');
const cloudinary = require('../utils/cloudinary');

const searchUsers = async (userId, search) => {
  return userDAO.searchUsers(userId, search);
};

const getUser = async (userId) => {
  return userDAO.getUser(userId);
};

const updateUser = async (userId, updateData) => {
  const {
    fullName,
    username,
    email,
    password,
  } = updateData;

  const user = await userDAO.findUserById(userId);
  if (!user) throw new Error('User does not exist');

  if (fullName) user.fullName = fullName;

  if (email) {
    const duplicate = await userDAO.findUserByEmail(email);
    if (duplicate) throw new Error('Email already exists');
    user.email = email;
  }

  if (username) {
    const duplicate = await userDAO.findUserByUsername(username);
    if (duplicate) throw new Error('Username already exists');
    user.username = username;
  }

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  await user.save();
  return {
    fullName: user.fullName,
    username: user.username,
    email: user.email,
  };
};

const postDisplayPicture = async (userId, imageBuffer) => {
  const user = await userDAO.findUserById(userId);
  if (!user) throw new Error('User does not exist');

  if (user?.profilePic) {
    await cloudinary.uploader.destroy(user.profilePic);
  }

  const uploadFromBuffer = (buffer) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "displayPictures",
          eager: ["t_profile80", "t_profile180"],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(buffer).pipe(stream);
    });
  };

  const result = await uploadFromBuffer(imageBuffer);
  user.profilePic = result.public_id;
  await user.save();
  return result.public_id;
};

const deleteDisplayPicture = async (userId) => {
  const user = await userDAO.findUserById(userId);
  if (!user) throw new Error('User does not exist');

  if (user.profilePic) {
    await cloudinary.uploader.destroy(user.profilePic);
    user.profilePic = "";
    await user.save();
  }
};

module.exports = {
  searchUsers,
  getUser,
  updateUser,
  postDisplayPicture,
  deleteDisplayPicture,
};
