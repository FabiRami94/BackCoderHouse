
const {Router} = require("express")
const productsRoute = Router();
const ProductManager = require("../../ProductManager");

const productManager = new ProductManager();

productsRoute.get('/products', async (req, res) => {

    try {
        const limit = parseInt(req.query.limit);

        const isValidLimit = !isNaN(limit) && limit > 0;

        const products = await productManager.getProducts();

        const limitedProducts = isValidLimit ? products.slice(0, limit) : products;
     
        res.status(200).json({products: limitedProducts})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

productsRoute.get('/products/:pid', async(req, res) => {

    try {
        const {pid} = req.params
    
        const idNumber = parseInt(pid)
    
        const producById = await productManager.getProductById(idNumber);
    
        res.status(200).json({producById});    
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

productsRoute.post('/products', async (req, res) => {

    try {
        const { title, 
            description, 
            code, 
            price, 
            status, 
            stock, 
            category, 
            thumbnail} = req.body;
    
        const newProduct = await productManager.addProduct(  
            title, 
            description, 
            code, 
            price, 
            status, 
            stock, 
            category, 
            thumbnail)

            res.status(201).json({newProduct});     
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

productsRoute.put('/products/:pid', async (req, res) => {
    
    try {
        const {pid} = req.params;
        const { title, 
            description, 
            code, 
            price, 
            status, 
            stock, 
            category, 
            thumbnail} = req.body;

        const idNumber = parseInt(pid)
    
        const updateProduct = await productManager.updateProduct(
            idNumber,  
            {title, 
            description, 
            code, 
            price, 
            status, 
            stock, 
            category, 
            thumbnail})

            res.status(201).json({updateProduct});     
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

productsRoute.delete('/products/:pid', async (req, res) => {
    
    try {
        const {pid} = req.params      
        const idNumber = parseInt(pid)
    
        const productDelete = await productManager.deleteProduct(idNumber)
        
        res.status(200).json({productDelete});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

module.exports = productsRoute;








