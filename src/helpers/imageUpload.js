const multer = require('multer');
// const express = require('express');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null , 'src/public/images')
        
    },
    filename: function(req,file,cb){
        cb(null,`Img-${Date.now()}-${file.originalname}`);
    }
})


 const upload = multer({storage : storage});

 module.exports = upload;