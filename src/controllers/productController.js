const {createProduct}=require('../services/productService');

async function addProduct(req,res){

    try{
        console.log("file recieved",req.file);
        const product=await createProduct({
    productName:req.body.productName,
    description:req.body.description,
    imagePath:req.file.path,
    price:req.body.price,
    category:req.body.category, // if catrgory is undefined then veg will be stored
    inStock:req.body.inStock, // if instock is undefined then true will be store

  });
   return res.status(201).json({
    success:true,
    message:'succesfully created the product',
    error:{},
    data:product
   });

    } catch(error){
       console.log(error);
       return res.status(500).json({
        success:false,
        message:error.message,
        data:{},
        error:error
       });
    }
}

module.exports={
    addProduct
}