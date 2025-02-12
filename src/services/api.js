import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; // Update if needed

export const loginUser = async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/accounts/users/login/`, { email, password });
    return response.data;
};

export const fetchUserProfile = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/accounts/users/me/`, {
        headers: { Authorization: `Token ${token}` }
    });
    return response.data;
};

export const fetchUsers = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/accounts/users/`, {
        headers: { Authorization: `Token ${token}` }
    });
    return response.data;
};

export const deleteUser = async (token, userId) => {
    await axios.delete(`${API_BASE_URL}/accounts/users/${userId}/`, {
        headers: { Authorization: `Token ${token}` }
    });
};

export const updateUser = async (token, userId, updatedData) => {
    const response = await axios.put(`${API_BASE_URL}/accounts/users/${userId}/`, updatedData, {
        headers: { Authorization: `Token ${token}` }
    });
    console.log(userId, updatedData);
    return response.data;
};

