
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
});

productsRoute.get('/products/:pid', (req, res) => {

    try {
        const {pid} = req.params
    
        const idNumber = parseInt(pid)
    
        const producById = productManager.getProductById(idNumber);
    
        res.status(200).json({producById});    
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

productsRoute.post('/products', (req, res) => {

    try {
        const { title, 
            description, 
            code, 
            price, 
            status, 
            stock, 
            category, 
            thumbnail} = req.body;
    
        const newProduct = productManager.addProduct(  
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

productsRoute.put('/products/:pid', (req, res) => {
    
    // La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos 
    // enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de 
    // hacer dicha actualización.
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
    
        const updateProduct = productManager.updateProduct(
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

productsRoute.delete('/products/:pid', (req, res) => {
    
    try {
        const {pid} = req.params      
        const idNumber = parseInt(pid)
    
        const productDelete = productManager.deleteProduct(idNumber)
        
        res.status(200).json({productDelete});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

module.exports = productsRoute;








