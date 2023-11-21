
const express = require("express");
const productsRoute = require("./routes/products");
const server = express();
const ProductManager = require("../ProductManager");


server.use(express.json());

// server.use('/', productsRoute); Más adelante.

const productManager = new ProductManager();

server.get('/products', (req, res) => {

    try {
        const limit = parseInt(req.query.limit);

        const isValidLimit = !isNaN(limit) && limit > 0;

        const products = productManager.getProducts();

        const limitedProducts = isValidLimit ? products.slice(0, limit) : products;
     
        res.status(200).json({products: limitedProducts})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

})

server.get('/products/:id', (req, res) => {

    try {
        const {id} = req.params
    
        const idNumber = parseInt(id)
    
        const producById = productManager.getProductById(idNumber);
    
        res.status(200).json({producById});    
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

module.exports = server;