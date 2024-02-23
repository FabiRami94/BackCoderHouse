
const {Router} = require('express');
const routerViews = Router();
const dataProducts = require('../sources/dataProducts.json');
const axios = require("axios");

// routerViews.get('/', (req, res) => {
    //     res.render('index', {   //2do contexto
    //         title: 'MercadoFabi',
    //         name: 'Fabi'
    //     })
    // });
    
    // routerViews.get('/home', (req, res) => {
    
    //     const user = {
    //         title: 'MercadoFabi',
    //         name: 'Fabi',
    //         role: 'admin'
    //     }
    
    //     res.render('home', {   //2do contexto
    //         title: user.title,
    //         isAdmin: user.role === 'admin',
    //         products: dataProducts,
    //     })
    // });


routerViews.get('/login', async (req, res) => {
    //res.redirect('/products');
    try {
      res.render('login', {
        title: 'Login',
      });
    } catch (error) {
     
      res.status(500).render('error', {
        title: 'Error',
        message: 'Ocurrio un error, vuelva a intentarlo',
        code: error.statusCode || 500,
      });
    }
  });
  
routerViews.get('/register', async (req, res) => {
    try {
      res.render('register', {
        title: 'Registrate',
      });
    } catch (error) {

      res.status(500).render('error', {
        title: 'Error',
        message: 'Ocurrio un error, vuelva a intentarlo',
        code: error.statusCode || 500,
      });
    }
});
  
routerViews.get('/chat', (req, res) => {
    res.render('chat', {
        title: 'ChatFabi',
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

routerViews.get( '/shoppingcart', async(req, res) => {
  try {
      const userId = req.session && req.session.user ? req.session.user.user : null
      if (!userId) {
          return res.status(400).send('User not logged in')
      }

      const user = await this.userViewService.getUserBy({ _id: userId })
      const cartId = user.cart
      if (!cartId) {
          return res.status(400).send('User does not have a cart')
      }

      const cart = await this.cartViewService.getCartById(cartId)

      const productDetailsPromises = cart.map(async item => {
          const productId = item.product.toString()
          const productDetailArray = await this.productViewService.getProductById(productId)
          const productDetail = productDetailArray[0]
          return { productDetail, quantity: item.quantity }
      })
      
      const productsWithQuantities = await Promise.all(productDetailsPromises)
      
      res.render('shoppingCart', { 
          title: 'Shopping Cart',
          cartId,
          productsWithQuantities
      })
  }
  catch(err){
      console.log(err)
      res.status(500).send('Server error')
  }
})

module.exports = routerViews;