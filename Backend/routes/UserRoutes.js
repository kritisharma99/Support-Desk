const express = require("express")
const router = express.Router()
const Controllers = require("../controllers/UserControllers")

//Router
router.post("/",Controllers.registerUser)
router.post("/login",Controllers.loginUser)
// router.post("/login",login)



module.exports = router 