//I add libraries 
const express = require("express");
require("dotenv").config();
const wordRoutes = require("./routes/wordRoutes");

const app = express();
app.use(express.json());
app.use("/api/words", wordRoutes);

//I add Port
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});

//I add JSON Middleware for parsing incoming requests with JSON payloads
app.use(express.json());


