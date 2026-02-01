const express = require("express");
const { signup, login } = require("../Controller/auth.controller.js");
const userValidation = require("../validations/user.validations.js");
const router = express.Router();
const validate = require("../middlewares/validate.middleware.js");

router.post("/signup", validate(userValidation.createUserSchema), signup);
router.post("/login", validate(userValidation.loginUserSchema), login);

module.exports = router;
