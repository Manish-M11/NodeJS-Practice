const cartRouter = require("express").Router();

const cartController = require("./../controllers/cart-controller");

cartRouter.get("/", cartController.getCartItems);
cartRouter.post("/:id", cartController.addCartItem);
cartRouter.patch("/:id", cartController.updateCartItem);
cartRouter.delete("/:id", cartController.deleteCartItem);

module.exports = cartRouter;