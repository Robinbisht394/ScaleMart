const { GiThrownDaggers } = require("react-icons/gi");
const categoryModel = require("../Models/category.model");
const productModel = require("../Models/product.model.js");
const ApiError = require("../utils/ApiError");

// create new Product
const createProductService = async (req) => {
  console.log("product service", req);
  //  check if price > discount price
  console.log("Price type", typeof req.name);
  if (req.price < (req?.discountedPrice || 0))
    throw new ApiError(
      400,
      "product price should be greater than discounted price",
    );

  // check if product allready exist
  const existingProduct = await productModel.findOne({ name: req.name });
  if (existingProduct) throw new ApiError(400, "Product exist already");

  // check if product category exist
  const isCategory = await categoryModel.findById(req.category);
  if (!isCategory) throw new ApiError(400, "category doesn't exist");

  const newProduct = await productModel.create(req);
  if (!newProduct) throw new ApiError(500, "Product not created ! try again");
  return newProduct;
};

// update product by Id
const updateProduct = async (req) => {
  const existingProduct = await productModel.findById(req.params.id);
  if (!existingProduct) throw new ApiError(404, "product not found");

  const updatedProduct = await productModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );

  if (!updateProduct)
    throw new ApiError(500, "Product not upadted ! try again");

  return updatedProduct;
};

// deleted product by Id
const deleteProduct = async (req) => {
  const deletedProduct = await productModel.findByIdAndUpdate(
    req.params.id,
    { $set: { isActive: false } },
    { new: true },
  );

  if (!deletedProduct) throw new ApiError(500, "Product not Found");
  return deletedProduct;
};

const getAllproducts = async () => {
  const products = await productModel
    .find(
      {},
      {
        name: 1,
        description: 1,
        price: 1,
        discountedPrice: 1,
        brand: 1,
        images: 1,
        ratings: 1,
        isFeatured: 1,
        attributes: 1,
        stock: 1,
      },
    )
    .populate("category", "name description");

  if (!products) throw new ApiError(404, "No products Found");

  return products;
};

const searchProducts = async (req) => {
  console.log("search req", req);
  const {
    name,
    brand,
    category,
    page = 1,
    limit = 10,
    minPrice,
    maxPrice,
  } = req.query;

  const queryObject = { isActive: true };
  if (name) {
    queryObject.$or = [
      { name: { $regex: name, $options: "i" } },
      { description: { $regex: name, $options: "i" } },
    ];
  }
  if (brand) queryObject.brand = { $regex: brand, $options: "i" };
  if (category) queryObject.category = category;

  if (minPrice || maxPrice) {
    queryObject.price = {};
    if (minPrice) queryObject.price.$gte = Number(minPrice);
    if (maxPrice) queryObject.price.$lte = Number(maxPrice);
  }

  const skip = (page - 1) * limit; //pagination
  const products = await productModel
    .find(queryObject)
    .populate("category", "name")
    .sort("createdAt") //sorting
    .skip(skip)
    .limit(Number(limit));

  const total = await productModel.countDocuments(queryObject);
  return {
    total: total,
    page: page,
    pages: Math.ceil(total / limit),
    products,
  };
};

const getProductById = async (productId) => {
  const product = await productModel.findById(productId);

  if (!product) throw new ApiError(404, "Product doesn't exist");

  return product;
};
module.exports = {
  createProductService,
  updateProduct,
  deleteProduct,
  getAllproducts,
  getProductById,
  searchProducts,
};
