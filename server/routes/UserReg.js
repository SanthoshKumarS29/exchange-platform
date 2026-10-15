import express from 'express';
import { loginUser, registerUser, verifyEmail } from '../controller/userController.js';

const router = express.Router();

router.post('/users/register', registerUser);
router.get('/users/verify-email', verifyEmail);
router.post('/users/login', loginUser)

export default router;