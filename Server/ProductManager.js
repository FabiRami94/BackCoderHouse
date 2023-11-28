
const productList = require("./src/sources/dataProducts");

let nextId = 1;

class ProductManager {

    constructor(){
        this.products = productList;
    }

    setNextId() {
        if (this.products.length > 0) {
          const maxId = Math.max(...this.products.map((product) => product.id));
          nextId = maxId + 1;
        }
    }

    addProduct(
        title, 
        description, 
        code, 
        price, 
        status = true, 
        stock, 
        category, 
        thumbnail){

        if(!title || !description || !code || !price || !status || !stock || !category){
            throw new Error("Faltan datos!!!")
        }
        
        if(this.products.some(product => product.code === code)){
            throw new Error(`Ya existe el código ${code}.`);
        }

        //Forma 1.
        // let id;
        // id = this.products.length + 1;

        //Forma 2.
        this.setNextId();

        this.products.push({
            nextId,
            title,
            description, 
            code, 
            price, 
            status, 
            stock, 
            category, 
            thumbnail
        });
        
        nextId++;
        return { id: nextId - 1, title, code };
    }

    getProducts(){
        return this.products
    }

    getProductById(id){

        if(!id){throw new Error("El campo no debe estar vacio!")}

        if(typeof id !== 'number'){throw new Error("Debe ser un número!")} 

        if(this.products.length === 0){throw new Error("No hay ningún producto!")}

        for(let i = 0; i < this.products.length; i++){
            
            //Forma 1.
            // const product = this.products[id - 1];

            const product = this.products.filter(product => product.id === id);

            if(product.length === 0){throw new Error('No hay productos con esa ID')};

            return product;
        }
    }

    updateProduct(id, updatedInfo){

        if(!id){throw new Error("El campo no debe estar vacio!")};

        if(typeof id !== 'number'){throw new Error("Debe ser un número!")};

        if(this.products.length === 0){throw new Error("No hay ningún producto!")}

        const productIndex = this.products.findIndex(product => product.id === id);

        if(productIndex === -1){ throw new Error('No hay productos con esa ID')};

        const product = this.products[productIndex];
        
        if (updatedInfo.title && typeof updatedInfo.title === 'string') {
            product.title = updatedInfo.title;
        }
        if (updatedInfo.description && typeof updatedInfo.description === 'string') {
            product.description = updatedInfo.description;
        }
        if (updatedInfo.price && typeof updatedInfo.price === 'number') {
            product.price = updatedInfo.price;
        }
        if (updatedInfo.thumbnail && typeof updatedInfo.thumbnail === 'string') {
            product.thumbnail = updatedInfo.thumbnail;
        }
        if (updatedInfo.code && typeof updatedInfo.code === 'string') {
            product.code = updatedInfo.code;
        }
        if (updatedInfo.stock && typeof updatedInfo.stock === 'number') {
            product.stock = updatedInfo.stock;
        }

        return this.products[productIndex];    
    }

    deleteProduct(id){

        if(!id){throw new Error("El campo no debe estar vacio!")}

        if(typeof id !== 'number'){throw new Error("Debe ser un número!")}

        if(this.products.length === 0){throw new Error("No hay ningún producto!")}

        const index = this.products.findIndex(product => product.id === id);

        if(index === -1){ throw new Error('No hay productos con esa ID')};

        const deletedProduct = this.products.splice(index, 1)[0];

        return deletedProduct;
    }
};

// const product = new ProductManager();

// product.addProduct(
//     'Jabón', 
//     'Pieza para lavar la piel', 
//     '5 USD', 
//     'Imagen URL', 
//     '101', 
//     '5 Unds');

// product.addProduct(
//     'Shampoo', 
//     'Pieza para lavar el cabello', 
//     '12 USD', 
//     'Imagen URL', 
//     '102', 
//     '10 Unds');

// console.log(product.getProducts());
// console.log(product.getProductById(2));
// console.log(product.deleteProduct(1));
// console.log(product.updateProduct(2, { title: 'Shampoo manzana', price: '16 USD' }));
// console.log(product.getProducts());

module.exports = ProductManager;






