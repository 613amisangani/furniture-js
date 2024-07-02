const express = require('express');
const appRoutes = express.Router();
const userRoutes = require('./user.routes');
const favoritrRoutes = require('./favorite.routes');
const cartRoutes = require('./cart.routes')
const orderRoutes = require('./order.routes');
const reviewRoutes = require('./review.routes');
const shippingAddressRoutes =require('./shippingAddress.routes')

appRoutes.use('/users', userRoutes);
appRoutes.use('/favorite', favoritrRoutes);
appRoutes.use('/cart',cartRoutes)
appRoutes.use('/order',orderRoutes)
appRoutes.use('/review',reviewRoutes)
appRoutes.use('/shippingAddress',shippingAddressRoutes)




module.exports = appRoutes;
