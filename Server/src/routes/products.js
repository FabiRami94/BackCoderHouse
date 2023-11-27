
const {Router} = require("express")
const productsRoute = Router();
const ProductManager = require("../../ProductManager");

const productManager = new ProductManager();

productsRoute.get('/products', (req, res) => {

    try {
        const limit = parseInt(req.query.limit);

        const isValidLimit = !isNaN(limit) && limit > 0;

        const products = productManager.getProducts();

        const limitedProducts = isValidLimit ? products.slice(0, limit) : products;
     
        res.status(200).json({products: limitedProducts})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

})

productsRoute.get('/products/:pid', (req, res) => {

    try {
        const {pid} = req.params
    
        const idNumber = parseInt(pid)
    
        const producById = productManager.getProductById(idNumber);
    
        res.status(200).json({producById});    
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

module.exports = productsRoute;