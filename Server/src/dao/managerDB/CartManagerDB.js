
const CartsModel = require('../models/cartsModel.js');

class CartManagerDB {

  constructor() {}

  async createCart() {
      const newCart = new CartsModel({
          products: []
      });

      const createdCart = await newCart.save();

      return createdCart;
  }

  async getCartById(cartId) {
      const cart = await CartsModel.findById(cartId).exec();
      return cart ? cart.products : null;
  }

  async addProductToCart(cartId, productId) {

      const cart = await CartsModel.findById(cartId).exec();

      if (cart) {
          const productIndex = cart.products.findIndex((p) => p.pid === productId);

          if (productIndex !== -1) {
              cart.products[productIndex].quantity += 1;
          } else {
              cart.products.push({ pid: productId, quantity: 1 });
          }

          await cart.save();
      } else {
          console.log(`No se encontró ningún carrito con el id: ${cartId}`);
      }
  }
}
  
module.exports = CartManagerDB;