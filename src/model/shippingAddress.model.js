const mongoose = require("mongoose");

const shippingAddressSchema  = mongoose.Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        orders :[{
            orderId :{
                type : mongoose.Schema.Types.ObjectId,
                ref : "orders"
            },
            fullName :{
                type : String,  
            },
            address : {
                type : String,
            },
            zipcode : {
                type: String,
            },
            country : {
                type : String,
            },
            city :{
                type : String,
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



module.exports = mongoose.model("shippingAddress",shippingAddressSchema)


