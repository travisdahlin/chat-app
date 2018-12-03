"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _socket = require("socket.io");

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const express = require("express");
// const socket = require("socket.io");
var app = (0, _express2.default)();
var port = 5000;
var server = app.listen(port, function () {
  console.log("Listening on port " + port);
});

app.use(_express2.default.static("public"));

var io = (0, _socket2.default)(server);

io.on("connection", function (socket) {
  console.log("made socket conneciton", socket.id);

  socket.on("chat", function (data) {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});