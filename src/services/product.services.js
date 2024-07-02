const Product = require('../model/product.model');

module.exports = class productService {

async addProduct(body){
    try {
        const product = new Product(body);
        await product.save();
        return product;
    } catch (error) {
        throw error;
    }
}


async getAllProduct(body){
    try {
        return await Product.find(body)
        
    } catch (error) {
        return error;
        
    }

};

async getProduct(body){
    try {
        
        const item = await Product.find(body);
        return item;
        
    } catch (error) {
        return error;
        
    }
 };

 async updateProduct(id,body) {
    try {
      return await Product.findByIdAndUpdate(id, { $set: body }, { new: true } , {isDelete: true});
    } catch (error) {
      return error.message;
    }
  }


  async deleteProduct(id,body){
    try {
        return await Product.findByIdAndUpdate(id, { $set: { ...body, isDelete: true } }, { new: true }); 
    } catch (error) {
        return error;
        
    }
}



}
