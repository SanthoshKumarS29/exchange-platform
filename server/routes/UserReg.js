import express from 'express';
import { registerUser, verifyEmail } from '../controller/userController.js';

const router = express.Router();

router.post('/users/register', registerUser);
router.get('/users/verify-email', verifyEmail);

export default router;