const express = require("express");
const userAnalyticsController = require("../Controller/userAnalytics.controller");
const router = express.Router();
const { protect, userRole } = require("../middlewares/auth.middleware");
router.get(
  "/order-summary",
  protect,
  userRole,
  userAnalyticsController.getUserOrderSummary,
);
router.get(
  "/monthly-summary",
  protect,
  userRole,
  userAnalyticsController.getUserMonthlySummary,
);

module.exports = router;
