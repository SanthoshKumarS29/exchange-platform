import axios from "axios";

const API_URL = import.meta.env.VITE_SERVERAPI_URL;

export const getUsers = async () => {
    const token = localStorage.getItem("adminToken");
    const response = await axios.get(`${API_URL}/admin/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data;
}

export const approveUser = async(userId) => {
    const token = locatStorage.getItem("adminToken");

    const response = await axios.put(`${API_URL}/admin/users/${userId}/approve`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data;
}