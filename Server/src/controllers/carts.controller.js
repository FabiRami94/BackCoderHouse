
const ProductManagerDB = require('../dao/managerDB/ProductManagerDB.js');
const CartManagerDB = require('../dao/managerDB/CartManagerDB.js');
const customError = require('../errors/customError.js');
const { generateCartErrorInfo, generateCartRemoveErrorInfo } = require('../errors/generateError.js');
const { EErrors } = require('../errors/enum.js');

const productsService = new ProductManagerDB();

class CartsController {
    
  constructor() {
    this.service = new CartManagerDB();
  }

  getCarts = async (req,res)=>{
    try{
        const allCarts = await this.service.getCarts()
        res.json({
            status: 'success',
            payload: allCarts
        })
    }catch(error){
        console.log(error)
        res.status(500).send('Server error')
    }
  }

  getCartById = async (req, res) => {
    try {
      const cid = req.params.cid;
      const populate = req.query.populate || true;

      let carts
      if(populate) {
        carts = await this.service.getCartsByIdPopulate(cid);
      } else {
        carts = await this.service.getCartsById(cid);
      }
    
      res.sendSuccess(carts)
    } catch (error) {
      res.sendCatchError(error)
    }
  }

  createCart = async (req,res)=>{
    try{
        const newCart = await this.service.createCart()
        res.json({
            status: 'success',
            payload: newCart
        })
    }catch(error){
        console.log(error)
        res.status(500).send('Server error')
    }
  }

  addProductToCart = async (req,res)=>{
    try{
        const { cid, pid} = req.params
        const cartId = new mongoose.Types.ObjectId(cid)
        const productId = new mongoose.Types.ObjectId(pid)
        const productInCart = await this.cartService.addProductToCart(cartId, productId)
        res.json({
            status: 'success',
            payload: productInCart
        })
        
    }catch(error){
        console.log(error)
        res.status(500).send('Server error')
    }
  }

  removeProductFromCart = async (req,res,next) =>{
    try {
        const { cid, pid } = req.params
        if(!cid || !pid){
            customError.createError({
                name: 'Error to remove product from cart',
                cause: generateCartRemoveErrorInfo(cid, pid),
                message: 'Cant remove product from cart',
                code: EErrors.DATABASE_ERROR,
            })
        }
        const result = await this.cartService.removeProductFromCart(cid, pid)

        if (result.success) {
          res.json({
            status: 'success',
            message: 'Product removed from cart successfully',
          })
        } else {
          res.status(404).json({
            status: 'error',
            message: 'Product or cart not found',
          })
        }
    } catch (error) {
        next(error)
    }
}

  updateProductQuantity = async (req, res) => {
    try {
      const {cid, pid} = req.params;
      const {quantity} = req.body*1
      
      if (isNaN(quantity) ) res.sendUserError("Se ha introducido mal la cantidad")

      const cart = await this.service.getCartsById(cid);
      if (!cart) return res.sendNotFound('Carrito no encontrado');
      const product = await productsService.getProductsById(pid);
      if (!product) return res.sendNotFound('Producto no encontrado');

      const updatedCart = await this.service.updateProductQuantity(cid, pid, quantity);

      res.sendSuccess(updatedCart)
    } catch (error) {
      res.sendCatchError(error)
    }
  }

  updateCart = async (req, res) => {
    try {
        const { cid } = req.params
        const { products } = req.body
        const result = await this.service.updateCart(cid, products)
    
        if (result.success) {
            res.json({
                status: 'success',
                message: 'Cart updated successfully',
            })
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Cart not found',
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')
    }
  }

  deleteAllProducts = async (req, res) => {
    try {
        const { cid } = req.params
        const result = await this.ervice.deleteAllProducts(cid)
    
        if (result.success) {
            return res.json({
                status: 'success',
                message: result.message,
            })
        } else {
            return res.status(404).json({
                status: 'error',
                message: result.message,
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')
    }
  }

  purchaseCart = async (req, res) => {
    try {
        const { cid } = req.params
        
        const cart = await this.cartService.getCartById(cid)
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' })
        }
        const productUpdates = []
        const productsNotPurchased = []
        let totalAmount = 0
        for (const item of cart) {
            const productId = item.product.toString()
            const productArray = await this.productService.getProductById(productId)
            const product = productArray[0]
            const productPrice = product.price
            if (!product) {
                return res.status(404).json({ status: 'error', message: 'Product not found' })
            }
            if (product.stock < item.quantity) {
                productsNotPurchased.push(item.product)
                continue
            }
            product.stock -= item.quantity
            console.log(product)
            productUpdates.push(this.productService.updateProduct(productId,
                product.title, 
                product.description, 
                product.price, 
                product.thumbnail, 
                product.code, 
                product.stock, 
                product.status, 
                product.category
            ))
  
            const quantity = item.quantity
            totalAmount += (quantity * productPrice)
        }
  
        console.log(totalAmount)
        const userEmail = req.session.user.email
        const ticketData = {
            code: 'TICKET-' + Date.now().toString(36).toUpperCase(),
            purchase_datetime: new Date(),
            amount: totalAmount,
            purchaser: userEmail
        }
  
        const ticket = new this.ticketModel(ticketData)
        await ticket.save()
  
        if (productsNotPurchased.length > 0) {
            cart.products = cart.products.filter(item => !productsNotPurchased.includes(item.product))
            await cart.save()
        } else {
            await this.cartService.deleteAllProducts(cid)
            console.log('----------Cart empty----------')
        }
        try {
            await Promise.all(productUpdates)
            return res.status(200).json({ status: 'success', message: 'Stock updated successfully' })
        } catch (error) {
            return res.status(500).json({ status: 'error', message: 'Failed to update stock' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 'error', message: 'Server error' })
    }
  }
}

export default CartsController;