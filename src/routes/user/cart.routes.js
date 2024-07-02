const express = require('express');
const cartRoutes =  express.Router();
const {addNewCart,getAllCarts,updateUser,removeCart} = require('../../controller/cart.controller');
const verifyToken = require('../../helpers/verifyToken');

cartRoutes.post("/add-cart",verifyToken,addNewCart);
cartRoutes.get("/",verifyToken,getAllCarts);
cartRoutes.put("/",verifyToken,updateUser);
cartRoutes.delete("/",verifyToken,removeCart);








module.exports = cartRoutes;