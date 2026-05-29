const User = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const request = require("supertest");
const app = require("../../app");
const createAdminAndGetToken = async () => {
  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await User.create({
    name: "Admin",
    email: "admin@test.com",
    password: hashedPassword,
    role: "admin",
  });

  const loginResponse = await request(app).post("/api/v1/auth/login").send({
    email: "admin@test.com",
    password: "Admin@123",
  });

  return loginResponse.body.data.token;
};

const createUserAndGetToken = async () => {
  const hashedPassword = await bcrypt.hash("User@123", 10);

  await User.create({
    name: "Robin",
    email: "robin@test.com",
    password: hashedPassword,
    role: "user",
  });

  const loginResponse = await request(app).post("/api/v1/auth/login").send({
    email: "robin@test.com",
    password: "User@123",
  });

  return {
    token: loginResponse.body.data.token,
    id: loginResponse.body.data.user._id,
    name: loginResponse.body.data.user.name,
  };
};
module.exports = { createAdminAndGetToken, createUserAndGetToken };
