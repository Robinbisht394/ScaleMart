const express = require("express");
const router = express.Router();
const orderController = require("../Controller/order.controller");

router.post("/", orderController.createOrder);
router.delete("/cancel/:orderId", orderController.cancelOrder);
router.patch("/statusupdate/:orderId", orderController.orderStatusUpdate);
router.get("/", orderController.getMyorders);

module.exports = router;
