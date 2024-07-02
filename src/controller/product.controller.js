const productServices = require('../services/product.services');
const productService = new productServices();
const userServices = require('../services/user.services');
const userService = new userServices();

exports.addProduct = async (req, res) => {
    try {
        const { productName, price, description, productImage ,category } = req.body;

       
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ message: "Only admins can add products" });
        }
        let image = "";
        if(req.file)
          image = req.file.path.replace(/\\/g,'/')

       product = await productService.addProduct({
            productName,
            price,
            description,
            productImage : image,
            category,
        });

        

        res.status(201).json({product , message : "new product is added"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.getAllProduct =  async (req, res) => {  
    const products = await productService.getAllProduct({isDelete : false});
    res.status(200).json(products);
}


exports.getProduct = async (req, res) => {  
    //  console.log(typeof(id))
    // const id = req.params.id;
    const id = req.query.category;

    //  const item =  await Product.findById(id);
     const item =  await productService.getProduct({category: id})
    if(!item){
        return res.json({message : "product is not found...."});
    }
    res.status(200).json(item);
}


exports.updateProduct = async (req,res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: "Only admins update products" });
    }
    const id = req.params.id;
    let product = await productService.getProduct(id);
    // console.log(product);
    if(!product){
        return res.json({meassage : 'Product is Not Found...!!!'});
    }
    // product = await ProductModel.findOneAndUpdate({_id:id},{$set : {...req.body}},{new:true});
    product = await productService.updateProduct(id,{...req.body});
    // console.log(product);
    res.status(200).json({product, message : "Product is Updated..."});
 };


 exports.deleteProduct = async (req, res) => {  
    // console.log(typeof(id))
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: "Only admins delete products" });
    }
    const id = req.params.id;
    let product = await productService.getProduct(id);
    // let product = await Product.findById(id);
    if(!product){
        return res.json({message : "product is not found...."});
    }
    //  product = await product.findOneAndUpdate({_id:id},{$set:{...req.body}}, {new:true})
    // product = await productService.deleteProduct(id,{...req.body})

      product = await productService.deleteProduct(id,{...req.body})

    console.log(product)
    res.status(200).json({message:'product is deleted....'});
}



