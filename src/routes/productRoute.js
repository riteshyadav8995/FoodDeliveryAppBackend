const express=require('express');
const uploader = require('../middlewares/multerMiddleware');
const { addProduct } = require('../controllers/productController');

const productRouter=express.Router();

productRouter.post('/',uploader.single('productImage'),addProduct);

module.exports=productRouter;