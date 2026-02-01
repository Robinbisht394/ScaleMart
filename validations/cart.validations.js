const { z } = require("zod");

const cartValidationSchema = z.object({
  // Validates the User ID string
  user: z.string().min(1, "User ID is required"),

  cartItems: z
    .array(
      z.object({
        // Validates the Product ID string
        product: z.string().min(1, "Product ID is required"),

        // Ensures quantity is a whole number and at least 1
        quantity: z
          .number()
          .int()
          .min(1, "Quantity must be at least 1")
          .default(1),
      }),
    )
    .default([]),
});

module.exports = { cartValidationSchema };
