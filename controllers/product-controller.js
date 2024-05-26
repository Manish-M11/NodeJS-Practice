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
  res.json({ status: "Changed" });
};

exports.deleteProductById = async (req, res, next) => {
  const id = req.params.id;
  const productIndex = products.findIndex((p) => p.id === parseInt(id));
  products.splice(productIndex, 1);
  res.status(201).json(products[id]); //sending same as response
};
