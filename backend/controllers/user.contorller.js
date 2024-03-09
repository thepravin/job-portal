const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../middlewares/error");
const User = require("../models/user.model");

const register = catchAsyncError(async (req, res, next) => {
  // step 1 : retrive data from body
  const { name, email, password, phone, role } = req.body;

  // step 2: check all info are given or not
  if (!name || !email || !password || !role) {
    return next(new ErrorHandler("All data fields are required"));
  }

  // step 3 : check user already exist or not
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(
      new ErrorHandler("User allready Exit , Please use different Email !!")
    );
  }

  // step 4 : create user
  const user = await User.create({
    name,
    email,
    password,
    phone,
    role,
  });

  // return respose
  return res.status(200).json({
    success:true,
    message:"User registered",
    user,
  })
});



module.exports = {register}