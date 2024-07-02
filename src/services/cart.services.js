const Cart = require("../model/cart.model");
const { default: mongoose } = require("mongoose");

module.exports = class Cartservices{

    // add product
    async addNewCart(body ,userId){
        try {
            let userCarts = await Cart.findOne({user : userId,isDelete:false});
            if(!userCarts){
                return await Cart.create({
                    user : userId,
                    products : [
                        {
                            productId : body.productId,
                            quantity : body.quantity || 1 ,
                        },
                    ],
                });
            } else {
                let findproductIndex = userCarts.products.findIndex(
                    (item) => String(item.productId) === body.productId
                );
                if(findproductIndex !== -1){
                    userCarts.products[findproductIndex].quantity += body.quantity || 1;
                }
                else{
                    userCarts.products.push({
                        productId : body.productId,
                        quantity : body.quantity || 1

                    });
                }
                return await userCarts.save();
            }
            
        } catch (err) {
            console.log(err);
            return err.message ; 
        }
    }



    // get one or all product

    async getAllCarts(query,userID){
        try {
            let cartItem = 
            query.cartId && query.cartId !== ""
            ?[
                {

                    $match : {_id : new mongoose.Types.ObjectId(query.cartId)},
                },
            ]
            : [];

            let loginUser = 
            query.me && query.me === "true"
            ?[
                {
                    $match : {user : userID},
                },
            ]
            : [];
            let pipeline = [
                {
                    $match : {isDelete : false},
                },
                ...loginUser,
                ...cartItem,
                {
                    $lookup : {
                        from : "users",
                        localField : "user",
                        foreignField : "_id",
                        as : "user",
                        pipeline : [
                            {
                                $project : {
                                    Name : 1,
                                    email : 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $set : { user : {$first : "$user"}},
                },
                {
                    $unwind : "$products"
                },
                {
                    $lookup : {
                        from : "products",
                        localField : "products.productId",
                        foreignField : "_id",
                        as : "products.productId",
                        pipeline : [
                            {
                                $project : {
                                    productName:1,
                                    price : 1,
                                    productImage : 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $set : {"products.productId" : {$first: "$products.productId"}},
                },
            ];

            let carts = await Cart.aggregate(pipeline);
            console.log(carts);
            let totalAmount = carts
            .map((item)=>({
                quantity: item.products.quantity,
                price: item.products.productId.price,
            }))
            .reduce((total,item) =>(total += item.quantity * item.price),0);
            let discountAmount = (totalAmount * 0.20);
            totalAmount = totalAmount - (totalAmount * 0.20);
            return{
                carts,
                discount: discountAmount,
                totalAmount
            };
            
        } catch (err) {
            console.log(err);
            return err.message ; 
        }
    }


 // update user

//   async updateUser(body, userId){
//     try {
//         let userCarts = await Cart.findOneAndUpdate({user : userId});
//         // if(!userCarts){
//         //     res.json({message : "user carts not found"});
//         // }
//         let findproductIndex = userCarts.products.findIndex(
//             (item) => String(item.productId) === body.productId
//         );
//         if(findproductIndex !== -1){
//             userCarts.products[findproductIndex].quantity = body.quantity || 1;
//         }
//         else{
//             userCarts.products.push({
//                 productId : body.productId,
//                 quantity : body.quantity || 1

//             });
//         }
//         return await userCarts.save();
        
//     }  catch (err) {
//         console.log(err);
//         return err.message ; 
//     }
   
// }

async updateUser(body,userID){
    try {
        let updateUser = await Cart.findOneAndUpdate(
            {
                user :userID,
                isDelete : false
            },
            {
                $set:body
            },
            {
                new : true
            }
        )
        return updateUser;
        
    }  catch (err) {
        console.log(err);
        return err.message ; 
    }
 }


 async removeCart(query,userID){
    try {
        let removeCart = await Cart.findOneAndUpdate(
            {
                user :userID
            },
            {
                isDelete : true
            },
            {
                new : true
            }
        )
        return removeCart;
        
    }  catch (err) {
        console.log(err);
        return err.message ; 
    }
 }

}

