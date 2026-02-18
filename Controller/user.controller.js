const User = require("../Models/user.model.js");
const ApiResponse = require("../Utils/ApiResponse.js");
const ApiError = require("../Utils/ApiError.js");
const asyncHandler = require("../Utils/asyncHandler.js");
const userService = require("../Services/user.service.js");
const bcrypt = require("bcryptjs");

// get all users array
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("name role");
  if (!users)
    return res.status(200).json(new ApiResponse(200, [], "Users Not Found"));

  res
    .status(200)
    .json(new ApiResponse(200, users, "users fetched successfully"));
});

// change User password

const changeUserPassword = asyncHandler(async (req, res) => {
  // const userId = req.user.id;
  const userId = req.body.id;
  const user = await User.findById(userId); //check if user registered
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  console.log(user);

  const isMatch = await bcrypt.compare(req.body.password, user.password); //check if newpassword and old password are same
  if (isMatch) throw new ApiError(400, "Password is same as before");

  const newPassword = await bcrypt.hash(req.body.password, 10); //hash new password
  const changePassword = await User.findByIdAndUpdate(userId, {
    password: newPassword,
  });

  if (!changePassword) {
    throw new ApiError(500, "Password not Changed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, [], "Password changed successfully"));
});

const aiInsights = asyncHandler(async (req, res) => {
  const query = req.query.q || req.query.query || "";
  if (!query) throw new ApiError(400, "Query parameter is required");

  const result = await userService.getAIInsights(query);

  return res
    .status(200)
    .json(new ApiResponse(200, result, "AI insights fetched successfully"));
});

module.exports = { getUsers, changeUserPassword, aiInsights };
