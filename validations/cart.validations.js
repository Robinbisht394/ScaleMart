const { z } = require("zod");

const cartValidationSchema = z.object({
  body: z.object({
    product: z
      .string({
        required_error: "product id is required",
      })
      .min(1, "product id is required"),

    quantity: z
      .number({
        invalid_type_error: "quantity must be a number",
      })
      .min(1, "minimum quantity is 1")
      .max(3, "maximum quantity is 3")
      .optional(),
  }),
});

module.exports = { cartValidationSchema };
