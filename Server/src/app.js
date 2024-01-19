
const express = require("express");
const productsRoute = require("./routes/products");
const cartsRouter = require("./routes/carts");
const server = express();
const {Server} = require('socket.io');
const handlebars = require('express-handlebars');
const routerViews = require("./routes/routerViews");
const cookieParser = require("cookie-parser");
const cookieRouter = require("./routes/cookies");
const session = require('express-session');
const sessionRouter = require("./routes/session");
const FileStore = require('session-file-store');

const MongoStore = require('connect-mongo');
require('dotenv').config();
const {USER, PASSWORD} = process.env;

const passport = require('passport');
const initializePassport = require('./routes/session.js');
const passportRouter = require("./routes/passport.js");

const fileStorage = FileStore(session);

server.use(express.json());
// motor de plantilla
server.engine('handlebars', handlebars.engine()); // Configuración handlebars
server.set('view engine', '.handlebars'); // . para extensión
server.set('views', __dirname + '/views');

server.use(cookieParser('s3cr3t0')); //Signed, for avoid change of cookies
server.use(session({
    // store: new fileStorage({
    //     //path: place the files, ttl: live time, retries: tries for the server to access.
    //     path: './src/sessions', ttl: 100, retries: 0,
    // }),
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${USER}:${PASSWORD}@cluster0.twuprdt.mongodb.net/`,
        // mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 15,
    }),
    secret: 'secretCode',
    resave: true, //Mantener la seción activa, si se pone false y está inactiva, se cerrará.
    saveUninitialized: true, //Save the session.
}));

initializePassport();
server.use(passport.initialize());
server.use(passport.session());

server.use('/api', productsRoute); 
server.use('/api', cartsRouter); 
server.use('/', cookieRouter);
server.use('/', sessionRouter);
server.use('/', passportRouter);

server.use('/views', routerViews);

module.exports = {server, Server};

// Objetivos generales
// Contarás con Mongo como sistema de persistencia principal
// Tendrás definidos todos los endpoints para poder trabajar con productos y carritos.

// Objetivos específicos
// Profesionalizar las consultas de productos con filtros, paginación y ordenamientos
// Profesionalizar la gestión de carrito para implementar los últimos conceptos vistos.

// Formato
// Link al repositorio de Github, sin la carpeta de node_modules

// Sugerencias
// Permitir comentarios en el archivo
// La lógica del negocio que ya tienes hecha no debería cambiar, sólo su persistencia. 
// Los nuevos endpoints deben seguir la misma estructura y lógica que hemos seguido. 

// Se debe entregar
// Con base en nuestra implementación actual de productos, modificar el método GET / para 
// que cumpla con los siguientes puntos:

//1. Deberá poder recibir por query params un limit (opcional), una page (opcional), un sort 
// (opcional) y un query (opcional)-limit permitirá devolver sólo el número de elementos 
//solicitados al momento de la petición, en caso de no recibir limit, éste será de 10.
//2. page permitirá devolver la página que queremos buscar, en caso de no recibir page, ésta 
// será de 1
//3. query, el tipo de elemento que quiero buscar (es decir, qué filtro aplicar), en caso de no 
// recibir query, realizar la búsqueda general
//4. sort: asc/desc, para realizar ordenamiento ascendente o descendente por precio, en 
// caso de no recibir sort, no realizar ningún ordenamiento

// El método GET deberá devolver un objeto con el siguiente formato:
// {
// status:success/error
// payload: Resultado de los productos solicitados
// totalPages: Total de páginas
// prevPage: Página anterior
// nextPage: Página siguiente
// page: Página actual
// hasPrevPage: Indicador para saber si la página previa existe
// hasNextPage: Indicador para saber si la página siguiente existe.
// prevLink: Link directo a la página previa (null si hasPrevPage=false)
// nextLink: Link directo a la página siguiente (null si hasNextPage=false)
// }

// Se deberá poder buscar productos por categoría o por disponibilidad, y se deberá poder 
// realizar un ordenamiento de estos productos de manera ascendente o descendente por precio.

// Además, agregar al router de carts los siguientes endpoints:
//1. DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
//2. PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato 
// especificado arriba.
//3. PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares 
// del producto por cualquier cantidad pasada desde req.body
//4. DELETE api/carts/:cid deberá eliminar todos los productos del carrito 
//---> Esta vez, para el modelo de Carts, en su propiedad products, el id de cada producto 
// generado dentro del array tiene que hacer referencia al modelo de Products. Modificar 
// la ruta /:cid para que al traer todos los productos, los traiga completos mediante un 
// “populate”. De esta manera almacenamos sólo el Id, pero al solicitarlo podemos desglosar
//  los productos asociados.

// Crear una vista en el router de views ‘/products’ para visualizar todos los productos con 
// su respectiva paginación. Cada producto mostrado puede resolverse de dos formas:
// Llevar a una nueva vista con el producto seleccionado con su descripción completa, detalles
//  de precio, categoría, etc. Además de un botón para agregar al carrito.
// Contar con el botón de “agregar al carrito” directamente, sin necesidad de abrir una página
//  adicional con los detalles del producto.

// Además, agregar una vista en ‘/carts/:cid (cartId) para visualizar un carrito específico, 
// donde se deberán listar SOLO los productos que pertenezcan a dicho carrito. 