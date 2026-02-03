const express = require("express");
const router = express.Router();
const addressController = require("../Controller/address.controller");
router.post("/newaddress", addressController.addNewAddress);
router.get("/", addressController.getAddress);
router.post("/:addressId", addressController.deleteAddress);

module.exports = router;
