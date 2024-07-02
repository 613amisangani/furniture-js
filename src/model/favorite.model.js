const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema(
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
            price :{
                type : Number,
            },
        },
    ],
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


module.exports = mongoose.model("favorite",favoriteSchema);