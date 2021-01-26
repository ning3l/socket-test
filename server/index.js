const express = require("express");
const app = express();
const http = require("http");

const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("socket connected");
  socket.join();
  // to get a static id from curr user, not changing socket id's:
  const id = socket.handshake.query.id;
  socket.join();

  // each msg form client goes through here,
  // getting receiver & text for sendMessage func
  socket.on("send-message", ({ recipient, text }) => {
    console.log("sending sth to", recipient);
    socket.broadcast.to(recipient).emit("receive-message", {
      recipient,
      sender: id,
      text,
    });
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`server listens on port ${PORT}`));
