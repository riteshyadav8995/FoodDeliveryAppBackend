/* const cloudinary=require('../config/cloudinaryConfig');
const ProductRepository=require('../repositories/productRepository');
const fs=require('fs/promises');

async function createProduct(productDetails){
    //1.we should check if an image is coming to create
    // the product.then we should first upload on clodinary
    console.log("hitting product service",productDetails);
    const imagePath=productDetails.imagePath;
    if(imagePath){
          try{
            const cloudinaryResponse=await cloudinary.uploader.upload(imagePath);
         var productImage=cloudinaryResponse.secure_url;
          await fs.unlink(imagePath);
          }catch(error){
            console.log(error);
              throw {reason:'Not able to create product',statusCode:500};
          }
         
    }
    //2. then use the url from cloudinary and other product
    // details to add product in db
    const product= await ProductRepository.createProduct({
       ...productDetails,
       productImage:productImage
    });

    if(!product){
        throw {reason:'Not able to create product',statusCode:500};
    }
    return product;

}
module.exports={
    createProduct
}
    */

const cloudinary = require('../config/cloudinaryConfig');
const ProductRepository = require('../repositories/productRepository');
const fs = require('fs/promises');

async function createProduct(productDetails) {
    const { imagePath, productName, description, price, category, inStock } = productDetails;
    let productImage = null;

    // 1. Upload image to Cloudinary if it exists
    if (imagePath) {
        try {
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
            productImage = cloudinaryResponse.secure_url;
            await fs.unlink(imagePath);
        } catch (error) {
            // Log the actual error for better debugging
            console.error("--- CLOUDINARY UPLOAD FAILED ---", error);
            throw { reason: 'Failed to upload product image', statusCode: 500 };
        }
    }

    // --- THIS IS THE CRITICAL FIX ---
    // Convert the string values from the form into the correct data types
    const numericPrice = Number(price);
    const booleanInStock = (inStock === 'true');

    // Add a check to make sure the price is a valid number
    if (isNaN(numericPrice)) {
        throw { reason: 'Price must be a valid number.', statusCode: 400 };
    }

    // 2. Create a new object with the correctly typed data
    const productToSave = {
        productName,
        description,
        category,
        price: numericPrice, // Use the converted number
        inStock: booleanInStock, // Use the converted boolean
        productImage: productImage // Use the URL from Cloudinary
    };

    // 3. Call the repository to save the clean data to the database
    const product = await ProductRepository.createProduct(productToSave);

    if (!product) {
        // This will now only be thrown if the database itself fails
        throw { reason: 'Could not save product to the database', statusCode: 500 };
    }

    return product;
}

module.exports = {
    createProduct
};
