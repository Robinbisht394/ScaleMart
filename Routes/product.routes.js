const express = require("express");
const productController = require("../Controller/product.controller");
const validate = require("../middlewares/validate.middleware");
const productValidation = require("../validations/product.validations");

const router = express.Router();

router.post(
  "/",
  validate(productValidation.productValidationSchema),
  productController.createProduct,
);
router.get("/search", productController.searchProducts);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
