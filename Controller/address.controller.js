const ApiResponse = require("../Utils/ApiResponse");
const addressService = require("../Services/address.service");
const asyncHandler = require("../Utils/asyncHandler");
const addNewAddress = asyncHandler(async (req, res) => {
  const newAddress = await addressService.createNewAdress(req.user, req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, newAddress, "New address added successfully"));
});
const getAddress = asyncHandler(async (req, res) => {
  const newAddress = await addressService.getAddress(req.user);

  return res
    .status(201)
    .json(new ApiResponse(201, newAddress, "Address fetched successfully"));
});
const deleteAddress = asyncHandler(async (req, res) => {
  const address = req.params.addressId;

  const newAddress = await addressService.deleteAddress(req.user, address);

  return res
    .status(201)
    .json(new ApiResponse(201, newAddress, "Address deleted successfully"));
});

module.exports = { addNewAddress, getAddress, deleteAddress };
