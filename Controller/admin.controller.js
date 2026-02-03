const userService = require("../Services/user.service");
const ApiResponse = require("../utils/ApiResponse");
const adminService = require("../Services/adminService");
const asyncHandler = require("../Utils/asyncHandler");
const getOrdersOverview = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const OrderSummary = await adminService.getOrdersOverview(userId);

  return res
    .status(200)
    .json(
      new ApiResponse(200, OrderSummary, "Order summary fetched successfully"),
    );
});

const getTopSellingproduct = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const monthlySummary = await adminService.topSellingProducts(userId);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        monthlySummary,
        "Monthly summary fetched successfully",
      ),
    );
});

module.exports = { getOrdersOverview, getTopSellingproduct };
