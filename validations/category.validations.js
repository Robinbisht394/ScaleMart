const { z } = require("zod");

const categoryValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, "Category name is required")
      .max(50, "Name is too long"),

    slug: z
      .string()
      .min(1, "Slug is required")
      .lowercase("Slug must be lowercase")
      .trim(),

    description: z.string().optional(),

    isActive: z.boolean().default(true).optional(),

    // parentCategory is optional/nullable since it defaults to null
    parentCategory: z.string().nullable().default(null).optional(),
  }),
});

module.exports = { categoryValidationSchema };
