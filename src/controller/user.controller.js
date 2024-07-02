const userServices = require('../services/user.services');
const userService = new userServices();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.registerUser = async (req, res) => {
    try {
      // console.log(req.body);
      const {
        Name,
        email,
        password,
        mobileNo,
        profileImage,
        role,
        gender, 
      } = req.body;
      
      let user = await userService.findOneUser({ email: email, isDelete: false });
  
  
      if (user) {
        return res.json({ message: "You are Already Registered....." });
      }

      let image = "";
      if(req.file)
        image = req.file.path.replace(/\\/g,'/')
  
      // Encrypt Password
      let hashPassword = await bcrypt.hash(password, 10);
      // console.log(hashPassword);
  
      // Create New User
      user = await userService.createUser({
       Name,
        email,
        password: hashPassword,
        mobileNo,
        profileImage : image,
        role,
        gender,
      });
      // await user.save();
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  
  exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;


        // Check  user exists in database
        const user = await userService.findOneUser({email : email , isDelete : false});
        if (!user) {
            return res.status(401).json({ message: "user not found" });
        }

        // Verify password
        const matchedPassword = await bcrypt.compare(password, user.password);
        if (!matchedPassword) {
            return res.status(401).json({ message: "password not match" });
        }
        
        // Generate JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET_KEY);

        // Respond with token
        res.json({ token,message : "login success" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getProfile = async (req, res) => {
      try {
           const userProfile = await userService.getProfile(req.user);


          res.json(userProfile);
      } catch (err) {
          console.error(err);
          res.status(500).json({ message: "Internal server error" });
      }
  }

  // exports.getAdminProfiles = async (req, res) => {
  //   try {
  //       // Fetch all admin profiles from the service
  //       const adminProfiles = await userService.getAdminProfiles();
  //       res.json(adminProfiles);
  //   } catch (err) {
  //       console.error(err);
  //       res.status(500).json({ message: "Internal server error" });
  //   }
  // }
  

  exports.updateProfile = async (req, res) => {
    try {
      let user = req.user;
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      user = await userService.updateUser(
        user._id,
        { ...req.body } );
      res.json({user, message: "Update Success"});
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


  exports.changePassword = async (req,res) => {
    try {
        let user = req.user;
        const { oldPassword, newPassword, confirmPassword } = req.body;

        if(oldPassword === newPassword){
            res.json({message: "Your Password Allready Used...."});
        }
        if(newPassword !== confirmPassword){
            res.json({message: "newPassword An confirmPassword Doesn't Match...."});
        }
        let hashPassword = await bcrypt.hash(newPassword, 10);

        user = await userService.updateUser(
          user._id,
          { password: hashPassword }
        );
        res.json({user, message: "Update Success"});
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
      } 
}


exports.deleteUser = async (req, res) => {
      try {
          const result = await userService.deleteUser(req.user);
          res.json(result);
      } catch (err) {
          console.error(err);
          res.status(500).json({ message: "Internal server error" });
      }
  }
