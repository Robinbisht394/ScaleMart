const { z } = require("zod");

const orderValidationSchema = z.object({
  user: z.string().min(1, "User ID is required"),

  shippingAdress: z.object({
    fullName: z.string().min(1, "Full name is required"),
    phone: z.string().min(10, "Valid phone number is required"),
    addressLine: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().min(4, "Pincode is required"),
  }),

  // Fixed the duplicate "CARD" and matched your enum options
  paymentMethod: z.enum(["COD", "CARD"]),

  paymentStatus: z
    .enum(["pending", "paid", "failed"])
    .default("pending"),

  orderStatus: z
    .enum(["pending", "confirmed", "shipped", "delivered", "cancelled"])
    .default("pending"),

  totalItems: z.number().int().nonnegative(),
  
  deliveryCharges: z.number().nonnegative().default(0),

  totalAmount: z.number().nonnegative(),

  orderItems: z.array(
    z.object({
      product: z.string().min(1, "Product ID is required"),
      name: z.string().min(1),
      price: z.number().positive(),
      quantity: z.number().int().min(1),
      total: z.number().nonnegative(),
    })
  ).min(1, "Order must contain at least one item"),
});

module.exports = { orderValidationSchema };