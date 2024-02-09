
const { Router } = require('express');
const cartsRoute = Router();
const cartsController = require('../controllers/carts.controller.js');

const {
    getCarts,
    getCartById,
    create,
    addProduct,
    updateProducts,
    removeProducts,
    updateProductQuantity,
    removeProductById
} = new cartsController();

    cartsRoute.get('/', getCarts);
    cartsRoute.get('/:cid', getCartById);
    cartsRoute.post('/', create);
    cartsRoute.post('/:cid/product/:pid', addProduct);
    cartsRoute.put('/:cid', updateProducts);
    cartsRoute.delete('/:cid', removeProducts);
    cartsRoute.put('/:cid/product/:pid', updateProductQuantity); 
    cartsRoute.delete('/:cid/product/:pid', removeProductById);

module.exports = cartsRoute;