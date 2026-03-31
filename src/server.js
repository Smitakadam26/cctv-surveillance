const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(express.json({ limit: '50mb' }));

app.post('/api/alerts', (req, res) => {
  const alert = req.body;
    console.log(req.body);
  console.log("--- NEW ALERT RECEIVED ---");
  console.log(`TIME: ${alert.timestamp}`);
  console.log(`TYPE: ${alert.crime_type}`);
  console.log(`LOC : ${alert.location}`);

  io.emit("new-alert", alert);

  res.status(201).json({ message: "Alert processed successfully" });
});

server.listen(5000, () => console.log('Server running on port 5000'));