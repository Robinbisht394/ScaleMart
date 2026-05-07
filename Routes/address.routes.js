const express = require("express");
const router = express.Router();
const addressController = require("../Controller/address.controller");
const { protect } = require("../middlewares/auth.middleware");
router.post("/newaddress", protect, addressController.addNewAddress);
router.get("/", protect, addressController.getAddress);
router.delete("/:addressId", protect, addressController.deleteAddress);

module.exports = router;
