
const ProductsModel = require('../models/productsModel.js');

class ProductManagerDB {

    constructor() {}
   
    async addProduct(
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnail
    ) {
        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error("Faltan datos!!!");
        }

        const existingProduct = await ProductsModel.findOne({title}).exec();
        if(existingProduct){ throw new Error('El producto ya se encuentra creado.')};

        const existingCode = await ProductsModel.findOne({code}).exec();
        if(existingCode){ throw new Error('El código ya se encuentra en uso.')};

        const newUser = new ProductsModel({ 
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnail
        });
    
        await newUser.save();

        return newUser;
    }

    
    async getProducts(){

        let allProducts = await ProductsModel.find({});
        
        return allProducts
    }

    async getProductById(_id){

        if (!_id) {
            throw new Error("El campo no debe estar vacío!");
        }

        let productById = await ProductsModel.findById( _id );

        if (!productById) {
            throw new Error(`El ID: ${_id} no se encuentra en la Base de Datos!`);
        }   

        return productById
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

    async deleteProduct(_id) {

        let existingProduct = await ProductsModel.findOne({_id}).exec();
        
        if (!existingProduct) {
            throw new Error(`El producto con el ID: ${_id} no existe en la base de datos para ser borrada`)
        }
        
        const productDelete = ProductsModel.deleteOne({ _id })
            .then(product => `Producto borrado con exito!`)
            .catch(error => error)
        
        return productDelete;
    }
};

module.exports = ProductManagerDB;