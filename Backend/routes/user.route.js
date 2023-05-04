const express = require("express");
const { registerUser,userLogin, getAllUsers } = require("../controllers/user.controller");
const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", userLogin);
userRoutes.get("/", getAllUsers);

module.exports = userRoutes;
