
let mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const productsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnail: {
        type: [String], // Definición de un array de strings
        validate: {
            validator: (value) => value.length <= 3, // Validación para un máximo de 3 URLs de imagen
            message: 'La propiedad imagenes debe contener como máximo 3 URLs de imagen.',
        },
    },
});

productsSchema.plugin(mongoosePaginate);

const ProductsModel = mongoose.model('ProductsModel', productsShema);

module.exports = ProductsModel;