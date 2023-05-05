const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  singleProduct,
} = require("../controllers/product.controller");
const {isUserAuthenticated,checkRole} = require("../middleware/userAuth");

const productRoute = express.Router();

productRoute.get("/", isUserAuthenticated,checkRole("admin"), getAllProducts);
productRoute.get("/:id", singleProduct);
productRoute.post("/create", isUserAuthenticated, createProduct);
productRoute.put("/update/:id", isUserAuthenticated, updateProduct);
productRoute.delete("/delete/:id", isUserAuthenticated, deleteProduct);

module.exports = productRoute;
