
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
    const userExists = await User.findOne({email})

    if(userExists){
        return res.status(400).json({
            message: "User already present"
        })
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //create user
    const user = User.create({
        name,
        email,
        password:hashedPassword
    })
    //if user were created 
    if(user){
        res.status(200).json({
            _id:(await user).id,
            name: (await user).name,
            email: (await user).email,
            //token
            message: "User successfully created"
        })
    }
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
    