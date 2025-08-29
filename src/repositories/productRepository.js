/* const Product=require('../schema/productSchema');

async function createProduct(productDetails){
    try{
      console.log("data recieved in repository",productDetails);
    const response=await Product.create(productDetails);
    } catch(error){
        console.log(error);
    }
}

module.exports={
  createProduct
} 
  */
 const Product = require('../schema/productSchema'); 
const BadRequestError = require('../utils/badRequestError');
const InternalServerError = require('../utils/internalServerError');
const NotFoundError = require('../utils/notFoundError');

const createProduct = async (productData) => {
  try {
    // This attempts to create and save the new product in MongoDB
    const product = await Product.create(productData);
    return product;
  } catch (error) {
    
     if(error.name==='ValidationError'){
     const errorMessageList=Object.keys(error.errors).map((property)=>{
        return error.errors[property].message;
     })
        throw new BadRequestError(errorMessageList);
      }

    console.error("--- MONGOOSE CREATE FAILED in Repository ---", error);

    // Re-throw the error so the service and controller layers are aware of it.
    // This prevents the function from returning 'undefined' on failure.
    throw new InternalServerError();
  }
};
 async function getProductById(productId){
  try{
     const product=await Product.findById(productId);
     return product;
  } catch(error){
    console.log(error);
    throw new InternalServerError();
  }
 }

  async function deleteProductById(productId){
    try{
    const response=await Product.findByIdAndDelete(productId);
    if(!response){
      throw new NotFoundError('product');
    }
    return response;
    }catch(error){
      console.log(error);
      throw new InternalServerError();
    }
  }
module.exports = {
  createProduct,
  getProductById,
  deleteProductById
};
