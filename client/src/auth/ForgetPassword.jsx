import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { forgetPassword } from '../services/server/user/UserApi';

const ForgetPassword = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleSubmit = async(e) => {
        e.preventDefault();
        setError("");

        if(!email.trim()){
            setError("Please enter your email address");
            return;
        }

        try{
            setLoading(true);

            const data =  await forgetPassword({ email: email.trim()});

            if(data.success){
                navigate("/reset-password", {
                    state: {email: data.email},
                })
            };
        } catch (error){
            setError(error.data?.message || "Unable to process your request");
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
                <h1 className="text-center text-3xl font-bold">
                    Forgot Password?
                </h1>

                <p className="mt-2 text-center text-gray-500">
                    Enter your registered email to continue.
                </p>

                {error && (
                    <div className="mt-5 rounded-lg bg-red-100 p-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Email address
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Please wait..." : "Continue"}
                    </button>
                </form>

                <p className="mt-5 text-center text-sm">
                    <a href="/login" className="text-blue-600 hover:underline">
                        Back to Login
                    </a>
                </p>
            </div>
        </div>
  )
}

export default ForgetPassword