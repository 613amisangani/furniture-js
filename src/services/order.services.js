const Order = require('../model/order.model')
const Cart = require('../model/cart.model')
const { default: mongoose } = require("mongoose");

module.exports = class OrderServices{

    async newOrder(body){
try {
    return await Order.create(body)
    
} catch (err) {
    console.log(err)
    return err;
}
    }



    async getAllOrder(query, userID) {
        try {
          let orderItem =
            query.orderId && query.orderId !== ""
              ? [
                  {
                    $match: { _id: new mongoose.Types.ObjectId(query.orderId) },
                  },
                ]
              : [];
          let loginUser =
            query.me && query.me === "true"
              ? [
                  {
                    $match: { user: userID },
                  },
                ]
              : [];
          let pipeline = [
            {
              $match: { isDelete: false },
            },
            ...loginUser,
            ...orderItem,
            {
              $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
                pipeline: [
                  {
                    $project: {
                      firstName: 1,
                      lastName: 1,
                      email: 1,
                    },
                  },
                ],
              },
            },
            {
              $set: { user: { $first: "$user" } },
            },
            {
              $unwind: "$products",
            },
            {
              $lookup: {
                from: "products",
                localField: "products.productId",
                foreignField: "_id",
                as: "products.productId",
                pipeline: [
                  {
                    $project: {
                      title: 1,
                      price: 1,
                    },
                  },
                ],
              },
            },
            {
              $set: { "products.productId": { $first: "$products.productId" } },
            },
          ];
    
          let orders = await Order.aggregate(pipeline);
          return orders;
        } catch (err) {
          console.log(err);
          return err;
        }
      }


      async removeOrder(query, userID) {
        try {
          let removeOrder = await Order.findOneAndUpdate(
            {
              user: userID,
              isDelete:false,
            },
            {
              isDelete : true
            },
           
            {
              new: true,
            },
          );
          return removeOrder;
        } catch (err) {
          console.log(err);
          return err.message;
        }
      }
    



}

