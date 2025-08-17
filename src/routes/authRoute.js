const express=require('express');
const { login } = require('../controllers/authController');

// we have to initialise a router object to add routes in a new file
// use-> Routers are used for segregating routes in different modules
const authRouter=express.Router();
authRouter.post('/login',login) // this is route registration

module.exports=authRouter;
    

