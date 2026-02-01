const express = require("express");
const cartController = require("../Controller/cart.controller");

const router = express.Router();

router.post("/", cartController.addTocart);
router.get("/:id", cartController.getCart);
router.delete("/removeCart/:id", cartController.removeCart);
router.put("/updatequantity/:id", cartController.updateQuantity);
router.delete("/clearcart", cartController.clearCart);

module.exports = router;
