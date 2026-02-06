const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../Models/user.model");
const ApiError = require("../Utils/ApiError");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../Config/jwt.js");

const generateToken = (userId) => {
  //generate JWT token for user
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

// user signup
const signup = async (name, email, password, role) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists"); // throw API error
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "user",
  });

  const token = generateToken(user._id);
  return { user, token };
};

// user login
const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password); //compare password
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }
  // new Object(user.password) = "";
  const token = generateToken(user._id);
  return { user, token };
};

module.exports = { signup, login };
