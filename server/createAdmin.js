import dotenv from "dotenv";

import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "./models/Admin.js";
import connectDb from "./config/Db.js";

dotenv.config()

const createAdmin = async () => {
    try{
        await connectDb(); // Ensure the database is connected before proceeding

        const existingAdmin = await Admin.findOne({ email: "admin@example.com" });

        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit(0); // Exit the process if admin already exists
        }

        const hashedPassword = await bycrypt.hash("admin@123", 10);
        const admin = await Admin.create({
            name: "Admin",
            email: "admin@example.com",
            password: hashedPassword
        })

        console.log("Admin created successfully");
        console.log("Email:", admin.email);

        process.exit(0); // Exit the process after creating the admin
    } catch (error) {
        console.error("Error creating admin:", error);
        process.exit(1); // Exit the process with an error code
    }
}

createAdmin();