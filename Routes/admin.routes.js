const express = require("express");
const adminAnalyticsController = require("../Controller/admin.controller");
const router = express.Router();
const { protect, adminRole } = require("../middlewares/auth.middleware");

router.get(
  "/order-overview",
  protect,
  adminRole,
  adminAnalyticsController.getOrdersOverview,
);
router.get(
  "/top-selling-product",
  protect,
  adminRole,
  adminAnalyticsController.getTopSellingproduct,
);

module.exports = router;
