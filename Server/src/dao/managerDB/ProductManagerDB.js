
const productsModel = require('../models/productsModel.js');

class ProductManagerDB {

    constructor() {
        this.model = productsModel;
      }
    
      getProducts = async (query, options) => await this.model.paginate(query, options);
    
      getProductsById = async (pid) => await this.model.findById({ _id: pid }).lean();
    
      addProduct = async (fields) => await this.model.create(fields);
    
      updateProduct = async (pid, changedProduct) => await this.model.findByIdAndUpdate(pid, changedProduct, {new: true});
    
      deleteProductById = async (pid) => await this.model.findByIdAndDelete(pid);
    
      deleteProductByCode = async (pcode) => await this.model.findOneAndDelete({code: pcode});
    
      getCategorys = async () => await this.model.distinct('category').sort();

};

module.exports = ProductManagerDB;