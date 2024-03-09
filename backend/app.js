const express = require("express");
const app = express();

// .env cofigur
const dotenv = require("dotenv");
dotenv.config();

// cors setup
const cors = require("cors");
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// cookies
const cookies_parser = require("cookie-parser");
app.use(cookies_parser());

// url data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// file upload
const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// routes
const userRouter = require("./router/userRouter");
const applicationRouter = require("./router/applicationRouter");
const jobRouter = require("./router/jobRouter");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/job", jobRouter);

// database connection
const dbConnection = require("./Database/dbConnection");
dbConnection();

// Error handler middlerware
const errorMiddlerware = require("./middlewares/error");
app.use(errorMiddlerware)

module.exports = app;
