
import React, { Children } from 'react'
import { Navigate } from 'react-router-dom';

const UserProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('userTokenFE');
    const expiry = Number(localStorage.getItem('userSessionExpiryFE'));

    const isValidSession = Boolean(token) && Number.isFinite(expiry) && expiry > Date.now();
    if(!isValidSession){
        localStorage.removeItem('userTokenFE');
        localStorage.removeItem('userSessionExpiryFE');
        localStorage.removeItem('userData');

        return <Navigate to = '/login' replace />
    }

  return (
    children
  )
}

export default UserProtectedRoute