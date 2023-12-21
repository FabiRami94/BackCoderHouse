
const {server, Server} = require("./src/app");
const ProductManager = require("./src/dao/managerFS/ProductManager.js");
const productManager = new ProductManager();
const mongoose = require('./src/db.js');

mongoose.connection.once('open', () => {
    console.log('Mongo iniciado')
});

const serverHttp = server.listen(8080, () => {
    console.log('Server listen on port 8080')
});

// socket.io
const io = new Server(serverHttp);

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    socket.on('recibirMensajeCliente', (data) => {
        console.log(data);
    })
    socket.emit('solo-para-el-actual', 'este lo debe recibir solo el socket actual');
    socket.broadcast.emit('para-todos-menos-el-actual', 'Lo reciben todos menos quien lo envia');
    io.emit('mensaje-para-todos', 'Este mensaje lo recibe todos,incluso quien lo envia');

    let ArrayDeMensajes = [];

    socket.emit('enviar-mensajes-cliente', ArrayDeMensajes);

    socket.on('messageClient', (mensaje) =>{
        ArrayDeMensajes.push({id: socket.id, message: mensaje});
        io.emit('mensaje-recibido-cliente', ArrayDeMensajes);
    })

    // Recibo como servidor el producto.
    socket.on('addProduct', async (newProduct) => {
        console.log(newProduct)
        // Añade el nuevo producto a tu gestor de productos
        const addedProduct = await productManager.addProduct(newProduct);

        // Envio al cliente el producto agregado.
        io.emit('newProduct', addedProduct);
    });
});