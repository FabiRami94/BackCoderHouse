
const { Router } = require('express');
const cartsRoute = Router();
const CartManager = require('../dao/managerFS/CartManager.js');
const CartManagerDB = require('../dao/managerDB/CartManagerDB.js');

const cartManager = new CartManager();
const cartManagerDB = new CartManagerDB();


cartsRoute.post('/', async (req, res) => {
    try {
        await cartManagerDB.createCart()
        res.status(201).send("Carrito creado con exito!")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

cartsRoute.get('/:cid', async (req, res) => {

    try {
        const cartId = req.params.cid;
        const findCart = await cartManagerDB.getCartById(cartId);
   
        res.status(200).json(findCart);         
    } catch (error) {
        res.status(404).send('No se encontró ningún carrito!')
    }
})

cartsRoute.post('/:cid/product/:pid', async (req, res) => {
    try {   
        const cartId = req.params.cid;
        const productId = req.params.pid;
        
        await cartManagerDB.addProductToCart(cartId, productId);
        res.status(200).send('Se agregó el producto al carrito correctamente!')
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

module.exports = cartsRoute;