const { z } = require("zod");

const orderValidationSchema = z.object({
  body: z.object({
    shippingAdress: z.object({
      fullName: z.string().min(1, "Full name is required"),
      phone: z.string().min(10, "Valid phone number is required"),
      addressLine: z.string().min(1, "Address is required"),
      city: z.string().min(1, "City is required"),
      state: z.string().min(1, "State is required"),
      pincode: z.string().min(4, "Pincode is required"),
    }),
    paymentMethod: z.enum(["COD", "CARD"]),
  }),
});

module.exports = { orderValidationSchema };
