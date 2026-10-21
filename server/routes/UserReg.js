import express from 'express';
import { forgetPassword, loginUser, registerUser, resetPassword, verifyEmail } from '../controller/userController.js';

const router = express.Router();

router.post('/users/register', registerUser);
router.get('/users/verify-email', verifyEmail);
router.post('/users/login', loginUser);
router.post('/users/forget-password', forgetPassword);
router.post('/users/reset-password', resetPassword)

export default router;