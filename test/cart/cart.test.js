const request = require("supertest");
const bcrypt = require("bcryptjs");
const app = require("../../app");
const User = require("../../models/user.model");
const Product = require("../../models/product.model");
const Category = require("../../models/category.model");
const Cart = require("../../models/cart.model");

describe("Cart API Testing", () => {
  let token;
  let user;
  let product;

  beforeEach(async () => {
    // create a user
    const hashedPassword = await bcrypt.hash("Password@123", 10);

    user = await User.create({
      name: "Robin",
      email: "robin@test.com",
      password: hashedPassword,
      role: "user",
    });

    //  get the user logged in
    const loginResponse = await request(app).post("/api/v1/auth/login").send({
      email: "robin@test.com",
      password: "Password@123",
    });

    token = loginResponse.body.data.token;
    // create category

    const category = await Category.create({
      name: "Electronics",
      slug: "electronics",
      description: "Electronic products",
    });

    // create product

    product = await Product.create({
      name: "iPhone 15",

      slug: "iphone-15",

      description: "Apple smartphone",

      price: 1000,

      discountedPrice: 100,

      category: category._id,

      brand: "Apple",

      stock: 10,

      sku: "IPHONE15",
    });
  });

  //  add product to the cart

  test("should add product to cart", async () => {
    const response = await request(app)
      .post("/api/v1/cart/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        product: product._id,

        quantity: 2,
      });

    expect(response.statusCode).toBe(201);

    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe("Item added to cart");
  });

  test("should get user cart", async () => {
    // add product first
    await request(app)
      .post("/api/v1/cart")
      .set("Authorization", `Bearer ${token}`)
      .send({
        product: product._id,

        quantity: 2,
      });

    const response = await request(app)
      .get(`/api/v1/cart/${user._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);
  });

  test("should remove product from cart", async () => {
    // add product first
    await request(app)
      .post("/api/v1/cart")
      .set("Authorization", `Bearer ${token}`)
      .send({
        product: product._id,

        quantity: 2,
      });

    const response = await request(app)
      .delete(`/api/v1/cart/removeCart/${product._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);
  });

  test("should update quantity", async () => {
    // add product first
    await request(app)
      .post("/api/v1/cart")
      .set("Authorization", `Bearer ${token}`)
      .send({
        product: product._id,

        quantity: 1,
      });

    const response = await request(app)
      .put(`/api/v1/cart/updatequantity/${product._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);
  });

  test("should fail if quantity exceeds limit", async () => {
    // add multiple times
    await request(app)
      .post("/api/v1/cart")
      .set("Authorization", `Bearer ${token}`)
      .send({
        product: product._id,
        quantity: 3,
      });

    const response = await request(app)
      .put(`/api/v1/cart/updatequantity/${product._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(400);
  });

  test("should clear cart", async () => {
    // add product first
    await request(app)
      .post("/api/v1/cart")
      .set("Authorization", `Bearer ${token}`)
      .send({
        product: product._id,

        quantity: 2,
      });

    const response = await request(app)
      .delete("/api/v1/cart/clearcart")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);
  });

  // UNAUTHORIZED ACCESS

  test("should fail without token", async () => {
    const response = await request(app).get(`/api/v1/cart/${user._id}`);

    expect(response.statusCode).toBe(401);
  });
});
