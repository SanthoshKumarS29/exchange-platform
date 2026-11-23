import express from 'express';
import { userAuth } from '../../middleware/userAuth.js';
import { createOrder, getOrderBook, getOrders } from '../../controller/orders/OrderController.js';


const router = express.Router();

router.post('/', userAuth, createOrder);
router.get('/my-orders', userAuth, getOrders);
router.get('/order-book/:marketId', userAuth, getOrderBook)

export default router;