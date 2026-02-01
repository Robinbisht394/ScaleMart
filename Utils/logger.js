const fs = require("fs");
const logger = (req, res, next) => {
  const start = new Date();
  // res.on("finish", () => {
  const logData = ` ${new Date().toISOString()} NEW REQ ${req.method}
    TO ${req.originalUrl} FROM ${req.ip} ${res.statusCode} IN ${new Date().getTime() - start}`;
  fs.appendFile("app.log", logData, (err) => {
    if (err) console.error(err);
    // });
    next();
  });
};

module.exports = logger;
