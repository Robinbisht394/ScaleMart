const express = require("express");

const router = express.Router();
const validate = require("../middlewares/validate.middleware");
const categoryController = require("../Controller/category.controller");
const categoryValidations = require("../validations/category.validations");
const { protect, adminRole } = require("../middlewares/auth.middleware");

router.post(
  "/",
  protect,
  adminRole,
  validate(categoryValidations.categoryValidationSchema),
  categoryController.createCategory,
);

router.put(
  "/:id",
  protect,
  adminRole,
  validate(categoryValidations.categoryValidationSchema),
  categoryController.updateCategory,
);

router.delete("/:id", protect, adminRole, categoryController.deleteCategory);
router.get("/", categoryController.getCategories);

module.exports = router;
