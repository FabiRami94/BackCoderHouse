
const {Router} = require('express');
const routerViews = Router();
const dataProducts = require('../sources/dataProducts.json');

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

module.exports = routerViews;