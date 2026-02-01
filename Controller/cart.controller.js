const ApiResponse = require("../Utils/ApiResponse");
const cartService = require("../Services/cart.service");
// Product Addition in user cart

const addTocart = async (req, res) => {
  // const userId = req.user.id;
  const userId = req.body.id;
  const { productId, quantity } = req.body;
  const product = await cartService.addTocart(userId, productId, quantity);

  return res
    .status(201)
    .json(new ApiResponse(201, product, "Item added to cart"));
};

const getCart = async (req, res) => {
  // const userId = req.user.id;
  const userId = req.params.id;

  const cart = await cartService.getCart(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "cart fetched successfully"));
};

// remove product from cart
const removeCart = async (req, res) => {
  const userId = req.user.id;

  const productId = req.params.id;

  const cart = await cartService.removeProduct(userId, productId);

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Removed successfully"));
};
const updateQuantity = async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.id;

  const cart = await cartService.updateQuantity(userId, productId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "updated successfully"));
};

const clearCart = async (req, res) => {
  // const userId = req.user.id;
  const userId = "697c61ce0b24889e965a5cea";

  const cart = await cartService.clearCart(userId);

  return res.status(200).json(new ApiResponse(200, [], "cleared successfully"));
};

module.exports = { addTocart, getCart, removeCart, updateQuantity, clearCart };
