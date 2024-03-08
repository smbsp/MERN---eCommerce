const express = require('express');

const { createServer } = require('http');

const SocketIO = require('socket.io');


const app = express();
const server = createServer(app);

// this io is responsible for handling all the socket connections
const io = new SocketIO.Server(server);
// console.log(io);

io.on("connection", (socket)=>{
    console.log(`socket is created -> ${socket.id}`);

    //recieve and event send from the server
    socket.on("message", (data)=>{
     io.emit("recieved_data", data);
    });
});

// it will share all the files that are in src/public folder
app.use(express.static("/src/public"));

app.get('/', (req, res) => {
    res.send("<h1>Web socket Example</h1>")
});

server.listen(3000, ()=>{
    console.log("Server is listening at 3000")
});

