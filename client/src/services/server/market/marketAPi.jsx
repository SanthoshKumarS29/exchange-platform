import axios from "axios";

const API_URL = import.meta.env.VITE_SERVERAPI_URL;

export const fetchMarkets = async() => {
    const response = await axios.get(`${API_URL}/markets`);
    return response.data; 
}