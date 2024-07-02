const mongoose = require("mongoose");

const reviewSchema  = mongoose.Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        products :[{
            productId :{
                type : mongoose.Schema.Types.ObjectId,
                ref : "products"
            },
            rating :{
                type : Number,  
            },
            review : {
               type : String,
            },
        },
    ],
        orders:{
            type : mongoose.Schema.Types.ObjectId,
            ref: "orders",
        },
        isDelete : {
            type : Boolean,
            default : false,
       },
    },
    {
        versionKey : false,
        timestamps : true,
    }

)



module.exports = mongoose.model("review",reviewSchema)