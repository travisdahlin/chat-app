const express = require("express");
const socket = require("socket.io");
// import express from "express";

const app = express();
const port = 5000;
const server = app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

app.use(express.static("public"));

const io = socket(server);

io.on("connection", function(socket) {
  console.log("made socket conneciton", socket.id);

  socket.on("chat", function(data) {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", function(data) {
    socket.broadcast.emit("typing", data);
  });
});
