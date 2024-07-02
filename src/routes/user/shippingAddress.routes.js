const express = require('express');
const shippingAddressRoutes = express.Router();

const{addshippingAddress}=require('../../controller/shippingAddress.controller')
const verifyToken = require("../../helpers/verifyToken");

shippingAddressRoutes.post("/add",verifyToken,addshippingAddress)

module.exports = shippingAddressRoutes;