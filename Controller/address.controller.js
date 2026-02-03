const ApiResponse = require("../Utils/ApiResponse");
const addressService = require("../Services/address.service");
const addNewAddress = asyncHandler(async (req, res) => {
  const { address } = req.body;
  const newAddress = await addressService.createNewAdress(userId, address);

  return res
    .status(201)
    .json(new ApiResponse(201, newAddress, "New address added successfully"));
});
const getAddress = asyncHandler(async (req, res) => {
  const newAddress = await addressService.getAddress(userId);

  return res
    .status(201)
    .json(new ApiResponse(201, newAddress, "New address added successfully"));
});
const deleteAddress = asyncHandler(async (req, res) => {
  const address = req.params.addressId;
  const newAddress = await addressService.createNewAdress(userId, addressId);

  return res
    .status(201)
    .json(new ApiResponse(201, newAddress, "New address added successfully"));
});

module.exports = { addNewAddress, getAddress, deleteAddress };
