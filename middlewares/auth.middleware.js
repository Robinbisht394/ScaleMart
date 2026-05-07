const jwt = require("jsonwebtoken");
const ApiError = require("../Utils/ApiError");
const { JWT_SECRET } = require("../Config/jwt");
const { User } = require("../Models/user.model"); // Import User model

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new ApiError(401, "Not authorized");
  }

  const decoded = jwt.verify(token, JWT_SECRET);
  console.log("Decoded JWT payload:", decoded); // Debugging log
  req.user = { id: decoded.id, role: decoded.role }; // Attach user ID and role to request
  next();
};

const adminRole = (req, res, next) => {
  try {
    const { role } = req.user; // Extract role directly from JWT payload
    console.log("User role from token:", role);

    if (role.toUpperCase() === "ADMIN") {
      next();
    } else {
      return res.status(403).json(new ApiError(403, "Permission not granted"));
    }
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
};
const userRole = (req, res, next) => {
  console.log("User role from token:", req.user.role);
  const { user } = req.user;
  const role = "USER";

  if (req.user.role.toUpperCase() === role) {
    next();
  } else {
    return res.status(403).json(new ApiError(403, "Permission not granted"));
  }
};

module.exports = { protect, adminRole, userRole };
