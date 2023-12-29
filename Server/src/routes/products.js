
const {Router} = require("express")
const productsRoute = Router();
const ProductManager = require('../dao/managerFS/ProductManager.js');
const ProductManagerDB = require('../dao/managerDB/ProductManagerDB.js');

const productManager = new ProductManager();
const productManagerDB = new ProductManagerDB();

productsRoute.get('/products', async (req, res) => {

    try {
        const limit = parseInt(req.query.limit);

        const isValidLimit = !isNaN(limit) && limit > 0;

        const products = await productManagerDB.getProducts();

        const limitedProducts = isValidLimit ? products.slice(0, limit) : products;
     
        res.status(200).json({products: limitedProducts})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

productsRoute.get('/products/:pid', async(req, res) => {

    try {
        const {pid} = req.params
        console.log(pid)
    
        const producById = await productManagerDB.getProductById(pid);
    
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
            stock, 
            category, 
            thumbnail} = req.body;
    
        const newProduct = await productManagerDB.addProduct(  
            title, 
            description, 
            code, 
            price,  
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
    
        const updateProduct = await productManagerDB.updateProduct(
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
    
        const productDelete = await productManagerDB.deleteProduct(pid)
        
        res.status(200).json({productDelete});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

module.exports = productsRoute;








