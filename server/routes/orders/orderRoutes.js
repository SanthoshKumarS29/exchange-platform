import express from 'express';
import { userAuth } from '../../middleware/userAuth.js';
import { createOrder, getOrders } from '../../controller/orders/OrderController.js';


const router = express.Router();

router.post('/', userAuth, createOrder);
router.get('/my-orders', userAuth, getOrders);

export default router;