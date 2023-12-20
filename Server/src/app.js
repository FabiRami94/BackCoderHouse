
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

// Consigna
// Continuar sobre el proyecto que has trabajado para tu ecommerce y configurar los 
// siguientes elementos:

// Aspectos a incluir
// Agregar el modelo de persistencia de Mongo y mongoose a tu proyecto.
// Crear una base de datos llamada “ecommerce” dentro de tu Atlas, crear sus colecciones 
// “carts”, “messages”, “products” y sus respectivos schemas.

// Separar los Managers de fileSystem de los managers de MongoDb en una sola carpeta “dao”.
// Dentro de dao, agregar también una carpeta “models” donde vivirán los esquemas de MongoDB. 
// La estructura deberá ser igual a la vista en esta clase Contener todos los Managers 
// (FileSystem y DB) en una carpeta llamada “Dao”

// Aspectos a incluir
// Reajustar los servicios con el fin de que puedan funcionar con Mongoose en lugar de 
// FileSystem NO ELIMINAR FileSystem de tu proyecto.

// Implementar una vista nueva en handlebars llamada chat.handlebars, la cual permita 
// implementar un chat como el visto en clase. Los mensajes deberán guardarse en una colección
// “messages” en mongo (no es necesario implementarlo en FileSystem). El formato es:  
// {user:correoDelUsuario, message: mensaje del usuario}
// Corroborar la integridad del proyecto para que todo funcione como lo ha hecho hasta ahora.


