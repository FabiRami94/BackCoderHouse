
const fs = require('fs');

let nextId = 1;

class ProductManager {

    constructor() {
        this.products = [];
        this.initialProducts();
        this.setNextId();
    }

    initialProducts() {
        try {
            const existingProducts = fs.readFileSync('./src/sources/dataProducts.json', 'utf-8');
            this.products = JSON.parse(existingProducts);
        } catch (error) {
            this.products = [];
        }
    }

    setNextId() {
        if (this.products.length > 0) {
            const maxId = Math.max(...this.products.map((product) => product.id));
            nextId = maxId + 1;
        } else {
            nextId = 1;
        }
    }

    async addProduct(
        title,
        description,
        code,
        price,
        // status = true,
        status,
        stock,
        category,
        thumbnail
    ) {
        if (!title || !description || !code || !price || !status || !stock || !category) {
            throw new Error("Faltan datos!!!");
        }

        if (this.products.some(product => product.code === code)) {
            throw new Error(`Ya existe el código ${code}.`);
        }

        this.setNextId();

        this.products.push({
            id: nextId,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnail,
        });

        const newProducts = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile('./src/sources/dataProducts.json', newProducts);

        return { id: nextId++, title, code }; 
    }

    
    async getProducts(){
        const readDataProducts = await fs.promises.readFile('./src/sources/dataProducts.json', 'utf-8');
        const readDataProductsArray = JSON.parse(readDataProducts);
        return readDataProductsArray;
    }

    async getProductById(id){

        if (!id) {
            throw new Error("El campo no debe estar vacío!");
        }

        if (typeof id !== 'number') {
            throw new Error("Debe ser un número!");
        }

        const dataProductsString = await fs.promises.readFile('./src/sources/dataProducts.json', 'utf-8');
        const dataProductsArray = JSON.parse(dataProductsString);

        if (dataProductsArray.length === 0) {
            throw new Error("No hay ningún producto!");
        }

        const product = dataProductsArray.find(product => product.id === id);

        if (!product) {
            throw new Error('No hay productos con esa ID');
        }
        return product;
    }

    async updateProduct(id, updatedInfo){

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
        if (updatedInfo.code && typeof updatedInfo.code === 'string') {
            product.code = updatedInfo.code;
        }
        if (updatedInfo.price && typeof updatedInfo.price === 'number') {
            product.price = updatedInfo.price;
        }
        if (updatedInfo.status && typeof updatedInfo.status === 'boolean') {
            product.status = updatedInfo.status;
        }
        if (updatedInfo.stock && typeof updatedInfo.stock === 'number') {
            product.stock = updatedInfo.stock;
        }
        if (updatedInfo.category && typeof updatedInfo.category === 'string') {
            product.category = updatedInfo.category;
        }
        if (updatedInfo.thumbnail && typeof updatedInfo.thumbnail === 'string') {
            product.thumbnail = updatedInfo.thumbnail;
        }

        const existingProducts = await fs.promises.readFile('./src/sources/dataProducts.json', 'utf-8');
        const existingProductsArray = JSON.parse(existingProducts);

        existingProductsArray[productIndex] = product; 

        const newProducts = JSON.stringify(existingProductsArray, null, 2);
        await fs.promises.writeFile('./src/sources/dataProducts.json', newProducts);

        return this.products[productIndex];   
    }

    async deleteProduct(id) {
        if (!id) {
            throw new Error("El campo no debe estar vacío!");
        }

        if (typeof id !== 'number') {
            throw new Error("Debe ser un número!");
        }

        const dataProductsString = await fs.promises.readFile('./src/sources/dataProducts.json', 'utf-8');
        const dataProductsArray = JSON.parse(dataProductsString);

        if (dataProductsArray.length === 0) {
            throw new Error("No hay ningún producto!");
        }

        const index = dataProductsArray.findIndex(product => product.id === id);

        if (index === -1) {
            throw new Error('No hay productos con esa ID');
        }

        const deletedProduct = dataProductsArray.splice(index, 1)[0];
        const newDataProducts = JSON.stringify(dataProductsArray, null, 2);
        await fs.promises.writeFile('./src/sources/dataProducts.json', newDataProducts);

        return deletedProduct;
    }
};

module.exports = ProductManager;