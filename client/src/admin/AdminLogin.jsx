import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_ADMINAPI_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");


    try {
      const response = await axios.post(`${API_URL}/admin/login`, formData);
      console.log("Admin login response:", response.data);

      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token);

        const expiresAt = Date.now() + 24 * 60 * 60 * 1000;

        localStorage.setItem('adminSessionExpiry', expiresAt.toString());
        
        console.log("Admin login Successfull");
      }

      navigate('/admin/homepage')

      setFormData({
        email: '',
        password: ''
      })

    } catch {
      console.error("admin login error:", error);
      setError(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Admin Login
          </h1>

          <p className="text-gray-600 mt-2">
            Login to access the Exchange Platform Admin Panel.
          </p>
        </div>

        {error && (
          <div className="mb-5 bg-red-100 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter admin email"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
              autoComplete={formData.password}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin