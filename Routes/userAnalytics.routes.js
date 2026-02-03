const express = require("express");
const userAnalyticsController = require("../Controller/userAnalytics.controller");
const router = express.Router();

router.get("/order-summary", userAnalyticsController.getUserOrderSummary);
router.get("/monthly-summary", userAnalyticsController.getUserMonthlySummary);

module.exports = router;
