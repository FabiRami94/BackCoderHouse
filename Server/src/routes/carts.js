
const { Router } = require('express');
const cartsRoute = Router();
const CartManager = require('../../CartManager');

const cartManager = new CartManager();


cartsRoute.post('/', async (req, res) => {
    try {
        await cartManager.createCart()
        res.status(201).send("Carrito creado con exito!")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

cartsRoute.get('/:cid', async (req, res) => {

    try {
        const cartId = req.params.cid;
        const findCart = await cartManager.getCartById(cartId);
   
        res.status(200).json(findCart);         
    } catch (error) {
        res.status(404).send('No se encontró ningún carrito!')
    }
})

cartsRoute.post('/:cid/product/:pid', async (req, res) => {
    try {   
        const cartId = req.params.cid;
        const productId = req.params.pid;
        
        await cartManager.addProductToCart(cartId, productId);
        res.status(200).send('Se agregó el producto al carrito correctamente!')
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

module.exports = cartsRoute;