const orderModel = require("../Models/order.model");
const paymentModel = require("../Models/payment.model");
const Razorpay = require("razorpay");

// create razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_Secret: process.env.RAZORPAY_SECRET,
});

const createPayment = async (userId, orderId, method) => {
  // verify the order
  const order = await orderModel.findById(orderId);
  if (!order) throw new ApiError(404, "Order Not Generated");

  //   create payment db entry
  const payment = await paymentModel.create({
    user: userId,
    order: orderId,
    amount: order.totalAmount,
    method,
  });

  //   create razorpay order
  const razorpayOrder = await razorpay.orders.create({
    amount: order.totalAmount * 100,
    currency: "INR",
    receipt: orderId.toString(),
  });

  payment.gatewayOrderId = razorpayOrder.id;
  await payment.save();

  return {
    razorpayOrderId: razorpayOrder.id,
    amount: order.totalAmount,
    currency: "INR",
  };
};

const handleWebhook = async (payload) => {
  if (payload.event !== "payment.captured") return;

  const paymentEntity = payload.payload.payment.entity;

  const payment = await paymentModel.findOne({
    gatewayOrderId: paymentEntity.order_id,
  });

  if (!payment) return;

  payment.status = "SUCCESS";
  payment.gatewayPaymentId = paymentEntity.id;
  payment.gatewayResponse = paymentEntity;

  await payment.save();

  await orderModel.findByIdAndUpdate(payment.order, {
    orderStatus: "PAID",
    paymentStatus: "PAID",
  });
};

module.exports = { createPayment, handleWebhook };
