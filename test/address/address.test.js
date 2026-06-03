const request = require("supertest");
const app = require("../../app");
const User = require("../../Models/user.model.js");
const bcrypt = require("bcryptjs");
const address = require("../../Models/address.model.js");
const addressModel = require("../../Models/address.model.js");
const { createUserAndGetToken } = require("../helper/createUser.js");
describe("test user address change routes", () => {
  test("add new address for user", async () => {
    const { token: newUserToken, id: userId } = await createUserAndGetToken();
    // assign

    const res = await request(app)
      .post("/api/v1/address/newaddress")
      .set("Authorization", `Bearer ${newUserToken}`)
      .send({
        user: userId,
        fullName: "Robin",
        phone: "8178206127",
        addressLine: "mandawali school block",
        city: "new delhi",
        state: "Delhi",
        pincode: "110092",
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe("New address added successfully");
    expect(res.body.success).toBe(true);
  });

  test("to get user address", async () => {
    const { token: newUserToken, id: userId } = await createUserAndGetToken();

    const res = await request(app)
      .get("/api/v1/address/")
      .set("Authorization", `Bearer ${newUserToken}`);
    expect(res.statusCode).toEqual(200);
  });

  test("delete the user address", async () => {
    const {
      token: newUserToken,
      id: userId,
      name: userName,
    } = await createUserAndGetToken();

    const address = await addressModel.create({
      user: userId,
      fullName: userName,
      phone: "8178206127",
      addressLine: "mandawali school block",
      city: "new delhi",
      state: "Delhi",
      pincode: "110092",
    });

    const res = await request(app)
      .delete(`/api/v1/address/${address._id}`)
      .set("Authorization", `Bearer ${newUserToken}`);
    expect(res.statusCode).toEqual(200);
  });
});