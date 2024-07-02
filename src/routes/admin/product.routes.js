const express = require('express');
const productRoutes = express.Router();
const upload = require('../../helpers/imageUpload');
const {addProduct,getAllProduct,getProduct,updateProduct,deleteProduct} = require('../../controller/product.controller');
const verifyToken = require('../../helpers/verifyToken');

productRoutes.post('/add', verifyToken, upload.single('productImage'), addProduct);
productRoutes.get("/get", verifyToken,getAllProduct);
productRoutes.get("/single" ,verifyToken,getProduct);
productRoutes.put("/:id",verifyToken, updateProduct);
productRoutes.delete("/:id",verifyToken, deleteProduct);
module.exports = productRoutes;
