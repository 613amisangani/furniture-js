const express = require("express");
const orderRoutes = express.Router();
const{createNewOrder,getAllOrder,removeOrder}= require('../../controller/order.controller');
const verifyToken = require("../../helpers/verifyToken");

orderRoutes.post("/add",verifyToken,createNewOrder);
orderRoutes.get("/",verifyToken,getAllOrder);
orderRoutes.delete("/",verifyToken,removeOrder);




module.exports = orderRoutes;
