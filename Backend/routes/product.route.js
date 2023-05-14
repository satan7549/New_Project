const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  singleProduct,
} = require("../controllers/product.controller");
const { isUserAuthenticated, checkRole } = require("../middleware/userAuth");

const productRoute = express.Router();

productRoute.get("/", getAllProducts);
productRoute.get("/:id", singleProduct);
/* Admin Access  only below routes */
productRoute.post("/create", isUserAuthenticated, checkRole, createProduct);
productRoute.put("/update/:id", isUserAuthenticated, checkRole, updateProduct);
productRoute.delete(
  "/delete/:id",
  isUserAuthenticated,
  checkRole,
  deleteProduct
);

module.exports = productRoute;
