const mongoose =require('mongoose');
const serverConfig=require('./serverConfig.js')
async function connectDB(){
  try{
          await mongoose.connect(serverConfig.DB_URL);
          console.log("succesfully connect to mongodb server");
  } catch(error){
     console.log("not able to connect to mongodb server");
     console.log(error);
  }
}
module.exports=connectDB;