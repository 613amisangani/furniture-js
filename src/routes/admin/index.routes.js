const express = require('express');
const appliRoutes = express.Router();

 const productRoutes = require('./product.routes');

 appliRoutes.use('/product', productRoutes);



module.exports = appliRoutes;