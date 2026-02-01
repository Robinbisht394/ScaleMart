const ApiError = require("../Utils/ApiError");
const cartModel = require("../Models/cart.model");
const productModel = require("../Models/product.model");

const addTocart = async (userId, productId, productQuantity) => {
  // check if product exist
  const product = await productModel.findOne({ _id: productId });
  if (!product) return new ApiError(404, "Product not Found");

  //   check if cart exist
  let existingCart = await cartModel.findOne({ user: userId });

  if (!existingCart) {
    const newCart = cartModel.create({
      user: userId,
      cartItems: [{ product: productId, quantity: productQuantity }],
    });

    return newCart;
  }

  //   check if product already exist
  let itemIndex = existingCart.cartItems.findIndex(
    (item) => item.product.toString() == productId,
  );

  if (itemIndex > -1) {
    if (existingCart.cartItems[itemIndex].quantity >= 3) {
      throw new ApiError(400, "Maximum 3 quantities allowed");
    }
    existingCart.cartItems[itemIndex].quantity += 1;
  } else {
    existingCart.cartItems.push({ product: productId });
  }

  await existingCart.save();

  return existingCart;
};

// get cart

const getCart = async (userId) => {
  const cart = await cartModel
    .findOne({ user: userId })
    .populate(
      "cartItems.product",
      "name price description brand attributes Images",
    );

  if (!cart) return { cartItems: [], total: 0 };

  const total = cart.cartItems.reduce((sum, item) => {
    console.log("price", typeof item.product.price);
    return sum + item.product.price * item.quantity;
  }, 0);

  return { cart, total };
};

const removeProduct = async (userId, productId) => {
  // check if product exist
  const product = await productModel.findOne({ _id: productId });
  if (!product) {
    throw new ApiError(404, "product not found");
  }

  const updatedCart = await cartModel.updateOne(
    { user: userId },
    { $pull: { cartItems: { product: productId } } },
  );

  return updatedCart;
};

// update the quantity of products
const updateQuantity = async (userId, productId) => {
  // check if product exist in cart
  let productIncart = await cartModel.findOne({
    user: userId,
    "cartItems.product": productId,
  });
  if (!productIncart) throw new ApiError(404, "product not added in cart");

  const productIndex = productIncart.cartItems.findIndex(
    (item) => item.product.toString() === productId,
  );
  if (productIndex == -1) throw new ApiError(404, "product not found");
  if (productIncart.cartItems[productIndex].quantity >= 3)
    //if product quantity is already full
    throw new ApiError(400, "Quantity is full");

  productIncart.cartItems[productIndex].quantity += 1;
  await productIncart.save();
  return productIncart;
};

// clear cart
const clearCart = async (userId) => {
  //  if cartExist
  let userCart = await cartModel.findOne({ user: userId });
  console.log(userCart);
  if (!userCart || userCart.cartItems.length === 0)
    throw new ApiError(400, "cart Is Empty");

  userCart.cartItems = []; //empty the cart
  await userCart.save();
  return userCart;
};

module.exports = {
  addTocart,
  getCart,
  clearCart,
  removeProduct,
  updateQuantity,
};
