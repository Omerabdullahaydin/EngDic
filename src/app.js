//I add libraries 
const express = require("express");
require("dotenv").config();
const pool = require("./config/db");
const {getAllWords} = require("./models/wordModel");

const app = express();

//I add the word table 
getAllWords();

//I add Port
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});

//I add JSON Middleware for parsing incoming requests with JSON payloads
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the English Dictionary API");
})

