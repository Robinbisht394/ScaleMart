const userModel = require("../Models/user.model");
const orderModel = require("../Models/order.model");

const getOrdersOverview = async (userId) => {
  const user = await userModel.findone({ _id: userId });
  if (user) throw new ApiError(404, "User Not Registered");

  const orders = await orderModel.aggregate([
    { $unwind: "$orderItems" },

    {
      $lookup: {
        from: "products",
        localField: "orderItems.product",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" },

    {
      $match: {
        "product.seller": mongoose.Types.ObjectId(userId),
      },
    },

    {
      $group: {
        _id: null,
        totalOrders: { $addToSet: "$_id" },
        totalRevenue: { $sum: "$orderItems.total" },
        averageOrderValue: { $avg: "$orderItems.total" },
        cancelledOrders: {
          $sum: {
            $cond: [{ $eq: ["$orderStatus", "cancelled"] }, 1, 0],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalOrders: { $size: "$totalOrders" },
        totalRevenue: 1,
        averageOrderValue: 1,
        cancelledOrders: 1,
      },
    },
  ]);

  if (orders.length === 0) throw new ApiError(404, "No Orders found");
  return orders;
};

const topSellingProducts = async (userId) => {
  const user = await userModel.findone({ _id: userId });
  if (user) throw new ApiError(404, "User Not Registered");

  const topSellingProducts = await orderModel.aggregate([
    { $match: { orderStatus: "delivered" } },

    { $unwind: "$orderItems" },

    {
      $lookup: {
        // lookup in product collection
        from: "products",
        localField: "orderItems.product",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" },

    {
      $match: {
        "product.seller": mongoose.Types.ObjectId(userId),
      },
    },

    {
      $group: {
        _id: "$product._id",
        name: { $first: "$product.name" },
        totalSold: { $sum: "$orderItems.quantity" },
        totalRevenue: {
          $sum: {
            $multiply: ["$orderItems.quantity", "$orderItems.price"],
          },
        },
      },
    },

    { $sort: { totalSold: -1 } },
    { $limit: 5 },

    {
      $project: {
        _id: 0,
        productId: "$_id",
        name: 1,
        totalSold: 1,
        totalRevenue: 1,
      },
    },
  ]);

  if (topSellingProducts.length === 0)
    throw new ApiError(404, "No Order found");

  return topSellingProducts;
};

module.exports = { getOrdersOverview, topSellingProducts };
