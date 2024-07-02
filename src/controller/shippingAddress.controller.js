const shippingAddressservices = require('../services/shippingAddress.services');
const shippingAddressservice = new shippingAddressservices();


exports.addshippingAddress = async(req,res)=>{
    try {
        let results = await shippingAddressservice.addshippingAddress(req.body ,req.user._id);
        res.status(201).json({results,message:"your shipping address is added...."});
        
    } catch (error) {
        console.log(error);
        res.json({message : "internal server error"})  
    }
}