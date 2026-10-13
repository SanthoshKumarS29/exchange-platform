import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
    const navigate = useNavigate();

    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleVerifyEmail = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!token) {
            setError("Please enter the verification token.");
            return;
        }

        try {
            setLoading(true);
            console.log('hello wrols')

            const API_URL = import.meta.env.VITE_SERVERAPI_URL;

            console.log(API_URL)

            const response = await axios.get(`${API_URL}/users/verify-email`,{
                                params: {
                                    token: token.trim()
                                }
                            });
            if (response.data.message) {
                setSuccess(response.data.message);
                setToken("");

                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Email verification failed. Please try again."
            );
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">

                <h1 className="text-center text-3xl font-bold">
                    Verify Your Email
                </h1>

                <p className="mt-2 text-center text-gray-500">
                    Enter the verification token to verify your email address.
                </p>

                {error && (
                    <div className="mt-5 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mt-5 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-700">
                        {success}
                    </div>
                )}

                <form
                    onSubmit={handleVerifyEmail}
                    className="mt-6 space-y-4"
                >
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Verification Token
                        </label>

                        <input
                            type="text"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            placeholder="Enter verification token"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-black"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-black py-3 font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                    >
                        {loading ? "Verifying..." : "Verify Email"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    After verification, your account will need admin approval.
                </p>

            </div>
        </div>
    );
}

export default VerifyEmail;