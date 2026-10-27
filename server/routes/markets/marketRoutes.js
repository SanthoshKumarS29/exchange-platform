import express from 'express';
import { getMarkets } from '../../controller/markets/marketController.js';

const router = express.Router();

router.get('/markets', getMarkets);

export default router