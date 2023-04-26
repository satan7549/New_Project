const productModel = require("../models/productModels");
const catchAsyncErrors = require("../middleware/catchAsyncError");

// Create Product -- Admin
const createProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    res.send("Product created");
  } catch (err) {
    res.send("somting went wrong");
  }
});

const getAllProducts = catchAsyncErrors(async (req, res) => {
  try {
    res.send("All product");
  } catch (err) {
    res.send("somting went wrong");
  }
});

module.exports = {
  createProduct,
  getAllProducts,
};
