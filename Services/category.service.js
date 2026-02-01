const categoryModel = require("../Models/category.model.js");
const ApiError = require("../utils/ApiError");

const createCategory = async (req) => {
  // check if category exist
  const isCategoryExists = await categoryModel.findOne({ name: req.body.name });
  if (isCategoryExists) throw new ApiError(400, "category Exists");

  // add new category if doesn't exist
  const newCategory = await categoryModel.create(req.body);
  return newCategory;
};

const updateCategory = async (req) => {
  // check if category exist
  const existingCategory = await categoryModel.findById(req.params.id);
  if (!existingCategory)
    // check if category exist then update
    throw new ApiError(404, "Category not found");

  const updatedCategory = await categoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );
  return updatedCategory;
};

const deleteCategory = async (req, res) => {
  const existingCategory = await categoryModel.findById(req.params.id);
  if (!existingCategory)
    // check if category exist then delete
    throw new ApiError(404, "Category not found");

  // inActive catgeory

  const inActiveCategory = await categoryModel.findByIdAndUpdate(
    req.params.id,
    { $set: { isActive: false } },
  );

  return inActiveCategory;
};

const getCategories = async (req) => {
  const categories = await categoryModel
    .find()
    .select("name description isActive");

  if (!categories) throw new ApiError(404, "No categories found");

  return categories;
};

module.exports = {
  createCategory,
  updateCategory,
  getCategories,
  deleteCategory,
};
