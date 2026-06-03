const request = require("supertest");
const bcrypt = require("bcryptjs");

const app = require("../../app");

const User = require("../../Models/user.model");
const Category = require("../../Models/category.model");
const Product = require("../../Models/product.model");
const { createCategory } = require("../helper/createCategory.js");
const { createAdminAndGetToken } = require("../helper/createUser.js");
describe("Product Routes API", () => {
  test("should create product successfully", async () => {
    // create admin user

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
      name: "Admin",
      email: "admin@test.com",
      password: hashedPassword,
      role: "admin",
    });

    // login admin

    const loginResponse = await request(app).post("/api/v1/auth/login").send({
      email: "admin@test.com",
      password: "Admin@123",
    });

    console.log(loginResponse.body);

    const token = loginResponse.body.data.token;

    // create category

    const category = await Category.create({
      name: "Electronics",
      slug: "electronics",
      description: "Electronic category",
      isActive: true,
    });

    // create product

    const response = await request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "iPhone 15",
        slug: "iphone-15",

        description: "Latest iPhone with AI features",

        price: 1200,

        discountedPrice: 1000,

        category: category._id,

        brand: "Apple",

        stock: 10,

        sku: "IPHONE15",

        isFeatured: true,
      });

    // assertions

    expect(response.statusCode).toBe(201);

    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe("Product created successfully");

    // verify product in DB
    const product = await Product.findOne({
      slug: "iphone-15",
    });

    expect(product).not.toBeNull();

    expect(product.name).toBe("iPhone 15");
  });
  // test to get Product by id
  test("should fetch product by id", async () => {
    const category = await createCategory();

    const product = await Product.create({
      name: "Samsung S24",
      slug: "samsung-s24",
      description: "Samsung flagship phone",
      price: 1000,
      discountedPrice: 900,
      category: category._id,
    });

    const response = await request(app).get(`/api/v1/products/${product._id}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data.name).toBe("Samsung S24");
  });

  // test to get all products
  test("should fetch all products", async () => {
    const category = await createCategory();

    await Product.create({
      name: "Google Pixel 8",
      slug: "google-pixel-8",
      description: "Google's latest smartphone",
      price: 900,
      discountedPrice: 800,
      category: category._id,
    });

    const response = await request(app).get("/api/v1/products");

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);

    expect(Array.isArray(response.body.data)).toBe(true);

    expect(response.body.data.length).toBeGreaterThan(0);
  });

  // test to update the product
  test("should update product successfully", async () => {
    const category = await createCategory();
    const adminToken = await createAdminAndGetToken();
    const product = await Product.create({
      name: "OnePlus 11",
      slug: "oneplus-11",
      description: "OnePlus flagship phone",
      price: 700,
      discountedPrice: 650,
      category: category._id,
    });

    const response = await request(app)
      .put(`/api/v1/products/${product._id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        price: 750,
        discountedPrice: 700,
      });
    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe("product updated successfully");

    // verify the update in DB
    const updatedProduct = await Product.findById(product._id);

    expect(updatedProduct.price).toBe(750);

    expect(updatedProduct.discountedPrice).toBe(700);
  });

  // test to delete the product
  test("should delete product successfully", async () => {
    const category = await createCategory();
    const adminToken = await createAdminAndGetToken();
    const product = await Product.create({
      name: "Sony Xperia 1",
      slug: "sony-xperia-1",
      description: "Sony's flagship phone",
      price: 800,
      discountedPrice: 750,
      category: category._id,
    });

    const response = await request(app)
      .delete(`/api/v1/products/${product._id}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe("product deleted successfully");

    // verify the deletion in DB
    const deletedProduct = await Product.findById(product._id);
  });
});
