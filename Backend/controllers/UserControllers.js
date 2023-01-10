
const bcrypt = require("bcryptjs")
const User = require("../models/User")
 /*********************************************
 * @registerUser a function handles sign up activity
 * @route /api/user/
 * @description 
 * @Access Public
 ********************************************/
const registerUser = async(req,res)=>{
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields')
    }

    //User already existss
}
 /*********************************************
 * @loginUser a function handles sign up activity
 * @route /api/user/
 * @description
 * @Access Public
 ********************************************/
const loginUser = async(req,res)=>{
    res.send("Login Route!!")
}

module.exports = {
    registerUser,
    loginUser}
    