const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");
const errorHandler = require("./middlewares/error.middleware.js");
const logger = require("./Utils/logger.js");
const authRoutes = require("./Routes/auth.routes");
const userRoutes = require("./Routes/user.routes.js");
const productRoutes = require("./Routes/product.routes.js");
const cartRoutes = require("./Routes/cart.routes.js");
const orderRoutes = require("./Routes/order.routes.js");
const paymentRoutes = require("./Routes/payment.routes.js");
const categoryRoutes = require("./Routes/category.routes.js");
const addressRoutes = require("./Routes/address.routes.js");
const adminAnalyticsRoutes = require("./Routes/admin.routes.js");
const userAnalyticsRoutes = require("./Routes/userAnalytics.routes.js");
const app = express();

app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Swagger documentation - only load if file exists
const swaggerFilePath = path.join(__dirname, "./swagger-output.json");
if (fs.existsSync(swaggerFilePath)) {
  try {
    // Clear the require cache to ensure fresh load
    delete require.cache[require.resolve("./swagger-output.json")];
    const swaggerFile = require("./swagger-output.json");
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
    console.log("✅ Swagger docs loaded at /api-docs");
  } catch (error) {
    console.log("⚠️ Swagger file exists but failed to load:", error.message);
  }
} else {
  console.log("⚠️ swagger-output.json not found. Run: node swagger.js");
}

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/analytics/admin", adminAnalyticsRoutes);
app.use("/api/v1/analytics/user", userAnalyticsRoutes);

app.get("/", (req, res) => {
  res.send("ScaleMart API running 🚀", req.body);
});

app.use(logger);
app.use(errorHandler);

module.exports = app;
