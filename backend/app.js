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

// cookies
const cookies_parser = require('cookie-parser');
app.use(cookies_parser());

// url data
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// file upload
const fileUpload = require("express-fileupload");
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp/",
    })
)


module.exports = app;