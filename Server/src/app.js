
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

const { handleError } = require('./middlewares/handlerError.js');

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
server.use(handleError);

module.exports = {server, Server};