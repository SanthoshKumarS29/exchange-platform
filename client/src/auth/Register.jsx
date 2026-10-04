import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/server/user/UserApi";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            setLoading(true);
            const response = await registerUser(formData);

            if (response.success) {
                setSuccess(response.message);
                setFormData({
                    name: "",
                    email: "",
                    password: ""
                });
                // setTimeout(() => {
                //     navigate("/verify-email");
                // }, 1500);
            }

        } catch (error) {
            setError(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4"> 
            <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8"> 
                <h1 className="text-3xl font-bold text-center"> Create Account </h1> 
                <p className="text-gray-500 text-center mt-2"> Register for the Exchange Platform </p> 
                {error && (
                    <div className="mt-5 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700"> {error} </div>
                )} {success && (
                    <div className="mt-5 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-700"> {success} </div>
                )} 
                <form onSubmit={handleSubmit} className="mt-6 space-y-4" > 
                    <div> 
                        <label className="block text-sm font-medium mb-1"> Name </label> 
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-black" /> 
                    </div> 
                    <div> 
                        <label className="block text-sm font-medium mb-1"> Email </label> 
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-black" /> 
                    </div> 
                    <div> 
                        <label className="block text-sm font-medium mb-1"> Password </label> 
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required minLength={8} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-black" /> 
                    </div> 
                    <button type="submit" disabled={loading} className="w-full rounded-lg bg-black py-3 text-white font-medium hover:bg-gray-800 disabled:opacity-50" > {loading ? "Creating Account..." : "Create Account"} </button> 
                </form> 
                <p className="text-center text-sm text-gray-600 mt-6"> Already have an account?{" "} <Link to="/login" className="font-medium text-black hover:underline" > Login </Link> </p> 
            </div> 
        </div>
    )
}

export default Register