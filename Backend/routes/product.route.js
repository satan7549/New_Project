const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  singleProduct,
} = require("../controllers/product.controller");

const productRoute = express.Router();

productRoute.get("/", getAllProducts);
productRoute.get("/:id", singleProduct);
productRoute.post("/create", createProduct);
productRoute.put("/update/:id", updateProduct);
productRoute.delete("/delete/:id", deleteProduct);

module.exports = productRoute;
