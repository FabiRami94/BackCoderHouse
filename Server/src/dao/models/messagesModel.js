
let mongoose = require("mongoose");
const { Schema } = mongoose;

const messagesShema = new Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
});

const MessagesModel = mongoose.model('MessagesModel', messagesShema);

module.exports = MessagesModel;

