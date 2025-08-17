const express=require('express');
const bodyParser=require('body-parser');
const ServerConfig=require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const { userRouter } = require('./routes/userRoute');
const { cartRouter } = require('./routes/cartRoute');
const authRouter =require('./routes/authRoute');
// const User=require('./schema/userSchema')
const app=express();
// we can also write updated express body parser
//eg. app.use(express.json()); and remove bodyparser=require
app.use(bodyParser.json());// this is middleware for convert json file to javascript object
// app.use(bodyParser.text());// middleware to parse the text file to javascript object
app.use(bodyParser.urlencoded({extended:true}));//middleware to parse the url encoded message to javascript object

// routing middleware
//if your req route starts with /users then handle it using userRouter
app.use('/users',userRouter);// connect the router to the server
app.use('/carts',cartRouter);
app.use('/auth',authRouter);
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
});

// localhost:5500/users-> post
// localhost:5500/carts/735376-> Get

