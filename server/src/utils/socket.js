const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://chat-io-tau.vercel.app/"],
    optionsSuccessStatus: 200,
    credentials: true,
  },
});

function getUserSocketId(userId) {
  return userSockets.get(userId) || null;
}

const userSockets = new Map();
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  const userId = socket.handshake.query.userId;
  if (userId) userSockets.set(userId, socket.id);
  console.log(userId, socket.id);
  console.log("Current online users:", Array.from(userSockets.keys()));
  io.emit("onlineUsers", Array.from(userSockets.keys()));

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    userSockets.delete(userId);
    io.emit("onlineUsers", Array.from(userSockets.keys()));
  });
});

module.exports = { io, app, server, getUserSocketId };
