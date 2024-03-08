const app = require("./app");
const cloudinary = require("cloudinary");

// server start
app.listen(process.env.PORT, () => {
  console.log(`Server Run on Port : ${process.env.PORT}`);
});

// cloudinary setup
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
