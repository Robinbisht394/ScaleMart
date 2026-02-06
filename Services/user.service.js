const userModel = require("../Models/user.model");

const ApiError = requre("../");

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
        totalOrders: { $addtoSeet: "$_id" },
        totalAmount: { $sum: "$totalAmount" },
        totalItems: { $Sum: "$orderItems.quantity" },
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

  const userMontlyOrders = await userModel.aggregate([
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

  return userMontlyOrders;
};

module.exports = { getUserOrderSummary, getUserMonthlySummary };
