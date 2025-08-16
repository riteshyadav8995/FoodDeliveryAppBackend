const UserRepository = require("../repositories/userRepository");
const UserServices =require('../services/userService');
async function createUser(req,res){
    console.log("Create user controller called");
    console.log(req.body);
    // Todo: register the user
    const userService=new UserServices(new UserRepository());
   try{
        const response=await userService.registerUser(req.body);

    return res.status(201).json({
        message:'Succesfully register the user',
        success:true,
        data:response,
        error:{}
    });
   } catch(error){
       return res.status(error.statusCode).json({
        success:false,
        message:error.reason,
        data:{},
        error:error
       });
   }

}
module.exports={
    createUser
}