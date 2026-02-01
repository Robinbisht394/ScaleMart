const { z } = require("zod");

const productValidationSchema = z.object({
  body: z
    .object({
      name: z.string().trim().min(1, "Name is required"),
      slug: z.string().min(1, "Slug is required"),
      description: z.string().min(1, "Description is required"),
      price: z.number().positive("Price must be a positive number"),
      discountedPrice: z.number().nonnegative().default(1),
      category: z.string().min(1, "Category ID is required"),
      brand: z.string().optional(),
      images: z
        .array(
          z.object({
            url: z.string().url("Must be a valid URL").optional(),
            alt: z.string().optional(),
          }),
        )
        .default([]),
      stock: z.number().int().nonnegative().default(0),
      sku: z.string().optional(),
      attributes: z
        .array(
          z.object({
            key: z.string().optional(),
            value: z.string().optional(),
          }),
        )
        .default([]),
      ratings: z
        .object({
          average: z.number().min(0).max(5).default(0),
          count: z.number().int().nonnegative().default(0),
        })
        .default({}),
      isFeatured: z.boolean().default(false),
      isActive: z.boolean().default(true),
      createdBy: z.string().optional(),
    })
    .refine((data) => data.discountedPrice <= data.price, {
      message: "Discounted price cannot be greater than the original price",
      path: ["discountedPrice"], // This points the error specifically to the discountedPrice field
    }),
});

module.exports = { productValidationSchema };
