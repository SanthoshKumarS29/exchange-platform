import React from 'react'
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { resetPassword } from '../services/server/user/UserApi';

const ResetPassword = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || "";

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email) {
            setError("Please Start from the forgot password Page");
            return;
        }

        if (newPassword.length > 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            const data = await resetPassword({ email, newPassword, confirmPassword })

            if (data.success) {
                navigate("/login", {
                    state: { message: data.message }
                })
            }

        } catch (error) {
            setError(
                error.data?.message ||
                "Unable to reset password."
            );
        } finally {
            setLoading(false);


        }
    }


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
                <h1 className="text-center text-3xl font-bold">
                    Reset Password
                </h1>

                <p className="mt-2 text-center text-sm text-gray-500">
                    Resetting password for {email || "your account"}
                </p>

                {error && (
                    <div role="alert" className="mt-5 rounded-lg bg-red-100 p-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            New password
                        </label>

                        <input
                            type="password"
                            autoComplete="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Confirm new password
                        </label>

                        <input
                            type="password"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !email}
                        className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Updating..." : "Reset Password"}
                    </button>
                </form>

                <p className="mt-5 text-center text-sm">
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Back to Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default ResetPassword