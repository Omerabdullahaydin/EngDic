//I add libraries 
const {createUsersTable} = require("./models/userModel")
const express = require("express");
require("dotenv").config();
const wordRoutes = require("./routes/wordRoutes");
const userRoutes = require("./routes/authRoutes")


const app = express();
//I add JSON Middleware for parsing incoming requests with JSON payloads
app.use(express.json());
app.use("/api/auth", userRoutes)
app.use("/api/words", wordRoutes);
createUsersTable();

//I add Port
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});





