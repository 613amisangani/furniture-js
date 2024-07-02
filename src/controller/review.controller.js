const reviewservices = require('../services/review.services');
const reviewservice = new reviewservices();


exports.addreview = async(req,res)=>{
    try {
        let results = await reviewservice.addreview(req.body ,req.user._id);
        res.status(201).json(results);
        
    } catch (error) {
        console.log(error);
        res.json({message : "internal server error"})  
    }
}

exports.getAllreview =  async (req,res) =>{
    try {
      let results =  await reviewservice.getAllreview(req.query ,req.user._id);
      if(!results || results.length === 0 )
        return res.json({message:"user have empty carts"})
      res.status(201).json(results);
    } catch (error) {
      console.log(error);
      res.json({message : "internal server error"})  
    }
  }


  exports.removereview = async (req,res) =>{
    try {
      let results =  await reviewservice.removereview(req.query,req.user._id);
      res.status(201).json(results);
      
    } catch (error) {
      console.log(error);
      res.json({message : "internal server error"})  
    }
  }




