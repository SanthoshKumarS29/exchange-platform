import axios from "axios";

const API_URL = import.meta.env.VITE_ADMINAPI_URL;

export const getHomepage = async () => {
  const response = await axios.get(`${API_URL}/homepage`);

  return response.data;
};

export const updateHomepage = async (data) => {
  const token = localStorage.getItem("adminToken")
  const response = await axios.put(`${API_URL}/homepage`, 
    { hero: data }, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );

  return response.data;
}