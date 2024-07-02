const shippingAddress = require('../model/shippingAddress.model')

module.exports = class shippingAddressservices{

    async addshippingAddress(body , userId,orderId){
      try {
          let addshippingAddress = await shippingAddress.findOne({user:userId,order:orderId,isDelete:false});
          if(!addshippingAddress){
              return await shippingAddress.create({
                  user : userId,
                  orders : [
                      {
                          orderId : body.orderId,
                          fullName : body.fullName ,
                          address : body.address,
                          zipcode : body.zipcode,
                          country : body.country,
                          city : body.city,

                      },
                  ],
                  
              },);
          }
          addshippingAddress.orders.push({
            orderId : body.orderId,
            fullName : body.fullName ,
            address : body.address,
            zipcode : body.zipcode,
            country : body.country,
            city : body.city,
              });
              return await addshippingAddress.save();
  
          
      } catch (err) {
          console.log(err);
          return err.message ; 
      }
    }
  
}  