const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userDAO = require("../dao/userDAO");
const generateTokens = require("../utils/generateTokens");

async function registerUser({ fullName, email, password }) {
  const emailAlreadyExists = await userDAO.findUserByEmail(email);
  if (emailAlreadyExists) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userDAO.createUser({
    fullName,
    email,
    password: hashedPassword,
  });

  const { accessToken, refreshToken } = generateTokens(user);
  user.refreshToken = refreshToken;
  await userDAO.saveUser(user);

  return { accessToken, refreshToken };
}

async function loginUser({ email, password }) {
  const user = await userDAO.findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const { accessToken, refreshToken } = generateTokens(user);
  user.refreshToken = refreshToken;
  await userDAO.saveUser(user);

  return { accessToken, refreshToken };
}

async function logoutUser(refreshToken) {
  const user = await userDAO.findUserByRefreshToken(refreshToken);
  if (user) {
    user.refreshToken = null;
    await userDAO.saveUser(user);
  }
}

async function refreshUser(refreshToken) {
  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (err) reject(new Error('Invalid refresh token'));
          else resolve(decoded);
        }
      );
    });

    const user = await userDAO.findUserByRefreshToken(refreshToken);
    if (!user) {
      throw new Error('User not found');
    }

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15min' }
    );

    return accessToken;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshUser
};
