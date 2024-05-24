const express = require("express");
const morgan = require("morgan"); //Third party middleware

const productRouter = require("./routers/product-router");

const app = express();
app.use(morgan("default"));

app.use("/products", productRouter);

module.exports = app;
