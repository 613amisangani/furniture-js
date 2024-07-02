const express = require('express');
const favoritrRoutes =  express.Router();
const {addfavorite,getAllfavorite, removefavorite} = require('../../controller/favorite.controller');
const verifyToken = require('../../helpers/verifyToken');

favoritrRoutes.post("/add-favorite",verifyToken,addfavorite);
favoritrRoutes.get("/get",verifyToken,getAllfavorite);
// cartRoutes.put("/",verifyToken,updateUser);
favoritrRoutes.delete("/delete",verifyToken,removefavorite);








module.exports = favoritrRoutes;