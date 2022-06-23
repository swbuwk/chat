const Router = require("express").Router
const userController = require("../controllers/user_controller.js")
const {body} = require("express-validator")
const authMiddleware = require("../middlewares/auth_middleware.js")
const db = require("../db")
const chatController = require("../controllers/chat_controller.js")

const router = new Router()

router.post("/registration",
    body("email").isEmail(),
    body("password").isLength({min: 8, max: 16}),
    body("name").isLength({min: 2, max: 30}),
    userController.registration)
router.post("/login", userController.login)
router.post("/logout", userController.logout)
router.get("/refresh", userController.refresh)

router.get("/activate/:link", userController.activate)
router.post("/activate/send/:id",  authMiddleware, userController.sendActivationLink)

router.get("/users", authMiddleware, userController.getUsers)
router.get("/users/:id", authMiddleware, userController.getUser)

router.get("/chat/rooms", authMiddleware, chatController.getPublicRooms)
router.get("/chat/rooms/:id", authMiddleware, chatController.getPrivateRooms)
router.post("/chat/:room", authMiddleware, chatController.createRoom)
router.get("/chat/:room", authMiddleware, chatController.getRoom)
router.get("/chat/:room/messages", authMiddleware, chatController.getRoomMessages)
router.get("/chat/:room/members", authMiddleware, chatController.getRoomMembers)
router.post("/chat/:room/members", authMiddleware, chatController.addMemberToRoom)
router.delete("/chat/:room/members", authMiddleware, chatController.deleteMemberFromRoom)

module.exports = router