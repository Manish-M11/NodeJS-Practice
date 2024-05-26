//API using Express JS

const fs = require("fs");
const express = require("express");
const morgan = require("morgan"); //Third party middleware

const server = express();
// //body parser
//server.use(express.json()); //it will read the body of json type without this it will not capture

//middleware to log the incidnt
server.use(morgan("combined"));

//to host static files in public folder
//server.use(express.static("public"));

// //API - Endpoint - Route

// //Products
// //API ROOT, base url, google.com/api/v2

// //Read / Get /products
server.get("/products", (req, res) => {
  console.log(req.params);
  const data = JSON.parse(fs.readFileSync("data.json", "utf-8")); //it will read in string format there fore need to convert
  const products = data.products;

  res.json(products);
});

// // //Read / Get /products(particular product)
// // //:id is a url parameter expected from request url
server.get("/products/:id", (req, res) => {
  console.log(req.params);
  const {
    params: { id },
  } = req;

  const data = JSON.parse(fs.readFileSync("data.json", "utf-8")); //it will read in string format there fore need to convert
  const products = data.products;
  const product = products.find((p) => p.id === parseInt(id));
  res.json(product);
});

// // //Create API - created with POST method
// // //Create POST /products
// server.post("/products", (req, res) => {
//   console.log(req.body);
//   products.push(req.body);
//   res.json(req.body); //sending same as response to show confirmation
// });

// // //Update PUT //products/:id
// server.put("/products/:id", (req, res) => {
//   console.log(req.body);
//   const id = +req.params.id;
//   const productIndex = products.findIndex((p) => p.id === id);
//   products.splice(productIndex, 1, { ...req.body, id: id });
//   res.json({ status: "Updated" }); //sending same as response to show confirmation
// });

// // //Update not overright
// server.patch("/products/:id", (req, res) => {
//   console.log(req.body);
//   const id = +req.params.id;
//   const productIndex = products.findIndex((p) => p.id === id);
//   const product = products[productIndex];
//   products.splice(productIndex, 1, { ...product, ...req.body });
//   res.json({ status: "Changed" }); //sending same as response to show confirmation
// });

// // //delete method /products/:id
// server.delete("/products/:id", (req, res) => {
//   console.log(req.body);
//   const id = +req.params.id;
//   const productIndex = products.findIndex((p) => p.id === id);
//   products.splice(productIndex, 1);
//   res.status(201).json(products[productIndex]); //sending same as response
// });

// //server listening.
// server.listen(8080, () => {
//   console.log("Server Started 8080");
// });

const app = require("./app");

app.listen(3000, () => {
  console.log("Server Started 3000");
});

//***************************************** *//
//difference between readFile and readFIleSync

// const fs = require("fs");
// console.log("1");
// fs.readFile("data.json", "utf-8", (err, result) => { //non-Blocking
//   console.log(result);
// });
// //const block = fs.readFileSync("data.json","utf-8"); //blocking
// console.log("2");
