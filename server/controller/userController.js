import User from '../models/Users.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken'

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


export const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({ success: false, message: "Email and password are required"})
        }

        const user = await User.findOne({
            email: email.toLowerCase().trim(),
        })

        if (!user) {
            return res.status(401).json({ success: false, messafe: "user is not registered"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return res.status(401).json({ success: false, message: "Invalid password"})
        }

        if (!user.isEmailVerified){
            return res.status(403).json({ success: false, message: "Please verify your email before logging in", code: "EMAIL_NOT_VERIFIED"})
        }

        if(user.status !== "approved"){
            return res.status(403).json({ success: false, message: user.status === "rejected" ? "Your account has beed rejected":" your accout is waiting for admin approval", code: "ACCOUNT_NOT_APPROVED"})
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email,
            role: "user",
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d"})

        return res.status(200).json({
            success: true, message: "Login Successfull", token, user: {
                id: user._id,
                name: user.name,
                email: user.email,
                status: user.status,
                isEmailVerified: user.isEmailVerified,
            }
        })
    } catch (error){
        console.error("Error during user login:", error);
        return res.status(500).json({ success: false, message: "Internal server error"})
    }
}

export const forgetPassword = async (req,res) => {
    try{
        const { email } = req.body;

        if(!email || !email.trim()){
            return res.status(400).json({
                success: false,
                message: "Please provide your email address",
            })
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase(),
        });

        if(!user){
            return res.status(404).json({
                success: false,
                message: "No account found with this email",
            })
        };

        return res.status(200).json({
            success: true,
            message: "Email verified for this demo, You can reset your password",
            email: user.email
        })
    }catch(error){
        console.error("forget password error", error);
        return res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}

export const resetPassword = async (req,res) => {
    try{
        const { email, newPassword, confirmPassword} = req.body;

        if (!email || !newPassword || !confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            })
        }

        if(newPassword.length > 6){
            return res.status(400).json({
                success: false,
                message: "password must be at least 6 character long"
            })
        }

        if(newPassword !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "passwords do not match"
            })
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase(),
        })

        if(!use){
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully. please login in"
        })
    } catch(error){
        console.error("Reset password error:", error);

        return res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}