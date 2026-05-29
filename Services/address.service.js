const ApiError = require("../Utils/ApiError");
const addressModel = require("../Models/address.model");

const userModel = require("../Models/user.model");

const createNewAdress = async (user, address) => {
  const registeredUser = await userModel.findById(user.id); //check if user registered
  if (!registeredUser) throw new ApiError(404, "User not Registered");
  // check if already register
  console.log(address);
  const isAddressRegistered = await addressModel.findOne({
    fullName: address.fullName,
  });

  if (isAddressRegistered)
    throw new ApiError(400, "Address already registered");

  const newAddress = await addressModel.create({
    user: user.id,
    fullName: address.fullName,
    addressLine: address.addressLine,
    phone: address.phone,
    pincode: address.pincode,
    state: address.state,
  });

  if (!newAddress) throw new ApiError(500, "Address not added. try again !");
  return newAddress;
};

const getAddress = async (user) => {
  const registeredUser = await userModel.findById(user.id);
  if (!registeredUser) throw new ApiError(404, "User not Registered");

  const userAddress = await addressModel.find({ user: user.id });
  if (!userAddress)
    throw new ApiError(500, "Internal server error. try again!");

  return userAddress;
};

const deleteAddress = async (user, addressId) => {
  const registeredUser = await userModel.findById(user.id);
  if (!registeredUser) throw new ApiError(404, "User not Registered");

  const deleteAddress = await addressModel.findByIdAndDelete(addressId);
  if (!deleteAddress)
    throw new ApiError(500, "Internal server error. try again!");

  return deleteAddress;
};

module.exports = { createNewAdress, getAddress, deleteAddress };
