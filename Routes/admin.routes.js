const express = require("express");
const adminAnalyticsController = require("../Controller/admin.controller");
const router = express.Router();

router.get("/order-overview", adminAnalyticsController.getOrdersOverview);
router.get(
  "/top-selling-product",
  adminAnalyticsController.getTopSellingproduct,
);

module.exports = router;
