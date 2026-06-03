const request = require("supertest");
const bcrypt = require("bcryptjs");

const app = require("../../app");

const User = require("../../Models/user.model");
const Product = require("../../Models/product.model");
const Category = require("../../Models/category.model");
const Cart = require("../../Models/cart.model");
const Order = require("../../Models/order.model");
const addressModel = require("../../Models/address.model.js");
const { createUserAndGetToken } = require("../helper/createUser");

test("should create order successfully", async () => {
  // login user

  const { token, id } = await createUserAndGetToken();
  // get created user

  const user = await User.findOne({
    email: "robin@test.com",
  });

  // create category

  const category = await Category.create({
    name: "Electronics",
    slug: "electronics",
    description: "Electronic items",
  });

  // create product

  const product = await Product.create({
    name: "iPhone 15",
    slug: "iphone-15",
    description: "Apple phone",
    price: 1000,
    discountedPrice: 100,
    category: category._id,
    stock: 10,
  });

  // create cart

  await Cart.create({
    user: user._id,
    cartItems: [
      {
        product: product._id,
        quantity: 2,
      },
    ],
  });

  // create address
  await addressModel.create({
    user: id,
    fullName: "Robin",
    phone: "8178206127",
    addressLine: "mandawali school block",
    city: "new delhi",
    state: "Delhi",
    pincode: "110092",
  });
  const address = await addressModel.findOne({ user: id });

  // create order

  const response = await request(app)
    .post("/api/v1/order/")
    .set("Authorization", `Bearer ${token}`)
    .send({
      shippingAdress: address._id,
      paymentMethod: "COD",
    });
  expect(response.statusCode).toBe(201);
  expect(response.body.success).toBe(true);
  expect(response.body.message).toBe("Order Placed successfully");
});

test("should cancel order successfully", async () => {
  // login user

  const { token, id } = await createUserAndGetToken();

  // get created user

  const user = await User.findOne({
    email: "robin@test.com",
  });

  // create category

  const category = await Category.create({
    name: "Electronics",
    slug: "electronics",
    description: "Electronic items",
  });

  // create product

  const product = await Product.create({
    name: "iPhone 15",
    slug: "iphone-15",
    description: "Apple phone",
    price: 1000,
    discountedPrice: 100,
    category: category._id,
    stock: 10,
  });

  // create cart

  await Cart.create({
    user: user._id,
    cartItems: [
      {
        product: product._id,
        quantity: 2,
      },
    ],
  });

  // create address
  await addressModel.create({
    user: id,
    fullName: "Robin",
    phone: "8178206127",
    addressLine: "mandawali school block",
    city: "new delhi",
    state: "Delhi",
    pincode: "110092",
  });
  const address = await addressModel.findOne({ user: id });

  // create order

  const order = await Order.create({
    user: id,
    shippingAddress: address._id,
  });

  const response = await request(app)
    .delete(`/api/v1/order/cancel/${order._id}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      shippingAdress: address._id,
      paymentMethod: "COD",
    });
  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body.message).toBe("Order cancelled");
});

test("should return 404 if no orders are found", async () => {
  const { token, id } = await createUserAndGetToken();
  const response = await request(app)
    .get(`/api/v1/order/`)
    .set("Authorization", `Bearer ${token}`);
  expect(response.statusCode).toBe(404);
  expect(response.body.success).toBe(false);
});

test("should return orders for the user", async () => {
  // login user
  const { token, id } = await createUserAndGetToken();

  // get created user
  const user = await User.findOne({
    email: "robin@test.com",
  });

  // create category
  const category = await Category.create({
    name: "Electronics",
    slug: "electronics",
    description: "Electronic items",
  });
  // create product
  const product = await Product.create({
    name: "iPhone 15",
    slug: "iphone-15",
    description: "Apple phone",
    price: 1000,
    discountedPrice: 100,
    category: category._id,
    stock: 10,
  });
  // create cart
  await Cart.create({
    user: user._id,
    cartItems: [
      {
        product: product._id,
        quantity: 2,
      },
    ],
  });

  // create address
  await addressModel.create({
    user: id,
    fullName: "Robin",
    phone: "8178206127",
    addressLine: "mandawali school block",
    city: "new delhi",
    state: "Delhi",
    pincode: "110092",
  });
  const address = await addressModel.findOne({ user: id });

  // create order

  const order = await Order.create({
    user: id,
    shippingAddress: address._id,
  });

  const response = await request(app)
    .get(`/api/v1/order/`)
    .set("Authorization", `Bearer ${token}`);
  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);
  expect(Array.isArray(response.body.data)).toBe(true);
});
