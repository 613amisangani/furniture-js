const favorite = require('../model/favorite.model')


module.exports = class favoriteservices{

    // add product
    async addfavorite(body ,userId){
        try {
            let userfavorite = await favorite.findOne({user : userId,isDelete:false});
            if(!userfavorite){
                return await favorite.create({
                    user : userId,
                    products : [
                        {
                            productId : body.productId,
                            price : body.price  ,
                        },
                    ],
                });
            } 
            userfavorite.products.push({
                        productId : body.productId,
                        price : body.price 

                    });
            return await userfavorite.save();

        } catch (err) {
            console.log(err);
            return err.message ; 
        }
    }



    async getAllfavorite(query,userID){
        try {
            let favoriteItem = 
            query.favoriteId && query.favoriteId !== ""
            ?[
                {

                    $match : {_id : new mongoose.Types.ObjectId(query.favoriteId)},
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
                ...favoriteItem,
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
                                    description : 1,
                                    price : 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $set : {"products.productId" : {$first: "$products.productId"}},
                },
            ];

             let favorites = await favorite.aggregate(pipeline);
            // let totalAmount = carts
            // .map((item)=>({
            //      quantity: item.products.quantity,
            //     price: item.products.productId.price,
            // }))
            // .reduce((total,item) =>(total += item.quantity * item.price),0);
            // let discountAmount = (totalAmount * 0.20);
            // totalAmount = totalAmount - (totalAmount * 0.20);
            return{favorites};
            
        } catch (err) {
            console.log(err);
            return err.message ; 
        }
    }


    async removefavorite(query,userID){
        try {
            let removefavorite = await favorite.findOneAndUpdate(
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
            return removefavorite;
            
        }  catch (err) {
            console.log(err);
            return err.message ; 
        }
     }
    

    
};