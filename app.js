const express = require("express");
const morgan = require("morgan"); //Third party middleware
const path = require("path");

const productRouter = require("./routers/product-router");
const cartRouter = require("./routers/cart-router");

const app = express();
app.use(express.json());
app.use(morgan("combined"));

app.use("/products", productRouter);
app.use("/cart", cartRouter);
module.exports = app;
