const ApiError = require("../Utils/ApiError");
const orderModel = require("../Models/order.model");
const cartModel = require("../Models/cart.model");
const cartService = require("../Services/cart.service");
const helper = require("../Utils/helper");
const addressService = require("../Services/address.service");
const redisClient = require("../Config/redis").redisClient;

//create new order
const createOrder = async (req) => {
  const { shippingAdress, paymentMethod } = req.body;
  console.log("Received shipping address:", shippingAdress, paymentMethod); // Debug log
  const userId = req.user.id;

  // Validate cart
  const cart = await cartModel
    .findOne({ user: userId })
    .populate("cartItems.product", "name price discountedPrice");

  if (!cart || cart.cartItems.length === 0)
    throw new ApiError(400, "Cart is Empty");

  // New order object
  const order = {
    user: userId,
    shippingAddress: shippingAdress, // Directly use the provided shipping address
    paymentMethod: paymentMethod,
  };

  // Calculate total cartItems
  const totalItems = cart.cartItems.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);
  const deliveryCharges = totalItems * 5; // Calculate delivery charges

  // Calculate total price and total discount
  const totalPrice = cart.cartItems.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);
  const totalDiscount = cart.cartItems.reduce((sum, item) => {
    return sum + item.product.discountedPrice * item.quantity;
  }, 0);

  // Calculate totalAmount
  const totalAmount = totalPrice + deliveryCharges - totalDiscount;

  order.totalItems = totalItems;
  order.deliveryCharges = deliveryCharges;
  order.totalAmount = totalAmount; // Assign the corrected totalAmount
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
  // Clear cart
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
    orderStatus: "cancelled",
  });
  console.log("updated order", updatedOrder);
  if (!updatedOrder) throw new ApiError(400, "Order not cancelled ! try again");
  return updatedOrder;
};

// order status update via seller
const orderStatusUpdate = async (orderId, status) => {
  const order = await orderModel.findOne({ _id: orderId });

  if (!order) throw new ApiError(404, "Order not found");
  const nonCancellableStatus = ["delivered", "shipped", "cancelled"];

  if (!nonCancellableStatus.includes(status))
    throw new ApiError(400, "status cannot be updated");
  const updatedStatus = await orderModel.findByIdAndUpdate(orderId, {
    orderStatus: status,
  });

  if (!updatedStatus) {
    throw new ApiError(500, "status not updated");
  }

  return updatedStatus;
};

// get all order for customer
const getMyorders = async (userId) => {
  // const cacheOrders = await redisClient.get(`orders_${userId}`);
  // if (cacheOrders) {
  //   return JSON.parse(cacheOrders);
  // } // return cache orders if exist

  const orders = await orderModel
    .find({ user: userId })
    .sort({ createdAt: -1 });

  if (orders.length == 0) {
    throw new ApiError(404, "No Order Found");
  }

  // cache the user orders for 5 minutes
  // redisClient.setEx(`orders_${userId}`, 300, JSON.stringify(orders));
  return orders;
};

module.exports = { createOrder, cancelOrder, orderStatusUpdate, getMyorders };
