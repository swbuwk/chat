require("dotenv").config()
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/index.js");
const errorMiddleware = require("./middlewares/error_middleware.js");

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use("/api", router)
app.use(errorMiddleware)

const start = async (port) => {
    try {
        app.listen(port, () => console.log(`SERVER STARTED ON PORT ${port}`))
    } catch (e) {
        console.error(e)
    }
}

start(PORT)