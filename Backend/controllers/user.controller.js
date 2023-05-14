const catchAsyncErrors = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");
const sendToken = require("../utils/jswToken");

// register User;
const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const hashedPassword = await bcrypt.hash(password, 5);

  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
    avatar: {
      public_id: "Tempory Avatar public ID",
      url: "temprory Avatar url ",
    },
  });
  // const new_User = await user.save();
  // userModel is a constructor function .create is method to create new document

  sendToken(res, 201, user);
});

//Login User
const userLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(ErrorHandler("Please fill the Email and Password Both", 400));
  }
  //select useing because by default password has select: false
  const userExists = await userModel.findOne({ email }).select("password");

  if (!userExists) {
    return next(ErrorHandler("Invalid Email or Password", 401));
  }
  //password compare
  const isPassword = await userExists.comparePassword(password);

  if (!isPassword) {
    return next(ErrorHandler("Invalid Email or Password", 401));
  }

  sendToken(res, 200, userExists);
  // const token = userExists.getjwtToken();
  // res.status(200).json({ success: true, token: token });
});

//Logout User

const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

const getAllUsers = async (req, res) => {
  try {
    res.send("All user");
  } catch (err) {
    res.send("somting went wrong");
  }
};

module.exports = {
  registerUser,
  userLogin,
  logoutUser,
  getAllUsers,
};
