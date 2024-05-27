const cart = require("./../cart.json");
const products = require("./../products.json");
const fs = require("fs");

exports.getCartItems = async (req, res, next) => {
    console.log(req.params);
    return res.json({ cart });
};

exports.addCartItem = async (req, res, next) => {
    const {params: {id}} = req;
    let quantity = req.body.Quantity;
    if(quantity === undefined) {
        quantity = 1;
    }
    console.log("Quantity: ",quantity);

    const productIndex = products.findIndex((product) => product.id === parseInt(id));
    const product = products[productIndex];

    if(!product) {
       return res.status(404).json({status: "Product id not found"});
    }

    const product_id = product.id;
    const {title, price} = product

    const new_cart_item = {"id": product_id,"title": title,"price": price, "Quantity": quantity};

    cart.push(new_cart_item);

    fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
        if(err) {
            console.log(err);
        }
        console.log(cart);
        return res.json({status: "success", new_cart_item});
    });
};

exports.updateCartItem = async (req, res, next) => {
    const {params: {id}} = req;
    let quantity = req.body;

    console.log(Object.keys(quantity).length);
    if(Object.keys(quantity).length === 0) {
        return res.status(404).json("Only Quantity can be updated!!");
    }

    const cartIndex = cart.findIndex((item) => item.id === parseInt(id));
    const cartItem = cart[cartIndex];

    console.log("cartItem: ",cartItem);

    console.log("Quantity for updation: ",quantity);
    const updateCartItem = {...cartItem, ...quantity};
    cart[cartIndex] = updateCartItem;

    console.log("after update: ",updateCartItem);
    fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
        if(err) {
            console.log(err);
        }
        return res.json({status: "Updated", updateCartItem});
    });
};

exports.deleteCartItem = async (req, res, next) => {
    const {params: {id}} = req;

    const cartIndex = cart.findIndex((item) => item.id === parseInt(id));
    //const cartItem = cart[cartIndex];

    //console.log("Cart Index: ",cartIndex);
    if(cartIndex === -1) {
        return res.status(404).json({status: "Product id not found"});
    }
    const delItem = cart.splice(cartIndex,1)[0];

    fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
        if(err) {
            console.log(err);
        }
        return res.json({status: "success", delItem});
    });
};