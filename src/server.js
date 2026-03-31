const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // 🔥 RECEIVE alert from CCTV/AI
  socket.on("send-alert", (alert) => {
    console.log("--- NEW ALERT RECEIVED ---");
    console.log(`TIME: ${alert.timestamp}`);
    console.log(`TYPE: ${alert.crime_type}`);
    console.log(`LOC : ${alert.location}`);

    // 🔥 BROADCAST to all frontend clients
    io.emit("new-alert", alert);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(5000, () => console.log("WebSocket server running on port 5000"));