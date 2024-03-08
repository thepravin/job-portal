const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jwt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide your Name"],
    minLength: [3, "Name must contain at least 3 characters!"],
    maxLength: [30, "Name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Provide your Email"],
    validate: [validator.isEmail, "Please provide valid Email"],
  },
  phone: {
    type: Number,
    required: [true, "Please provide your phone number"],
  },
  password: {
    typer: String,
    required: [true, "Please Provide your Password"],
    minLength: [8, "Password must contain at least 8 characters!"],
    maxLength: [32, "Password cannot exceed 32 characters"],
  },
  role: {
    type: String,
    required: [true, "Please Provide your Role"],
    enum: ["Job Seeker", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// HASING password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // if password is not modified then , do next call
    next();
  }

  // passowrd modified then
  this.password = await bcrypt.hash(this.password, 10);
});

// COMPARING password <time of login>
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// GENERATE JWT token for AUTHORIZATION
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("User", userSchema);
