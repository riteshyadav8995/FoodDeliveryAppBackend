const express=require('express');
const { login, logout } = require('../controllers/authController');

// we have to initialise a router object to add routes in a new file
// use-> Routers are used for segregating routes in different modules
const authRouter=express.Router();
authRouter.post('/login',login); // this is route registration
authRouter.post('/logout',logout);
module.exports=authRouter;
    

