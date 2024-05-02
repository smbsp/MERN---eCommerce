const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

// Creates an Express application instance that will handle standard HTTP requests and responses.
// This allows you to serve web pages, static files, or create REST APIs.
const app = express();

app.use(express.static('src/public/wsClient'));

// Creates an HTTP server using the app Express application.
// This HTTP server will handle all incoming HTTP requests, including WebSocket upgrade requests.
const httpServer = createServer(app);

// Initializes a Socket.IO server and attaches it to the httpServer.
// This setup allows Socket.IO to handle WebSocket connections, manage client-server communication, and use the same server for both HTTP and WebSocket protocols.
const io = new Server(httpServer);

let room;

io.on('connection', (socket) => {
    console.log('a user connected ->', socket.id);

    socket.on("message", (data) => {
        console.log("recieved message -> ", data);
        socket.broadcast.emit("broadcast", data);
    });

    socket.on("create_grp", (roomid) => {
        console.log("group is created -> ", roomid);

        room = roomid;
        socket.join(roomid);
    })

    socket.on("join_room", () => {
        console.log(socket.id + 'joined the room', room);
        socket.join(room);
    });

    socket.on("grp_message", (data) => {
        console.log("grp_message", data);
        // console.log(socket.to(room));
        socket.to(room).emit("serv_grp_message", data);
    });

    // Assigment: How to leave a group?
    // Complete this part 

    // Add an event listener for "exit_grp" event
    socket.on("exit_grp", () => {
        console.log(socket.id + ' is leaving the room', room);
        socket.leave(room);

        // Optionally, notify the rest of the group
        socket.to(room).emit('serv_grp_message', `${socket.id} has left the room`);
    });

    // setInterval(()=>{
    //     socket.emit("message", "Message form server" + socket.id + "at" + new Date());
    // }, 2000);

    // socket.on("disconnect", ()=>{
    //     console.log(" user disconneted ->", socket.id);
    // })
});


// app.use('/', (req, res) => {
//     res.send('<h1>Web socket Example</h1>')
// });

httpServer.listen(3000, () => {
    console.log("Server is listening at 3000")
});
