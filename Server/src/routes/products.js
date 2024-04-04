
const {Router} = require("express")
const productsRoute = Router();
const productsController = require('../controllers/products.controller.js');
const { isAdminOrClient } = require('../middlewares/roleVerification');

const {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct } = new productsController()

productsRoute
    .get("/", getProducts )       
    .get("/:pid", getProductById)
    .post('/', addProduct)
    .put('/:pid', updateProduct)
    .delete('/:pid', isAdminOrClient, deleteProduct)

module.exports = productsRoute;