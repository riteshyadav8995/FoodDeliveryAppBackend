const express=require('express');
const { getCardById } = require('../controllers/cartController');

const cartRouter=express.Router();

cartRouter.get('/:id',getCardById);

module.exports={
    cartRouter
}