const ApiResponse = require("../Utils/ApiResponse");
const orderService = require("../Services/order.service");
const asyncHandler = require("../Utils/asyncHandler");
// create order for customer

const createOrder = asyncHandler(async (req, res) => {
  const order = await orderService.createOrder(req);

  if (order) {
    return res
      .status(201)
      .json(new ApiResponse(201, order, "Order Placed successfully"));
  }
});
// cancel order via customer
const cancelOrder = async (req, res) => {
  const orderId = req.params.orderId;
  // const userId = req.user.id;

  const cancelledOrder = orderService.cancelOrder(orderId, userId);
  if (cancelledOrder) {
    return res.status(200).json(new ApiResponse(200, [], "Order cancelled"));
  }
};

// order status update via seller
const orderStatusUpdate = async (req, res) => {
  const userId = req.user.id;
  const { status } = req.body;

  const order = await orderService.orderStatusUpdate(
    req.params.orderId,
    status,
  );

  return res.status(200).json(new ApiResponse(200, order, "order updated"));
};
// get all order for customer
const getMyorders = async (req, res) => {
  const userId = req.user.id;

  const orders = await orderService.getMyorders(userId);
  return res
    .status(200)
    .json(new ApiResponse(200, orders, "orders fetched successfully"));
};

module.exports = { createOrder, cancelOrder, orderStatusUpdate, getMyorders };
