const categoryModel = require("../Models/category.model.js");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const categories = require("../Services/category.service.js");
const asyncHandler = require("../Utils/asyncHandler.js");

const createCategory = asyncHandler(async (req, res) => {
  console.log(req.body);
  const newCategories = await categories.createCategory(req);

  return res
    .status(201)
    .json(
      new ApiResponse(201, newCategories, "categories created Successfully"),
    );
});

const updateCategory = asyncHandler(async (req, res) => {
  const updatedCategory = await categories.updateCategory(req);
  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedCategory, "category updated successfully"),
    );
});

// delete category or make it inActive
const deleteCategory = asyncHandler(async (req, res) => {
  const inActiveCategory = await categories.deleteCategory(req);

  return res
    .status(200)
    .json(new ApiResponse(200, inActiveCategory, "category deleted"));
});

const getCategories = asyncHandler(async (req, res) => {
  const allCategories = await categories.getCategories(req);
  return res
    .status(200)
    .json(
      new ApiResponse(200, allCategories, "Categories fetched successfully"),
    );
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
};
