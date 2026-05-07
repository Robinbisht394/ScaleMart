const { z } = require("zod");

const cartValidationSchema = z.object({
  body: z.object({
    user: z.string(),
    product: z.string(),
    quantity: z.number().optional(),
  }),
});

module.exports = { cartValidationSchema };
