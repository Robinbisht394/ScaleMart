const mongoose = require("mongoose");

// cart schema
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    index: true,
  },
  cartItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },

      quantity: { type: Number, default: 1 },
    },
  ],
});

const cart = new mongoose.model("cart", cartSchema);

module.exports = cart;
