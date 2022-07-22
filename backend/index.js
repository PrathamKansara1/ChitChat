require('dotenv').config();
const app = require('./app');
const express = require('express')
const connectDatabase = require('./database/db');
const socket = require("socket.io");

app.use(express.json());

connectDatabase();



const server = app.listen(process.env.PORT , () => {
    console.log(`Server is listening on http://localhost:${process.env.PORT}`);
});

const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });