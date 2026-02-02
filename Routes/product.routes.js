const express = require("express");
const productController = require("../Controller/product.controller");
const validate = require("../middlewares/validate.middleware");
const productValidation = require("../validations/product.validations");
const { protect, adminRole } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post(
  "/",
  protect,
  adminRole,
  validate(productValidation.productValidationSchema),
  productController.createProduct,
);
router.get("/search", productController.searchProducts);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", protect, adminRole, productController.updateProduct);
router.delete("/:id", protect, adminRole, productController.deleteProduct);

module.exports = router;
