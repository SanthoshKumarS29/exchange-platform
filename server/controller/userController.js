import User from '../models/Users.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // check Password length
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        //check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const emailVerificationToken = crypto.randomBytes(32).toString('hex');

        // create new user
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            emailVerificationToken: emailVerificationToken,
            emailVerificationExpires: Date.now() + 3600000, // 1 hour

        });
        res.status(201).json({ success: true, message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const verifyEmail = async (req, res) => {
    try{
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({success: false, message: 'Verification token is required' });
        }

        const user = await User.findOne({
            emailVerificationToken: token,
            emailVerificationExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({success: false, message: 'Invalid or expired verification token' });
        }

        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;
        await user.save();

        res.status(200).json({success: true, message: 'Email verified successfully' });
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ message: 'Server error' });
    }
}