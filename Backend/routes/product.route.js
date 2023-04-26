const express = require("express");
const {
  getAllProducts,
  createProduct,
} = require("../controllers/product.controller");

const productRoute = express.Router();

productRoute.get("/", getAllProducts);
productRoute.post("/create", createProduct);

module.exports = productRoute;
