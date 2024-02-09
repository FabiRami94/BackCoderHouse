
let mongoose = require("mongoose");
const { Schema } = mongoose;

const cartsSchema = new Schema({
    products: {
      type: [{
        product: {
          type: Schema.Types.ObjectId,
          ref: 'products'
        },
        quantity: {
          type: Number,
          default: 1
        }
      }]
    },
    atCreated: { type: Date, default: Date() },
  });

const CartsModel = mongoose.model('CartsModel', cartsSchema);

module.exports = CartsModel;