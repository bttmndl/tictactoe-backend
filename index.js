const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://fantastic-swan-79092d.netlify.app",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket)=>{
    console.log(socket.id);
    socket.on("board", (data)=>{
        socket.broadcast.emit("board", data);
    })
    socket.on("currentPlayer", (data) => {
      socket.broadcast.emit("currentPlayer", data);
    });
    socket.on("win", (data) => {
      socket.broadcast.emit("win", data);
    });
    socket.on("draw", (data) => {
      socket.broadcast.emit("draw", data);
    });
    socket.on("currID", (data) => {
      socket.broadcast.emit("currID", data);
    });
})

server.listen(4000, (req, res)=>{
    console.log("server is running at port 4000")
})