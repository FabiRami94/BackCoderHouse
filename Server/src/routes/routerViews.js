
const {Router} = require('express');
const routerViews = Router();
const dataProducts = require('../sources/dataProducts.json');
const axios = require("axios");

routerViews.get('/', (req, res) => {
    res.render('index', {   //2do contexto
        title: 'MercadoFabi',
        name: 'Fabi'
    })
});

routerViews.get('/chat', (req, res) => {
    res.render('chat', {
        title: 'ChatFabi',
    })
});

routerViews.get('/home', (req, res) => {

    const user = {
        title: 'MercadoFabi',
        name: 'Fabi',
        role: 'admin'
    }

    res.render('home', {   //2do contexto
        title: user.title,
        isAdmin: user.role === 'admin',
        products: dataProducts,
    })
});

routerViews.get('/realtimeproducts', (req, res) => {

    const user = {
        title: 'MercadoFabi',
        name: 'Fabi',
        role: 'admin'
    }

    res.render('realtimeproducts', {   //2do contexto
        title: user.title,
        isAdmin: user.role === 'admin',
        products: dataProducts,
    })
});

routerViews.get('/products', async (req, res) => {

    try {
        const response = await axios.get("http://localhost:8080/api/products");

        const user = {
            title: 'MercadoFabi',
            role: 'admin'
        }

        res.render('products', {
            title: user.title,
            isAdmin: user.role === 'admin',
            products: response.data.products,  
        });

    } catch (error) {
        res.status(500).json(error = error.message);
    }
});

routerViews.get('/products/:pid', async (req, res) => {

    const {pid} = req.params;
   
    try {
        const response = await axios.get(`http://localhost:8080/api/products/${pid}`);

        const user = {
            title: 'MercadoFabi',
            role: 'admin'
        }

        res.render('productsId', {
            title: user.title,
            isAdmin: user.role === 'admin',
            productDetails: response.data.producById,  
        });

    } catch (error) {
        res.status(500).json(error = error.message);
    }
});

routerViews.get('/login', async (req, res) => {

        res.render('login', {

        });
});

module.exports = routerViews;