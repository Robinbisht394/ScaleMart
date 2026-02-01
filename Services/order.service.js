const ApiError = require("../Utils/ApiError");
const orderModel = require("../Models/order.model");
const cartModel = require("../Models/cart.model");
const cartService = require("../Services/cart.service");
const helper = require("../Utils/helper");

//create new order
const createOrder = async (req) => {
  const { shippingAdress, paymentMethod } = req.body;

  // const userId = req.body.id;
  const userId = req.user.id;

  //   validate cart
  const cart = await cartModel
    .findOne({ user: userId })
    .populate("cartItems.product", "name price discountedPrice");

  if (!cart || cart.cartItems.length === 0)
    throw new ApiError(400, "Cart is Empty");

  //   new order object
  const order = {
    user: userId,
    shippingAddress: shippingAdress,
    paymentMethod: paymentMethod,
  };

  // calculate total cartItems
  const totalItems = cart.cartItems.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);
  const deliveryCharges = totalItems * 5; // cacluate delivery charges
  const totalAmount = cart.cartItems.reduce((sum, item) => {
    // calculate totalAmount of cart
    return (
      sum +
      item.product.price * item.quantity -
      item.product.discountedPrice * item.quantity
    );
  }, 0);
  order.totalItems = totalItems;
  order.deliveryCharges = deliveryCharges;
  order.totalAmount = helper.sum(totalAmount, deliveryCharges);
  order.orderItems = cart.cartItems.map((item) => {
    const data = {};
    data.product = item.product._id;
    data.name = item.product.name;
    data.price = item.product.price;
    data.quantity = item.quantity;
    data.total = item.product.price * item.quantity;

    return data;
  });

  const newOrder = await orderModel.create(order);

  if (!newOrder) throw new ApiError(500, "Order not generated");
  //   clear cart
  await cartService.clearCart(userId);
  return newOrder;
};

// cancel order via customer
const cancelOrder = async (orderId, userId) => {
  const order = await orderModel.findOne({ _id: orderId });
  if (!order) throw new ApiError(404, "Order not found");

  if (order.user.toString() !== userId) {
    throw new ApiError(401, "Unauthorized user");
  }

  //   update order status

  const nonCancellableStatus = ["delivered", "shipped"];
  if (nonCancellableStatus.includes(order.orderStatus))
    throw new ApiError(400, "order cannot be cancelled");
  const updatedOrder = await orderModel.findByIdAndUpdate(orderId, {
    orderStatus: "Cancelled",
  });

  if (!updatedOrder) throw new ApiError(400, "Order not cancelled ! try again");
  return updatedOrder;
};

// order status update via seller
const orderStatusUpdate = async (orderId, status) => {
  const order = await orderModel.findOne({ _id: orderId });

  if (!order) throw new ApiError(404, "Order not found");
  const nonCancellableStatus = ["delivered", "shipped", "Cancelled"];

  if (!nonCancellableStatus.includes(status))
    throw new ApiError(400, "status cannot be updated");
  const updatedStatus = await orderModel.findByIdAndUpdate(orderId, {
    orderStatus: status,
    new: true,
  });

  if (!updatedStatus) {
    throw new ApiError(500, "status not updated");
  }

  return updatedStatus;
};

// get all order for customer
const getMyorders = async (userId) => {
  const orders = await orderModel
    .find({ user: userId })
    .sort({ createdAt: -1 });

  if (orders.lenght == 0) {
    throw new ApiError(404, "No Order Found");
  }

  return orders;
};

module.exports = { createOrder, cancelOrder, orderStatusUpdate, getMyorders };
