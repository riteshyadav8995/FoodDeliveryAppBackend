const jwt=require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');
const UnathorizedError = require('../utils/unauthorizedError');

async function isLoggedIn(req,res,next){
    const token=req.cookies['authToken'];
   if(!token){
    return res.status(401).json({
        success:false,
        data:{},
        error:"Not authenticated",
        message:"No auth Token provided"
    });
}
  try{
    const decoded=jwt.verify(token,JWT_SECRET);
    if(!decoded){
     throw new UnathorizedError();
   }
   // if reached here .then user is authenticated allow them to access the api
        req.user={
    email:decoded.email,
    id:decoded.id,
    role:decoded.role
   }

   next(); // goes to controller
  } catch(error){
     return res.status(401).json({
        success:false,
       data:{},
       error:error,
       message:"Invalid Token provided"
     })
  }

}

  function isAdmin(req,res,next){
   const loggedInuser=req.user;
   if(loggedInuser.role==="ADMIN"){
     next();
   }
   else{
   return res.status(401).json({
     success:false,
     data:{},
     message:"You are not authorized for this action",
     error:{
        statusCode:401,
        reason:"Unathorized user for this action"
     }
   })
  }
 }

module.exports={
    isLoggedIn,
    isAdmin
}