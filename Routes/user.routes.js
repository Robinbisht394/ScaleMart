const express = require("express");
const userController = require("../Controller/user.controller.js");
const userValidation = require("../validations/user.validations.js");
const router = express.Router();
const validate = require("../middlewares/validate.middleware.js");
const { protect, userRole } = require("../middlewares/auth.middleware.js");
router.get("/", userController.getUsers);
router.post(
  "/changepassword",
  protect,
  userRole,
  validate(userValidation.changeUserPasswordSchema),

  userController.changeUserPassword,
);

module.exports = router;
