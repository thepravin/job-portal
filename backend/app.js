const express = require("express");
const app = express();

// .env cofigur
const dotenv = require('dotenv');
dotenv.config()

// cors setup
const cors = require('cors');
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","DELETE","PUT"],
    credentials:true
}))

module.exports = app;