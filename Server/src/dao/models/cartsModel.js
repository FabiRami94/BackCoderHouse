
let mongoose = require("mongoose");
const { Schema } = mongoose;

const cartsShema = new Schema({
    products: {
        type: [String],
    },
});

const CartsModel = mongoose.model('CartsModel', cartsShema);

module.exports = CartsModel;