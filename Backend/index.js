
const express = require("express");
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io")

const app = express();
app.use(cors());



const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000", "https://mern-stack-real-time-chat-applicati-six.vercel.app/chat"
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx

app.get("/", (req, res) =>{
    res.send("hello Its working"); res.end()
})



    socket.on("joinRoom", room => {socket.join(room)

    } )

    socket.on("newMassage", ({newMassage, room })=>{
        console.log(room ,newMassage)
        io.in(room).emit("getLatestMassage", newMassage)

    })
  });

const port = process.env.PORT || 8000

server.listen(port, () =>{
    console.log(`hello Gaurav hello ${port}` )
})
