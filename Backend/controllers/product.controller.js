const productModel = require("../models/productModels");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

// Create Product -- Admin
const createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = new productModel(req.body);
  const new_product = await product.save();
  res.status(201).json({ success: true, new_product });
});

//get All products
const getAllProducts = catchAsyncErrors(async (req, res) => {
  const produts = await productModel.find();
  res.status(201).json({ success: true, produts });
});

//single product detail
const singleProduct = catchAsyncErrors(async (req, res, next) => {
  const productID = req.params.id;
  const product = await productModel.findById(productID);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 500));
    // res.status(500).json({ success: false, message: "Product Not Found" });
  }
  const produts = await productModel.findById(productID);

  res.status(200).json({
    success: true,
    produts,
  });
});

//update product
const updateProduct = catchAsyncErrors(async (req, res) => {
  const productID = req.params.id;
  const product = await productModel.findById(productID);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 500));
    // res.status(500).json({ success: false, message: "Product Not Found" });
  }
  const produts = await productModel.findByIdAndUpdate(productID, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    produts,
  });
});

//Delete product
const deleteProduct = catchAsyncErrors(async (req, res) => {
  const productID = req.params.id;
  const product = await productModel.findById(productID);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 500));
    // res.status(500).json({ success: false, message: "Product Not Found" });
  }
  await productModel.findByIdAndDelete(productID);

  res.status(200).json({
    success: true,
    message: "Product has been deleted sucessfully",
  });
});

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  singleProduct,
};
