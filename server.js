const { createServer } = require("http");
const express = require("express");
const { Server } = require("socket.io");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.get("/", (req, res, next) => {
  res.status(200).send({ message: "Backend Launched✈️." });
});
app.get("/user", (req, res, next) => {
  res.status(200).send({ name: "Yagnik Akbari", email: "abc@gmail.info" });
});
io.on("connection", (socket) => {
  const count = io.engine.clientsCount;
  console.log("socket", socket?.id, count);

  socket.on("create-foo", (value) => {
    console.log("foovalue", value);
    io.emit("send-foo", value);
  });

  socket.on("disconnect", () => {
    console.log("terminate socket", socket?.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
