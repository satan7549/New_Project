const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModels");

const isUserAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  //   console.log(token);
  if (!token) {
    return next(ErrorHandler("Please Login First to access this", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  //save user inside req.user
  req.user = await userModel.findById(decoded.id);
  next();
});

//check user role
const checkRole = catchAsyncError((req, res, next) => {
  console.log("role",req.user.role)
  if (req.user.role !== "admin") {
    return next(
      ErrorHandler(
        `Role: ${req.user.role} is not allowed to access this resource`,
        403
      )
    );
  }
  next();
});

module.exports = { isUserAuthenticated, checkRole };
