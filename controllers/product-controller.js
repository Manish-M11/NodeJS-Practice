const products = require("./../products.json");

exports.getProducts = async (req, res, next) => {
  console.log(req.params);
  res.json({ products });
};

exports.getProductById = async (req, res, next) => {
  const {
    params: { id },
  } = req;

  const product = products.find((p) => p.id === parseInt(id));

  res.json(product);
};
