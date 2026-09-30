import React from 'react'
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('adminToken')
    const expiry = localStorage.getItem("adminSessionExpiry");

    if (!token || !expiry) {
        return <Navigate to="/admin/login" replace />;
    }

    const isExpired = Date.now() >= Number(expiry);

    if (isExpired) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminSessionExpiry");

        return <Navigate to="/admin/login" replace />;
    }

    return children
}

export default AdminProtectedRoute