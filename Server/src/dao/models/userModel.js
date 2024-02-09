
let mongoose = require("mongoose");
const { Schema } = mongoose;
import mongoosePaginate from 'mongoose-paginate-v2'

const usersSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

usersSchema.pre('find', function () {
    this.populate('cart');
  });
  
usersSchema.plugin(mongoosePaginate);

const UsersModel = mongoose.model('UsersModel', usersSchema);

module.exports = UsersModel;