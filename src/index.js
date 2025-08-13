const express=require('express');
const bodyParser=require('body-parser');
const ServerConfig=require('./config/serverConfig');
const connectDB = require('./config/dbConfig');

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
})


// 34.5.12.5:3000-> socket address(ip+port)
//122.252.251.248-> localhost ka ip address
