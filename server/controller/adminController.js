import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import bycrypt from 'bcryptjs';

export const loginAdmin = async (req, res) => {
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const admin = await Admin.findOne({ email: email.toLowerCase() });

        if(!admin){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Compare entered password with hashed password
        const isPasswordValid = await bycrypt.compare(password, admin.password);

        if(!isPasswordValid){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Generate JWT token
        const token = jwt.sign({
            id: admin._id,
            email: admin.email,
        }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            success: true,
            message: "Login successful",
            token: token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
            },
        })

    }catch (error) {
        console.error("Error during admin login:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}
