const Router = require("express").Router
const userController = require("../controllers/user_controller.js")
const {body} = require("express-validator")
const authMiddleware = require("../middlewares/auth_middleware.js")

const router = new Router()

router.post("/registration",
    body("email").isEmail(),
    body("password").isLength({min: 8, max: 16}),
    body("name").isLength({min: 2, max: 30}),
    userController.registration)
router.post("/login", userController.login)
router.post("/logout", userController.logout)

router.get("/activate/:link", userController.activate)
router.get("/refresh", userController.refresh)
router.get("/users", authMiddleware, userController.getUsers)
router.get("/users/:id", authMiddleware, userController.getUser)


module.exports = router