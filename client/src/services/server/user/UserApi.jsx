import axios from 'axios';

const API_URL = import.meta.env.VITE_SERVERAPI_URL;

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
}