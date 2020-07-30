// importing dependencies
const express = require("express");
const http = require("http");

//creating server
const app = express();
const server = http.createServer(app);

//creating socket.io instace
const socket = require("socket.io");
const io = socket(server);

const rooms = {};

// creating room with the URL or joining the room
io.on("connection", socket => {
    //creating or joining room
    socket.on("join room", roomID => {
        if (rooms[roomID]) {
            rooms[roomID].push(socket.id);
        } else {
            rooms[roomID] = [socket.id];
        }

        const otherUser = rooms[roomID].find(id => id !== socket.id);
        if (otherUser) {
            socket.emit("other user", otherUser);
            socket.to(otherUser).emit("user joined", socket.io);
        }
    });

    // offer a connection
    socket.on("offer",payload => {
        io.to(payload.target).emit("offer",payload);
    });

    socket.on("answer",payload =>{
        io.to(payload.target).emit("answer",payload);
    });

    socket.on("ice-candidate",incoming => {
        io.to(incoming.target).emit("ice-candidate",incoming.candidate);
    });

});

server.listen(8000, () => console.log('Server is running in port 8000'));
