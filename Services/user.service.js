const userModel = require("../Models/user.model.js");
const { getAIInsights: generateAIInsights } = require("../Utils/gemini");
const productModel = require("../Models/product.model.js");
const ApiError = require("../Utils/ApiError.js");
const orderModel = require("../Models/order.model.js");

const getUserOrderSummary = async (userId) => {
  // check if user exist
  const isUserExisted = await userModel.findOne({ _id: userId });
  if (!isUserExisted) throw new ApiError(404, "User Not Registered");

  const userOrders = await orderModel.aggregate([
    { $match: { user: userId } },
    {
      $unwind: "$orderItems",
    },
    {
      $group: {
        _id: null,
        totalOrders: { $addToSet: "$_id" },
        totalAmount: { $sum: "$totalAmount" },
        totalItems: { $sum: "$orderItems.quantity" },
      },
    },
    {
      $project: {
        totalOrders: { $size: "$totalOrders" },
        totalAmount: 1,
        totalItems: 1,
      },
    },
  ]);

  if (!userOrders || userOrders.length === 0) {
    throw new ApiError(404, "No Order found");
  }

  return userOrders;
};

//  API - monthly summary for orders purchased
const getUserMonthlySummary = async (userId) => {
  const isUserExisted = await userModel.findOne({ _id: userId });
  if (!isUserExisted) throw new ApiError(404, "User Not Registered");

  const userMonthlyOrders = await orderModel.aggregate([
    {
      $match: { user: userId },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        totalOrders: { $sum: 1 },
        totalAmount: { $sum: "$totalAmount" },
        totalItems: { $sum: "$totalItems" },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        month: "$_id.month",
        totalOrders: 1,
        totalAmount: 1,
        totalItems: 1,
      },
    },
  ]);

  if (userMonthlyOrders.length === 0) {
    throw new ApiError(404, "No Order found");
  }

  return userMonthlyOrders;
};

const getAIInsights = async (query) => {
  const filter = await generateAIInsights(query);
  if (!filter) {
    throw new ApiError(500, "AI did not return a valid filter");
  }

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
    // allow top-level allowed fields
    if (allowedFields.has(key) || key.startsWith("$") || key === "$or") {
      safeFilter[key] = filter[key];
      return;
    }

    // allow dotted keys if root field is allowed (e.g. "ratings.average")
    if (key.includes(".")) {
      const root = key.split(".")[0];
      if (allowedFields.has(root)) {
        safeFilter[key] = filter[key];
      }
    }
  });

  if (safeFilter.isActive === undefined) safeFilter.isActive = true;

  const products = await productModel
    .find(safeFilter)
    .populate("category", "name description");

  if (!products || products.length === 0)
    throw new ApiError(404, "No products found for the provided AI filter");

  return products;
};

module.exports = { getUserOrderSummary, getUserMonthlySummary, getAIInsights };
