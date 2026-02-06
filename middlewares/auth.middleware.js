const jwt = require("jsonwebtoken");
const ApiError = require("../Utils/ApiError");
const { JWT_SECRET } = require("../Config/jwt");

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new ApiError(401, "Not authorized");
  }

  const decoded = jwt.verify(token, JWT_SECRET);
  req.user = decoded.id;
  next();
};

const adminRole = (req, res, next) => {
  const { user } = req.user;
  const role = "ADMIN";

  if (user.role.toUpperCase() === role) {
    next();
  } else {
    return res.status(403).json(new ApiError(403, "Permission not granted"));
  }
};
const userRole = (req, res, next) => {
  const { user } = req.user;
  const role = "USER";

  if (user.role.toUpperCase() === role) {
    next();
  } else {
    return res.status(403).json(new ApiError(403, "Permission not granted"));
  }
};

module.exports = { protect, adminRole, userRole };
