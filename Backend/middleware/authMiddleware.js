const jwt = require("jsonwebtoken");
//Add async Handler
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get token from header
      token = req.headers.authorization.split(" ")[1];
      console.log(token);
      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("DEcoded :", decoded.id);
      //Get user from token
      req.user = await User.findById(decoded.id).select("-password");
      if (req.user) {
        console.log("User logged in");
      }
      next();
    } catch (error) {
      console.log("error :", error);
      res.status(400);
      throw new Error("Not Authorized");
    }
  }
  if (!token) {
    res.status(400);
    throw new Error("Not Authorized");
  }
};

module.exports = { protect };
