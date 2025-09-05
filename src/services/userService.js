const { findUser, createUser } = require("../repositories/userRepository");
const {createCart}=require('../repositories/cartRepository');
   async function registerUser(userDetails){
        // it will create a brand new user in this db

        // 1.we need tp check if thee user with this email and mobie number already exits or not
      const user=await findUser({
        email:userDetails.email,
         mobileNumber:userDetails.mobileNumber
      });

      if(user){
        // we found a user
        throw{reason:'User with the given email and mobile number already exists',statusCode:400}
      }
        //2.if not then create the user in the database
       const newUser=await createUser({
        email:userDetails.email,
        password:userDetails.password,
        firstName:userDetails.firstName,
        lastName:userDetails.lastName,
        mobileNumber:userDetails.mobileNumber
       });
       if(!newUser){
        throw{reason:'something went wrong, cannot create user',statusCode:500}
       }

       await createCart(newUser._id);
        //3. return the details of created user
        return newUser;
    }
module.exports={
  registerUser
}
    
