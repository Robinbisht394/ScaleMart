require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/database.js");
const { connectRedis } = require("./Config/redis.js");

const PORT = process.env.PORT || 5000;

connectDB();
connectRedis();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
