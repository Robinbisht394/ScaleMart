const Category = require("../../models/category.model");
const createCategory = async () => {
  return await Category.create({
    name: "Electronics",
    slug: "electronics",
    description: "Electronic category",
    isActive: true,
  });
};
module.exports = { createCategory };
