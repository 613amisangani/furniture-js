const favoriteservices = require("../services/favorite.services");
const favoriteservice = new favoriteservices();


exports.addfavorite = async (req,res) =>{
    try {
        let results = await favoriteservice.addfavorite(req.body ,req.user._id);
        res.status(201).json(results);
        
    } catch (error) {
      console.log(error);
      res.json({message : "internal server error"})  
    }
}


exports.getAllfavorite =  async (req,res) =>{
    try {
      let results =  await favoriteservice.getAllfavorite(req.query ,req.user._id);
      if(!results || results.length === 0 )
        return res.json({message:"user have empty favorite"})
      res.status(201).json(results);
    } catch (error) {
      console.log(error);
      res.json({message : "internal server error"})  
    }
  }



  exports.removefavorite = async (req,res) =>{
    try {
      let results =  await favoriteservice.removefavorite(req.query,req.user._id);
      res.status(201).json(results);
      
    } catch (error) {
      console.log(error);
      res.json({message : "internal server error"})  
    }
  }