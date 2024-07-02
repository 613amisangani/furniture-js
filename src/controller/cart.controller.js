const Cartservices = require("../services/cart.services");
const Cartservice = new Cartservices();

exports.addNewCart = async (req,res) =>{
    try {
        let results = await Cartservice.addNewCart(req.body ,req.user._id);
        res.status(201).json(results);
        
    } catch (error) {
      console.log(error);
      res.json({message : "internal server error"})  
    }
}



exports.getAllCarts =  async (req,res) =>{
  try {
    let results =  await Cartservice.getAllCarts(req.query ,req.user._id);
    if(!results || results.length === 0 )
      return res.json({message:"user have empty carts"})
    res.status(201).json(results);
  } catch (error) {
    console.log(error);
    res.json({message : "internal server error"})  
  }
}


exports.updateUser = async (req,res) =>{
  try {
    let results =  await Cartservice.updateUser(req.body,req.user._id);
    res.status(201).json(results);
    
  } catch (error) {
    console.log(error);
    res.json({message : "internal server error"})  
  }
}

exports.removeCart = async (req,res) =>{
  try {
    let results =  await Cartservice.removeCart(req.query,req.user._id);
    res.status(201).json(results);
    
  } catch (error) {
    console.log(error);
    res.json({message : "internal server error"})  
  }
}