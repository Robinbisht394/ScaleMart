const request = require("supertest");
const app = require("../../app");
const User = require("../../models/user.model.js");
const bcrypt = require("bcryptjs");

// test cases for user routes

describe("Auth API", () => {
  test("get all users", async () => {
    const res = await request(app).get("/api/v1/user/");
    console.log(res.body);
    expect(res.statusCode).toEqual(200);
  });

  test("should return error if new password is same", async () => {
    const hashedPassword = await bcrypt.hash("Password@123", 10);

    await User.create({
      name: "Robin",
      email: "robin@test.com",
      password: hashedPassword,
    });

    const loginResponse = await request(app).post("/api/v1/auth/login").send({
      email: "robin@test.com",
      password: "Password@123",
    });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .patch("/api/v1/user/changepassword")
      .set("Authorization", `Bearer ${token}`)
      .send({
        password: "Password@123",
      });

    expect(response.statusCode).toBe(400);

    expect(response.body.success).toBe(false);
  });
  test("should return new password changed successfully", async () => {
    const hashedPassword = await bcrypt.hash("Password@123", 10);

    await User.create({
      name: "Robin",
      email: "robin@test.com",
      password: hashedPassword,
    });

    const loginResponse = await request(app).post("/api/v1/auth/login").send({
      email: "robin@test.com",
      password: "Password@123",
    });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .patch("/api/v1/user/changepassword")
      .set("Authorization", `Bearer ${token}`)
      .send({
        password: "Password@120",
      });

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);
  });
});
