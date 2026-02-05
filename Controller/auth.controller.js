const ApiResponse = require("../Utils/ApiResponse");
const asyncHandler = require("../Utils/asyncHandler");
const authService = require("../Services/auth.service");

exports.signup = asyncHandler(async (req, res) => {
  // console.log("signup controller", req.body);
  const { name, email, password, role } = req.body;
  const result = await authService.signup(name, email, password, role);
  res.status(201).json(new ApiResponse(201, result, "Signup successful"));
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("login data", req.body);

  const result = await authService.login(email, password);
  res.status(200).json(new ApiResponse(200, result, "Login successful"));
});
