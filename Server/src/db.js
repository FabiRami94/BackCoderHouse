
require('dotenv').config();
const {USER, PASSWORD} = process.env;
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main(){
    await mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@cluster0.twuprdt.mongodb.net/`)  
}

module.exports = mongoose;