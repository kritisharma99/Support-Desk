const express = require("express")
const router = express.Router()
const Controllers = require("../controllers/UserControllers")
const {protect} = require("../middleware/authMiddleware")

//Router
router.post("/",Controllers.registerUser)
router.post("/login",Controllers.loginUser)
router.get("/dashboard",protect,Controllers.dashboard)
// router.post("/login",login)



module.exports = router 