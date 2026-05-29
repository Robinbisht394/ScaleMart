const request = require("supertest");
const app = require("../../app");
const User = require("../../models/user.model.js");
const bcrypt = require("bcryptjs");



describe("category routes API", () => {
  let token;
  let user;
  beforeEach(async () => {
    // create a user
    const hashedPassword = await bcrypt.hash("Password@123", 10);

    user = await User.create({
      name: "Robin",
      email: "robin@test.com",
      password: hashedPassword,
      role: "admin",
    });

    //  get the user logged in
    const loginResponse = await request(app).post("/api/v1/auth/login").send({
      email: "robin@test.com",
      password: "Password@123",
    });

    token = loginResponse.body.data.token;
  });

  test("create a catgeory", async () => {
    const res = await request(app)
      .post("/api/v1/categories/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Electronics",
        slug: "Phone",
        description: "It is a electronic category",
        isActive: true,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("categories created Successfully");
  });

  test("get all categories", async () => {
    const res = await request(app).get("/api/v1/categories/");

    expect(res.body.success).toBe(true);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("Categories fetched successfully");
  });
});
