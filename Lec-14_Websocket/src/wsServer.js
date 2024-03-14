const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();

app.use(express.static('src/public/wsClient'));

const httpServer = createServer(app);

const io = new Server(httpServer);

let room;

io.on('connection', (socket)=>{
   console.log('a user connected ->', socket.id);

   socket.on("message", (data)=>{
       console.log("recieved message -> ", data);
       socket.broadcast.emit("broadcast", data);
   });

   socket.on("create_grp", (roomid)=>{
        console.log("group is created -> ", roomid);

        room = roomid;
        socket.join(roomid);
   })

   socket.on("join_room", ()=>{
        console.log(socket.id + 'joined the room', room);
        socket.join(room);
   });

   socket.on("grp_message", (data)=>{
        console.log("grp_message", data);
        // console.log(socket.to(room));
        socket.to(room).emit("serv_grp_message", data);
   });

   // Assigment: How to leave a group?
   // Complete this part 

    // setInterval(()=>{
    //     socket.emit("message", "Message form server" + socket.id + "at" + new Date());
    // }, 2000);

    // socket.on("disconnect", ()=>{
    //     console.log(" user disconneted ->", socket.id);
    // })
});


app.use('/', (req, res)=> {
    res.send('<h1>Web socket Example</h1>')
});

httpServer.listen(3000, () => {
    console.log("Server is listening at 3000")
});
