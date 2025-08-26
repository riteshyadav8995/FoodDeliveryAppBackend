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

const createProduct = async (productData) => {
  try {
    // This attempts to create and save the new product in MongoDB
    const product = await Product.create(productData);
    return product;
  } catch (error) {
    // --- THIS IS THE CRITICAL FIX ---
    // Log the actual, detailed error from Mongoose to the console.
    // This will tell us if it's a validation, schema, or connection error.
    console.error("--- MONGOOSE CREATE FAILED in Repository ---", error);

    // Re-throw the error so the service and controller layers are aware of it.
    // This prevents the function from returning 'undefined' on failure.
    throw error;
  }
};

module.exports = {
  createProduct,
};
