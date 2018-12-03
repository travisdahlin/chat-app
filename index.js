import express from "express";
import socket from "socket.io";

const app = express();
const port = 5000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use(express.static("public"));

const io = socket(server);

io.on("connection", socket => {
  console.log("made socket conneciton", socket.id);

  socket.on("chat", data => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });
});
