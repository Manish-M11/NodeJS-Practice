const productRouter = require("express").Router();

const productController = require("./../controllers/product-controller");

productRouter.get("/", productController.getProducts);
productRouter.get("/:id", productController.getProductById);
productRouter.patch("/:id", productController.updateProductById);
productRouter.delete("/:id", productController.deleteProductById);

module.exports = productRouter;
