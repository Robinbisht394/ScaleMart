const ApiError = require("../Utils/ApiError");
const { getAIInsights: generateAIInsights } = require("../Utils/gemini");
const productModel = require("../Models/product.model.js");

const getAIInsights = async (query) => {
  const filter = await generateAIInsights(query);
  if (!filter) {
    throw new ApiError(500, "AI did not return a valid filter");
  }

  // Prevent accidental unsafe queries by ensuring only known top-level fields
  // from the product schema are used. Merge with isActive: true to avoid
  // returning inactive products.
  const allowedFields = new Set([
    "name",
    "slug",
    "description",
    "price",
    "discountedPrice",
    "category",
    "brand",
    "stock",
    "sku",
    "attributes",
    "ratings",
    "isFeatured",
    "isActive",
    "createdBy",
  ]);

  const safeFilter = {};
  Object.keys(filter).forEach((key) => {
    if (allowedFields.has(key) || key.startsWith("$") || key === "$or") {
      safeFilter[key] = filter[key];
    }
  });

  // Ensure we only return active products unless AI explicitly asked otherwise
  if (safeFilter.isActive === undefined) safeFilter.isActive = true;

  const products = await productModel
    .find(safeFilter)
    .populate("category", "name description");

  if (!products || products.length === 0)
    throw new ApiError(404, "No products found for the provided AI filter");

  return products;
};

module.exports = { getAIInsights };
