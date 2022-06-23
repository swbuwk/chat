require("dotenv").config()
const http = require("http")
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/index.js");
const errorMiddleware = require("./middlewares/error_middleware.js");

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors({
    origin: "https://jwt-chat-client.herokuapp.com",
    // origin: "http://localhost:3000",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use("/api", router)
app.use(errorMiddleware)

module.exports = http.createServer(app)

const server = require("./chat/index")

const start = async (port) => {
    try {
        server.listen(port, () => console.log(`SERVER STARTED ON PORT ${port}`))
    } catch (e) {
        console.error(e);
    }
}

start(PORT)
