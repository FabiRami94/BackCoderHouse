
const express = require("express");
const productsRoute = require("./routes/products");
const cartsRouter = require("./routes/carts");
const server = express();
const {Server} = require('socket.io');
const handlebars = require('express-handlebars');
const routerViews = require("./routes/routerViews");

server.use(express.json());
// motor de plantilla
server.engine('handlebars', handlebars.engine()); // Configuración handlebars
server.set('view engine', '.handlebars'); // . para extensión
server.set('views', __dirname + '/views')


server.use('/api', productsRoute); 
server.use('/api', cartsRouter); 

server.use('/views', routerViews)

module.exports = {server, Server};