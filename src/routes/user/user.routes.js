const express = require('express');
const userRoutes = express.Router();
const upload = require('../../helpers/imageUpload');
const { registerUser,loginUser,getProfile,updateProfile,changePassword,deleteUser} = require('../../controller/user.controller');
const verifyToken = require('../../helpers/verifyToken');
userRoutes.post("/register", upload.single('profileImage'), registerUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/profile", verifyToken, getProfile);
// userRoutes.get("/admin-profile", verifyToken, getAdminProfiles);

userRoutes.put("/update", verifyToken, updateProfile);
userRoutes.put("/update", updateProfile);

userRoutes.put("/change-password", verifyToken, changePassword);
userRoutes.delete("/delete", verifyToken, deleteUser);
module.exports = userRoutes;