const express = require("express");
const router = express.Router();
const orderController = require("../Controller/order.controller");
const {
  protect,
  userRole,
  adminRole,
} = require("../middlewares/auth.middleware");

const validate = require("../middlewares");
const { orderValidationSchema } = require("../validations/order.validations");
router.post(
  "/",
  protect,
  userRole,
  validate(orderValidationSchema),
  orderController.createOrder,
);
router.delete(
  "/cancel/:orderId",
  protect,
  userRole,
  orderController.cancelOrder,
);
router.patch(
  "/statusupdate/:orderId",
  protect,
  adminRole,
  orderController.orderStatusUpdate,
);
router.get("/", orderController.getMyorders);

module.exports = router;
