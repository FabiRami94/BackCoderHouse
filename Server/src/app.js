
const express = require("express");
const productsRoute = require("./routes/products");
const cartsRouter = require("./routes/carts");
const server = express();

server.use(express.json());

server.use('/api', productsRoute); 
server.use('/api', cartsRouter); 

module.exports = server;