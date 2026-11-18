import axios from "axios";

const API_URL = import.meta.env.VITE_SERVERAPI_URL;

const getAuthConfig = () => {
  const token = localStorage.getItem("userTokenFE"); // Update key name if different
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};


export const createOrderApi = async(orderData) => {
    const response = await axios.post(`${API_URL}/orders`, orderData, getAuthConfig());
    return response.data; 
}

export const getOrderApi = async() => {
    const response = await axios.post(`${API_URL}/orders/my-orders`, getAuthConfig());
    return response.data; 
}