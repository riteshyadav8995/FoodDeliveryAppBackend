const express=require('express');
const uploader = require('../middlewares/multerMiddleware');
const { addProduct, getProduct, deleteProduct } = require('../controllers/productController');


const productRouter=express.Router();

productRouter.post('/',uploader.single('productImage'),addProduct);

productRouter.get('/:id',getProduct);

productRouter.delete('/:id',deleteProduct);
// productRouter.get('/products:id',getProducts);
module.exports=productRouter;