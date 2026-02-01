const express = require("express");

const router = express.Router();
const validate = require("../middlewares/validate.middleware");
const categoryController = require("../Controller/category.controller");
const categoryValidations = require("../validations/category.validations");

router.post(
  "/",
  validate(categoryValidations.categoryValidationSchema),
  categoryController.createCategory,
);
router.put(
  "/:id",
  validate(categoryValidations.categoryValidationSchema),
  categoryController.updateCategory,
);
router.delete(
  "/:id",
  //   validate(categoryValidations.categoryValidationSchema),
  categoryController.deleteCategory,
);
router.get(
  "/",
  //   validate(categoryValidations.categoryValidationSchema),
  categoryController.getCategories,
);

module.exports = router;
