const { createServer } = require("http");
const { Server } = require("socket.io");

const hostname = "127.0.0.1";
const port = 5050;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  if (req.url === "/") {
    res.end("Hello, world!");
  } else {
    res.end("This is a basic Node server");
  }
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("socket", socket?.id);

  socket.on("create-foo", (value) => {  
    console.log("foovalue", value);
    io.emit("send-foo", value);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
