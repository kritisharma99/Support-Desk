const mongoose = require("mongoose")

const connectdb = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongo DB connected! ${conn.connection.host}`.cyan.underline)
    }
    catch(error){
        console.log(`Error : ${error}`.red.underline.bold)
    }
}

module.exports = connectdb