const productModel = require("../models/productModels");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const { search, filter, sort, paginate } = require("../utils/apiFeatures");

// Create Product -- Admin
const createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = new productModel(req.body);
  const new_product = await product.save();
  res.status(201).json({ success: true, new_product });
});

//get All products
const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  // Get the query string parameters from the request object
  let resultPerPage = 1;

  let productCount = await productModel.countDocuments();
  // Create a base query to get all products
  // const produts = await productModel.find();
  let query = productModel.find();
  // Apply the search feature function
  query = search(query, req.query);

  // Apply the filter feature function
  query = filter(query, req.query);

  // Apply the sorting feature function according to price and rating
  query = sort(query, req.query);

  // Apply the pagination feature function

  query = paginate(query, req.query, resultPerPage);

  // Execute the query and send the response
  const products = await query;

  res.status(201).json({ success: true, products, productCount });
});

//single product detail
const singleProduct = catchAsyncErrors(async (req, res, next) => {
  const productID = req.params.id;
  const product = await productModel.findById(productID);
  if (!product) {
    return next(ErrorHandler("Product Not Found", 500));
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
    return next(ErrorHandler("Product Not Found", 500));
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
    return next(ErrorHandler("Product Not Found", 500));
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
