const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    gateway: { type: String, enum: ["razorpay", "Stripe"], required: true },
    method: {
      type: String,
      enum: ["UPI", "CARD", "NETBANKING", "COD"],
      required: true,
    },
    amount: { type: Number, required: true },
    currency: { type: String, deafult: "INR" },
    gatewayOrderId: { type: String },
    gatewayPaymentId: { type: String },
    status: {
      type: String,
      enum: {
        type: String,
        default: "CREATED",
        enum: ["CREATED", "SUCCESS", "FAILED"],
      },
      default: "CREATED",
    },
    attempts: {
      type: Number,
      deafult: 1,
    },

    gatewayResponse: {
      type: Object,
    },
  },
  { timestamps: true },
);

const payment = mongoose.model("payment", paymentSchema);
module.exports = payment;
