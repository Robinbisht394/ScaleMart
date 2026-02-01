const express = require("express");
const userController = require("../Controller/user.controller.js");
const userValidation = require("../validations/user.validations.js");
const router = express.Router();
const validate = require("../middlewares/validate.middleware.js");

router.get("/", userController.getUsers);
router.post(
  "/changepassword",
  validate(userValidation.changeUserPasswordSchema),
  userController.changeUserPassword,
);

module.exports = router;
