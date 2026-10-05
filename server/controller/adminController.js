import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import bycrypt from 'bcryptjs';
import User from '../models/Users.js';

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

// Get all Registered Users
export const getUsers = async (req, res) => {
    try{
        const users = await User.find() .select("-password -emailVerificationToken -emailVerificationExpires") .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            users: users,
        });
            
    } catch(error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const approvedUser = async(req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if(!user.isEmailVerified){
            return res.status(400).json({
                success: false,
                message: "User email is not verified",
            })
        }

        if(user.status === "approved"){
            return res.status(400).json({
                success: false,
                message: "User is already approved",
            });
        }

        user.status = "approved";
        await user.save();

        res.status(200).json({
            success: true,
            message: "User approved successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                status: user.status,
            },
        })

    } catch(error) {
        console.error("Error approving user:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}