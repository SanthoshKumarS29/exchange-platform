import React, { useState } from 'react'
import { loginUser } from '../services/server/user/UserApi';

const UserLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }))
        if (error) setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess("");

        const email = formData.email.trim();

        if (!email || !formData.password) {
            setError('Please enter your email and password');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        
        try{
            setLoading(true);
            const response = await loginUser(formData);
            if(response.success){
                setSuccess(response.message);
                setFormData({
                    email: '',
                    password: ''
                })
                alert('sucees')
            }
        } catch(error){
            setError(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl sm:p-10">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white">
                        A
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Welcome back
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Sign in to your Admin Panel
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Email address
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Password
                        </label>

                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-20 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((value) => !value)}
                                className="absolute inset-y-0 right-3 text-sm font-medium text-blue-600 hover:text-blue-800"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div
                            role="alert"
                            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                        >
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-500">
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="font-semibold text-blue-600 hover:text-blue-800"
                    >
                        Create an account
                    </a>
                </p>
            </div>
        </div>
    )
}

export default UserLogin