const express=require('express');
const { isLoggedIn, isAdmin } = require('../validation/authValidation');
const { createNewOrder, getAllordersByUser, getOrder, cancelOrder, changeOrderStatus } = require('../controllers/orderController');

const orderRouter=express.Router();

orderRouter.post('/',isLoggedIn,createNewOrder);
orderRouter.get('/',isLoggedIn,getAllordersByUser);
orderRouter.get('/:orderId',isLoggedIn,getOrder);
orderRouter.put('/:orderId/cancel',isLoggedIn,cancelOrder);
orderRouter.put('/:orderId/status',isLoggedIn,isAdmin ,changeOrderStatus);

module.exports={
    orderRouter
}