
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const JWT = require("jsonwebtoken")

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
            token: generateToken((await user).id),
            message: "User successfully created"
        })
    }else{
        res.status(400)
        throw new Error("User not created!")
    }
}
 /*********************************************
 * @loginUser a function handles sign up activity
 * @route /api/user/
 * @description
 * @Access Public
 ********************************************/
const loginUser = async(req,res)=>{
    const {email,password} = req.body

    if(!email || !password){
        res.status(400)
        throw new Error("please enter email and password!")
    }
    //check user exixts or not
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password,user.password)) ){
        //match password
        res.status(200).json({
            _id:(await user).id,
            name: (await user).name,
            email: (await user).email,
            //token
            token: generateToken((await user).id),
            message: "User data correct"
        })
        //create token
    }
    else{
        res.status(400)
        throw new Error("Invalid credentials!")
    }
}
 /*********************************************
 * @dashboard a function display information of respective user
 * @route /api/user/dashboard
 * @description
 * @Access Public
 ********************************************/

 const dashboard = async(req,res)=>{
     //By this way we get only required details of requested user
     user = {
         email : req.user.email,
         name: req.user.name
     }
    res.status(200).send(user)
 }



//Generate Token
const generateToken =(id)=>{
    return JWT.sign({id},process.env.JWT_SECRET,{
        expiresIn:"30d",
    })
}

module.exports = {
    registerUser,
    loginUser,
    dashboard
}
    