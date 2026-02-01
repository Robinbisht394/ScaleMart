const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "ScaleMart API",
    description: "ScaleMart e-commerce API documentation",
    version: "1.0.0",
    contact: {
      name: "ScaleMart Support",
      email: "support@scalemart.com",
    },
  },
  host: process.env.SWAGGER_HOST || undefined,
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],

  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Bearer token for authentication",
    },
  },
  definitions: {
    SignupRequest: {
      type: "object",
      properties: {
        name: { type: "string", description: "User full name" },
        email: { type: "string", description: "User email address" },
        password: { type: "string", description: "User password" },
        role: {
          type: "string",
          enum: ["user", "admin"],
          description: "User role",
          default: "user",
        },
      },
      required: ["name", "email", "password"],
    },
    LoginRequest: {
      type: "object",
      properties: {
        email: { type: "string", description: "User email address" },
        password: { type: "string", description: "User password" },
        name: { type: "string", description: "User name (optional)" },
      },
      required: ["email", "password"],
    },
    CreateProductRequest: {
      type: "object",
      properties: {
        name: { type: "string", description: "Product name" },
        slug: { type: "string", description: "URL-friendly identifier" },
        description: { type: "string", description: "Product description" },
        price: { type: "number", description: "Product price" },
        discountedPrice: {
          type: "number",
          description: "Discounted price",
          default: 1,
        },
        category: { type: "string", description: "Category ID (ObjectId)" },
        brand: { type: "string", description: "Product brand" },
        images: {
          type: "array",
          items: {
            type: "object",
            properties: {
              url: { type: "string", description: "Image URL" },
              alt: { type: "string", description: "Alt text" },
            },
          },
          description: "Product images array",
        },
        stock: {
          type: "number",
          description: "Available stock",
          default: 0,
        },
        sku: { type: "string", description: "Stock keeping unit" },
        attributes: {
          type: "array",
          items: {
            type: "object",
            properties: {
              key: { type: "string", description: "Attribute key" },
              value: { type: "string", description: "Attribute value" },
            },
          },
          description: "Product attributes (Color, Size, etc.)",
        },
        isFeatured: {
          type: "boolean",
          description: "Is featured product",
          default: false,
        },
        isActive: {
          type: "boolean",
          description: "Is product active",
          default: true,
        },
        createdBy: {
          type: "string",
          description: "Creator User ID (ObjectId)",
        },
      },
      required: ["name", "slug", "description", "price", "category"],
    },
    UpdateProductRequest: {
      type: "object",
      properties: {
        name: { type: "string", description: "Product name" },
        slug: { type: "string", description: "URL-friendly identifier" },
        description: { type: "string", description: "Product description" },
        price: { type: "number", description: "Product price" },
        discountedPrice: { type: "number", description: "Discounted price" },
        category: { type: "string", description: "Category ID" },
        brand: { type: "string", description: "Product brand" },
        images: {
          type: "array",
          items: {
            type: "object",
            properties: {
              url: { type: "string" },
              alt: { type: "string" },
            },
          },
        },
        stock: { type: "number", description: "Available stock" },
        sku: { type: "string" },
        attributes: { type: "array", items: { type: "object" } },
        isFeatured: { type: "boolean" },
        isActive: { type: "boolean" },
      },
    },
    CreateCategoryRequest: {
      type: "object",
      properties: {
        name: { type: "string", description: "Category name" },
        slug: { type: "string", description: "URL-friendly identifier" },
        description: { type: "string", description: "Category description" },
        isActive: {
          type: "boolean",
          description: "Is category active",
          default: true,
        },
        parentCategory: {
          type: "string",
          description: "Parent category ID for subcategories (ObjectId)",
        },
      },
      required: ["name", "slug"],
    },
    UpdateCategoryRequest: {
      type: "object",
      properties: {
        name: { type: "string", description: "Category name" },
        slug: { type: "string", description: "URL-friendly identifier" },
        description: { type: "string", description: "Category description" },
        isActive: { type: "boolean", description: "Is category active" },
        parentCategory: { type: "string", description: "Parent category ID" },
      },
    },
    AddToCartRequest: {
      type: "object",
      properties: {
        id: { type: "string", description: "User ID (ObjectId)" },
        productId: { type: "string", description: "Product ID (ObjectId)" },
        quantity: { type: "number", description: "Product quantity" },
      },
      required: ["id", "productId", "quantity"],
    },
    CreateOrderRequest: {
      type: "object",
      properties: {
        shippingAdress: {
          type: "object",
          properties: {
            fullName: { type: "string" },
            phone: { type: "string" },
            addressLine: { type: "string" },
            city: { type: "string" },
            state: { type: "string" },
            pincode: { type: "string" },
          },
          required: [
            "fullName",
            "phone",
            "addressLine",
            "city",
            "state",
            "pincode",
          ],
        },
        paymentMethod: {
          type: "string",
          enum: ["COD", "CARD"],
          description: "Payment method",
        },
      },
      required: ["shippingAdress", "paymentMethod"],
    },
    OrderStatusUpdateRequest: {
      type: "object",
      properties: {
        status: {
          type: "string",
          enum: ["delivered", "shipped", "Cancelled"],
          description: "New order status",
        },
      },
      required: ["status"],
    },
    CreatePaymentRequest: {
      type: "object",
      properties: {
        orderId: { type: "string", description: "Order ID (ObjectId)" },
        method: {
          type: "string",
          enum: ["UPI", "CARD", "NETBANKING", "COD"],
          description: "Payment method",
        },
      },
      required: ["orderId", "method"],
    },
    ApiResponse: {
      type: "object",
      properties: {
        statusCode: { type: "number", description: "HTTP status code" },
        data: { type: "object", description: "Response data" },
        message: { type: "string", description: "Response message" },
        success: { type: "boolean", description: "Operation success status" },
      },
    },
    ApiError: {
      type: "object",
      properties: {
        statusCode: { type: "number", description: "HTTP status code" },
        message: { type: "string", description: "Error message" },
        success: { type: "boolean", description: "Always false for errors" },
        data: { type: "object", description: "Error details" },
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["./app.js"];

swaggerAutogen(outputFile, routes, doc).then(() => {
  console.log("Swagger documentation generated successfully");
});

module.exports = swaggerAutogen;
