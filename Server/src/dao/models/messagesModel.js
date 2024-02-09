
let mongoose = require("mongoose");
const { Schema } = mongoose;

const messagesSchema = new Schema({
    user: String,
    message: String,
    atCreated: {
      type: Date,
      default: Date()
    }
  })

const MessagesModel = mongoose.model('MessagesModel', messagesSchema);

module.exports = MessagesModel;