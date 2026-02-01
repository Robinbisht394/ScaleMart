const ApiResponse = require("../utils/ApiResponse");
const productService = require("../Services/product.service.js");
const asyncHandler = require("../Utils/asyncHandler.js");

// create new Product in database
const createProduct = asyncHandler(async (req, res) => {
  const newProduct = await productService.createProductService(req.body);

  res
    .status(201)
    .json(new ApiResponse(201, newProduct, "Product created successfully"));
});

// updateproduct by Id
const updateProduct = asyncHandler(async (req, res) => {
  const updatedProduct = await productService.updateProduct(req);

  return res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, "product updated successfully"));
});

// deletes the product by Id
const deleteProduct = asyncHandler(async (req, res) => {
  const updatedProduct = await productService.updateProduct(req);

  return res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, "product deleted successfully"));
});

// returns all products
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productService.getAllproducts();
  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products Fetched successfully"));
});

const searchProducts = asyncHandler(async (req, res) => {
  const products = await productService.searchProducts(req);

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully"));
});

const getProductById = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await productService.getProductById(productId);

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"));
});

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  searchProducts,
};
