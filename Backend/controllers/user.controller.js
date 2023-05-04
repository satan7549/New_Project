const catchAsyncErrors = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");

// register User;

const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  // // Check if user already exists
  // const userExists = await userModel.findOne({ email });
  // if (userExists) {
  //   // return next(new ErrorHandler("User already exists", 400));
  //   return res
  //     .status(400)
  //     .json({ success: true, message: "User already exists" });
  // }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 5);

  const user = new userModel({
    name,
    email,
    password: hashedPassword,
    avatar: {
      public_id: "Tempory Avatar public ID",
      url: "temprory Avatar url ",
    },
  });

  const new_User = await user.save();
  res.status(201).json({ success: true, new_User });
});

const userLogin = catchAsyncErrors(async (req, res) => {
  const { email, password } = req.body;
  const userExists = await userModel.findOne({ email });

 
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
  getAllUsers,
};
