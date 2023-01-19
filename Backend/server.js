const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const colors = require("colors");
const connectDB = require("./config/database");
const cors = require("cors");

const PORT = process.env.PORT || 8000;
const app = express();

//connect to database
connectDB();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({
    message: "Hello",
  });
});

app.use("/api/users", require("./routes/UserRoutes"));

app.listen(PORT, () => {
  console.log(`Server running on PORT http://localhost:${PORT}`);
});

console.log("Server Running...");
