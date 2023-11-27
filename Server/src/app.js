
const express = require("express");
const productsRoute = require("./routes/products");
const cartsRouter = require("./routes/carts");
const server = express();

// La persistencia de la información se implementará utilizando el file system, 
// donde los archivos “productos,json” y “carrito.json”, respaldan la información.
// No es necesario realizar ninguna implementación visual, todo el flujo se puede 
// realizar por Postman o por el cliente de tu preferencia.


server.use(express.json());

server.use('/api', productsRoute); 
server.use('/carts', cartsRouter); 

module.exports = server;