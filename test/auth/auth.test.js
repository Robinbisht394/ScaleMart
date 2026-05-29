const request = require("supertest");
const app = require("../../app");
const User = require("../../models/user.model.js");
const bcrypt = require("bcryptjs");

describe("Auth API", () => {
  test("should register a new user", async () => {
    const res = await request(app).post("/api/v1/auth/signup").send({
      name: "John Doe",
      email: "john@example.com",
      password: "password@123",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.data).toHaveProperty("token");
  });

  test("should return error when email is missing", async () => {
    const response = await request(app).post("/api/v1/auth/signup").send({
      name: "Robin",
      password: "password@123",
    });

    expect(response.statusCode).toBe(400);

    expect(response.body.success).toBe(false);
  });

  test("should return error if email already exists", async () => {
    await User.create({
      name: "Robin",
      email: "robin@test.com",
      password: "Password@123",
    });

    const response = await request(app).post("/api/v1/auth/signup").send({
      name: "Robin",
      email: "robin@test.com",
      password: "Password@123",
    });

    expect(response.statusCode).toBe(409);

    expect(response.body.success).toBe(false);
  });
});

describe("Login API", () => {
  test("should login successfully", async () => {
    const hashedPassword = await bcrypt.hash("Password@123", 10);
    await User.create({
      name: "Robin",
      email: "robin@test.com",
      password: hashedPassword,
    });

    const response = await request(app).post("/api/v1/auth/login").send({
      email: "robin@test.com",
      password: "Password@123",
    });

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("token");
  });
  test("should return error for invalid email", async () => {
    const hashedPassword = await bcrypt.hash("Password@123", 10);
    const response = await request(app).post("/api/v1/auth/login").send({
      email: "invalid@example.com",
      password: hashedPassword,
    });

    expect(response.statusCode).toBe(401);

    expect(response.body.success).toBe(false);
  });

  test("should return error for invalid password", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      email: "robin@test.com",
      password: "WrongPassword@123",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });
});