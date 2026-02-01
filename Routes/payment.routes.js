const express = require("express");
const router = express.Router();
const paymentController = require("../Controller/payment.controller");

router.post("/create", paymentController.createPayment);
router.post("/verify-payment", paymentController.paymentWebhook);

module.exports = router;
