
const { Router } = require('express');
const cartsRoute = Router();
const cartsController = require('../controllers/carts.controller.js');

const {
    getCarts,
    getCartById,
    createCart,
    addProductToCart, 
    removeProductsFromCart,
    updateProductQuantity,
    updateCart,
    deleteAllProducts,
    purchaseCart,
} = new cartsController();

    cartsRoute.get('/', getCarts);
    cartsRoute.get('/:cid', getCartById);
    cartsRoute.post('/', createCart);
    cartsRoute.post('/:cid/product/:pid', addProductToCart);
    cartsRoute.delete('/:cid', removeProductsFromCart);
    cartsRoute.put('/:cid/product/:pid', updateProductQuantity); 
    cartsRoute.put('/:cid', updateCart)
    cartsRoute.delete('/:cid', deleteAllProducts);
    cartsRoute.post('/:cid/purchase', purchaseCart);

module.exports = cartsRoute;