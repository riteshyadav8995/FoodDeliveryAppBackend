const express=require('express');
const bodyParser=require('body-parser');
const ServerConfig=require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
// const User=require('./schema/userSchema')
const app=express();
// we can also write updated express body parser
//eg. app.use(express.json()); and remove bodyparser=require
app.use(bodyParser.json());// this is middleware for convert json file to javascript object
app.use(bodyParser.text());// middleware to parse the text file to javascript object
app.use(bodyParser.urlencoded({extended:true}));//middleware to parse the url encoded message to javascript object

app.post('/ping',(req,res)=>{
    console.log(req.body);
    return res.json({message:"pong"});
})
app.listen(ServerConfig.PORT,async()=>{
    await connectDB();
    console.log(`server started at port ${ServerConfig.PORT}`);
    //console.log(process.env.PORT)

    //  const newUser=await User.create({
    //   email:"abc@gmail.com",
    //     password:"123456",
    //     firstName:"ritesh",
    //     lastName:"kumar",
    //     mobileNumber:"9798256375"
    //  });

   // console.log("Created new user");
   // console.log(newUser);
})

