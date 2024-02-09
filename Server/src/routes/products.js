
const {Router} = require("express")
const productsRoute = Router();
const productsController = require('../controllers/products.controller.js');

const {
    getProducts, 
    getProductsById, 
    createProduct, 
    updateProductById, 
    deleteProductById, 
    deleteProductByCode, 
    getCategorys} = new productsController

    productsRoute.get    ("/", getProducts );       
    productsRoute.get    ("/:pid", getProductsById);
    productsRoute.post   ("/", createProduct);
    productsRoute.put    ("/:pid", updateProductById);  
    productsRoute.delete ("/:pid", deleteProductById);
    productsRoute.delete ("/", deleteProductByCode);
    productsRoute.get    ("/group/categorys", getCategorys );

export default productsRoute;