const { ZodError } = require("zod");
const ApiError = require("../Utils/ApiError");

const validate = (schema) => (req, res, next) => {
  
  try {
    // Try structured validation first
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (result.success) {
      return next();
    }

    // Fallback: try flat body validation
    const fallback = schema.safeParse(req.body);

    if (fallback.success) {
      return next();
    }

    // If both fail, throw first error
    throw result.error;
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
