
const fs = require('fs');

class CartManager {

  constructor(){
    this.carts = [];
  }

  async createCart() {
    const dataCartString = await fs.promises.readFile('./src/sources/dataCarts.json', 'utf-8');
    const dataCartArray = JSON.parse(dataCartString);

    const id = dataCartArray.length + 1
    const newCart = {
      id: id,
      products: []
    }
    dataCartArray.push(newCart)
    const carritosString = JSON.stringify(dataCartArray, null, 2);
    await fs.promises.writeFile('carrito.json', carritosString);
  }

  async getCartById(id) {
    const dataCartString = await fs.promises.readFile('./src/sources/dataCarts.json', 'utf-8');
    const dataCartArray = JSON.parse(dataCartString);
    const findCart = dataCartArray.find((x) => (x.id == id));
    return findCart.products;
  }

  async addProductToCart(cartId, productId) {
  const dataCartString = await fs.promises.readFile('./src/sources/dataCarts.json', 'utf-8');
  const dataCartArray = JSON.parse(dataCartString);

  const findCartIndex = dataCartArray.findIndex((x) => (x.id == cartId));

  if (findCartIndex !== -1) {
    const cartsCopy = [...dataCartArray];
    const findCart = { ...dataCartArray[findCartIndex] };

    const productIndex = findCart.products.findIndex((p) => parseInt(p.pid) === parseInt(productId));

    if (productIndex !== -1) {
      findCart.products[productIndex].quantity += 1;
    } else {
      findCart.products.push({ pid: parseInt(productId), quantity: 1 });
    }
    
    cartsCopy[findCartIndex] = findCart;

    const newListCart = JSON.stringify(cartsCopy, null, 2);
    await fs.promises.writeFile('./src/sources/dataCarts.json', newListCart);
  }
  else {
    console.log(`No se encontró ningún carrito con el id: ${cartId}`)
  }
  }
}

module.exports = CartManager;