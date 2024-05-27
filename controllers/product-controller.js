const fs = require("fs");

const products = require("./../products.json");

exports.getProducts = async (req, res, next) => {
  console.log(req.params);
  res.json({ products });
};

exports.getProductById = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  console.log(typeof products);
  const product = products.find((p) => p.id === parseInt(id));
  console.log(product);
  res.json(product);
};

exports.updateProductById = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  console.log("Patch console", typeof products);
  const productIndex = products.findIndex((p) => p.id === parseInt(id));
  const product = products[productIndex];
  products.splice(productIndex, 1, { ...product, ...req.body });
  fs.writeFile("products.json", JSON.stringify(products), (err) => {
    if (err) {
      return res.json({ status: "Could not update." });
    } else {
      return res.json({ status: "Change Succesfull" });
    }
  });
};

exports.deleteProductById = async (req, res, next) => {
  const id = req.params.id;
  const deleteProduct = products[id - 1];
  const productIndex = products.findIndex((p) => p.id === parseInt(id));
  products.splice(productIndex, 1);
  fs.writeFile("products.json", JSON.stringify(products), (err) => {
    if (err) {
      return res.json({ status: "Could not delete." });
    } else {
      return res.status(201).json(deleteProduct); //sending same as response
    }
  });
};
