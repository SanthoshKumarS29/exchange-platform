import axios from 'axios';

const API_URL = import.meta.env.VITE_SERVERAPI_URL;

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
}

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/users/login`, userData);
    return response.data
}

export const forgetPassword = async (userData) => {
    const response = await axios.post(`${API_URL}/users/forget-password`, userData);
    return response.data
}

export const resetPassword = async (userData) => {
    const response = await axios.post(`${API_URL}/users/reset-password`, userData);
    return response.data;
}