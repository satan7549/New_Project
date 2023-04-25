const express = require("express");
const { getAllUsers } = require("../controllers/user.controller");
const userRoutes = express.Router();

userRoutes.get("/", getAllUsers);

module.exports = userRoutes;
