const userService = require("../Services/user.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../Utils/asyncHandler");

const getUserOrderSummary = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const OrderSummary = await userService.getUserOrderSummary(userId);

  return res
    .status(200)
    .json(
      new ApiResponse(200, OrderSummary, "Order summary fetched successfully"),
    );
});

const getUserMonthlySummary = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const monthlySummary = await userService.getUserMonthlySummary(userId);

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

module.exports = { getUserOrderSummary, getUserMonthlySummary };
