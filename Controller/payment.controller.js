const crypto = require("crypto");
const asyncHandler = require("../Utils/asyncHandler");
// intintiate the payment for order
const createPayment = asyncHandler(async (req, res) => {
  const { orderId, method } = req.body;
  const userId = req.user.id;

  const paymentData = paymentService.createPayment(userId, orderId, method);

  res.status(200).json(new ApiResponse(200, paymentData, "Payment initiated"));
});

// verify the payment
const paymentWebhook = asyncHandler(async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  const signature = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (signature !== req.headers["x-razorpay-signature"]) {
    return res.status(400).send("Invalid signature");
  }

  await paymentService.handleWebhook(req.body);

  res.status(200).send("OK");
});

module.exports = { createPayment, paymentWebhook };
