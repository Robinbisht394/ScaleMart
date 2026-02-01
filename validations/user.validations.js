const { z } = require("zod");

const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(3, "user name is too short"),
    email: z.string().min(5, "provide valid email address"),
    password: z
      .string()
      .min(5, "min length must be 5")
      .includes("@", "invalid email address"),
  }),
});

const loginUserSchema = z.object({
  body: z.object({
    name: z.string().min(3, "user name is too short").optional(),
    email: z
      .string({
        required_error: "Email not provided",
        invalid_type_error: "Email must be a string",
      })
      .min(5, "provide valid email address")
      .includes("@", "invalid email address"),
    password: z
      .string({
        required_error: "Password not given",
        invalid_type_error: "Password must be a string",
      })
      .min(5, "min length must be 5"),
  }),
});

const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(3, "user name is too short"),
  }),
});

const changeUserPasswordSchema = z.object({
  body: z.object({
    password: z
      .string({
        required_error: "Password not provided",
        invalid_type_error: "Password must be a string",
      })
      .min(6, "min length must be 6"),
  }),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  changeUserPasswordSchema,
  loginUserSchema,
};
