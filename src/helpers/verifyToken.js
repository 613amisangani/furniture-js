const jwt = require('jsonwebtoken');
const  User = require('../model/user.model');

const verifyToken = async(req,res,next)=>{
try {
    let authorization = req.headers['authorization'];
    if(!authorization){
        return res.json({message : "unauthorize user"});
    }

    let token = authorization.split(' ')[1];
    let {userId} = jwt.verify(token , process.env.SECRET_KEY);
    
    req.user = await User.findById(userId);
    req.user ? next() : res.json({message : "user not found"});


    
} catch (err) {
   console.log(err) ;
   res.json({message:"internaml server error"})
}
}

module.exports = verifyToken;