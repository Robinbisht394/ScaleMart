const { ZodError } = require("zod");
const ApiError = require("../Utils/ApiError");
// const { BiError } = require("react-icons/bi");

const validate = (schema) => (req, res, next) => {
  console.log("validation", req.body);
  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    next();
  } catch (err) {
    console.log("validation error", err);

    if (err instanceof ZodError) {
      const message = err.errors.map((e) => e.message).join(", ");
      return next(new ApiError(400, message));
    }
    next(err);
  }
};

module.exports = validate;
