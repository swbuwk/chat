const server = require("../index.js")
const {Server} = require("socket.io")
const db = require("../db")

const io = new Server(server, {
    cors: {
        origin: "https://jwt-chat-client.herokuapp.com",
        // origin: "http://localhost:3000",
        credentials: true
    }
})

io.on("connection", (socket) => {
    socket.on("join_room", (data) => {
        socket.join(data)
    })

    socket.on("leave_room", (data) => {
        socket.leave(data)
    })


    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
        socket.emit("receive_message", data)
        db.query("INSERT INTO message (room_id, person_id, content, type) VALUES ($1, $2, $3, $4)", [data.room, data.id, data.message, data.type])
    })
})


module.exports = server