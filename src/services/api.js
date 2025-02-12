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
