const express = require("express");
const {
  registerUser,
  userLogin,
  logoutUser,
  getAllUsers,
} = require("../controllers/user.controller");
const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", userLogin);
userRoutes.get("/logout", logoutUser);
userRoutes.get("/", getAllUsers);

module.exports = userRoutes;
