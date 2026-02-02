const express = require("express");
const cartController = require("../Controller/cart.controller");
const cartValidations = require("../validations/cart.validations");
const validate = require("../middlewares/validate.middleware");
const { protect, userRole } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post(
  "/",
  protect,
  userRole,
  validate(cartValidations.cartValidationSchema),
  cartController.addTocart,
);
router.get("/:id", protect, userRole, cartController.getCart);
router.delete("/removeCart/:id", protect, userRole, cartController.removeCart);
router.put(
  "/updatequantity/:id",
  protect,
  userRole,
  cartController.updateQuantity,
);
router.delete("/clearcart", protect, userRole, cartController.clearCart);

module.exports = router;
