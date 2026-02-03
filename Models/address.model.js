const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    index: true,
  },
  fullName: String,
  phone: String,
  addressLine: String,
  city: String,
  state: String,
  pincode: String,
});

module.exports = mongoose.model("Address", addressSchema);
