const { z } = require("zod");

const categoryValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Category name is required")
    .max(50, "Name is too long"),

  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase and URL-friendly"),

  description: z.string().optional(),

  isActive: z.boolean().optional().default(true),

  parentCategory: z.string().nullable().optional().default(null),
});

module.exports = { categoryValidationSchema };
