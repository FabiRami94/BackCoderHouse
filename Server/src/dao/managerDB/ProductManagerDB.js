
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

    async updateProduct(_id, updatedInfo){

        updatedInfo = {  title,
            description,
            code,
            price,
            stock,
            category,
            thumbnail}

        const modifiedProduct = await ProductsModel.findByIdAndUpdate(
            _id,
            { $set: updatedInfo},
            { new: true }
        );
    
        if (!modifiedProduct) {
            throw new Error(`No hay productos con esa ID: ${_id}`);
        }
    
        return modifiedProduct;  
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