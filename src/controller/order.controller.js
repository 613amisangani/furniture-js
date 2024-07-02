const OrderServices = require('../services/order.services');
const OrderService = new OrderServices();
const Cartservices = require('../services/cart.services');
const Cartservice = new Cartservices();


exports.createNewOrder = async (req,res)=>{
    try {
        let userCarts = await Cartservice.getAllCarts(req.query,req.user._id);
        // res.json(userCarts.carts);
        if(userCarts.carts.length === 0){
            return res.json({message:'user have no cart item'});
        }

        let orderItems = userCarts.carts.map((item)=>({
            quantity : item.products.quantity,
            //  price: item.products.productId.price,
            productId : item.products.productId._id,

        }));
        // let totalAmount = orderItems.reduce(
        //     (total,item) => (total += item.quantity * item.price),0
        // );

        let newOrder = await OrderService.newOrder(
            {
              user:req.user._id,  
              products: orderItems, 
              totalAmount:userCarts.totalAmount
            }
        );

        userCarts = await Cartservice.updateUser({ isDelete : true},req.user._id);
        res.status(201).json(newOrder);
              
    } catch (err) {
        console.log(err);
        res.json({message:"internal server error"})
        
    }
}


exports.getAllOrder =  async (req,res) =>{
    try {
      let results =  await OrderService.getAllOrder(req.query ,req.user._id);
      if(!results || results.length === 0 )
        return res.json({message:"user have empty carts"})
      res.status(201).json(results);
    } catch (error) {
      console.log(error);
      res.json({message : "internal server error"})  
    }
  }


  exports.removeOrder = async (req,res) =>{
    try {
      let results =  await OrderService.removeOrder(req.query,req.user._id);
      res.status(201).json(results);
      
    } catch (error) {
      console.log(error);
      res.json({message : "internal server error"})  
    }
  }