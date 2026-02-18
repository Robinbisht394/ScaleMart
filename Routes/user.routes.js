const express = require("express");
const userController = require("../Controller/user.controller.js");
const userValidation = require("../validations/user.validations.js");
const router = express.Router();
const validate = require("../middlewares/validate.middleware.js");
const { protect, roleCheck } = require("../middlewares/auth.middleware.js");
router.get("/", userController.getUsers);
router.get("/ai-insights", userController.aiInsights);
router.post(
  "/changepassword",
  protect,
  roleCheck,
  validate(userValidation.changeUserPasswordSchema),

  userController.changeUserPassword,
);

module.exports = router;
