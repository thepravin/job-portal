const catchAsyncError = require("../middlewares/catchAsyncError");
const { ErrorHandler } = require("../middlewares/error");
const User = require("../models/user.model");
const sendToken = require("../utils/jwtToken");

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
  //   return res.status(200).json({
  //     success:true,
  //     message:"User registered",
  //     user,
  //   })

  sendToken(user, 200, res, "User Registered Successfully!");
});

const login = catchAsyncError(async (req, res, next) => {
  // step 1 : retrive data from body
  const { email, password, role } = req.body;

  // step 2 : data required
  if (!email || !password || !role) {
    return next(
      new ErrorHandler("Please provide email,password and role", 400)
    );
  }

  // step 3 : find user in db
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  }

  // step 4 : mathc password
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  }

  // step 5 : check role
  if (user.role != role) {
    return next(new ErrorHandler("User with this role not found !", 400));
  }

  sendToken(user, 200, res, "User logged in successfully");
});

const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User logged out successfully !",
    });
});

const getUser = catchAsyncError(async(req,res,next)=>{
  const user = req.user;
  res.status(200).json({
    success:true,
    user,
  })
})

module.exports = { register, login, logout,getUser };
