const UserModel = require("../models/userModels");

const getAllUsers = async (req, res) => {
  try {
    res.send("All user");
  } catch (err) {
    res.send("somting went wrong");
  }
};

module.exports = {
  getAllUsers,
};
