const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
    },
    description : {
        type : String,
    },
    category: {
        type: String,
        enum: ['chair', 'autochair', 'tables', 'bed']
    },
    productImage : {
          type:String,
    },
    isDelete:{
        type:Boolean,
        default: false,
    }
},
{
    versionKey : false,
    timestamps : true,
}
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
