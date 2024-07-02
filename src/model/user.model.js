const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        
        Name :{
            type:String
        },
        email :{
            type : String,
            unique : true,
        },
        password:{
             type : String,
        },
        mobileNo:{
            type: String,
        },
        profileImage:{
            type : String,
        },
       role:{
           type : String,
           enum : ["Admin","User"]    
       },
        gender:{
            type:String,
            enum :["Male","Female"]
        },
        isDelete:{
            type:Boolean,
            default: false,
        }
    },{
        versionKey : false,
        timestamps : true,
    }
);

module.exports = mongoose.model("users",userSchema)