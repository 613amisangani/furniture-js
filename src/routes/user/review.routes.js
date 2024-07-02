const express = require('express');
const reviewRoutes = express.Router();
const{addreview,getAllreview, removereview}=require('../../controller/review.controller')
const verifyToken = require("../../helpers/verifyToken");

reviewRoutes.post("/add",verifyToken,addreview)
reviewRoutes.get("/get",verifyToken,getAllreview);
reviewRoutes.delete("/delete",verifyToken,removereview);



module.exports = reviewRoutes;
