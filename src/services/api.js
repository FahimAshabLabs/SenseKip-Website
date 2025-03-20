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


export const createUser = async (token, userData) => {
    console.log("Sending user data:", userData); // Debugging step ✅

    try {
        const response = await axios.post(`${API_BASE_URL}/accounts/users/`, userData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        });

        console.log("Response:", response.data); // Debugging step ✅

        if (response.status !== 201) {
            throw new Error('Failed to create user');
        }

        return response.data;
    } catch (error) {
        console.error('Error creating user:', error.response?.data || error.message);
        throw error;
    }
};


export const fetchDevices = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/dev/devices/`, {
        headers: { Authorization: `Token ${token}` }
    });
    return response.data;
};

export const createDevice = async (token, deviceData) => {
    const response = await axios.post(`${API_BASE_URL}/dev/devices/`, deviceData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });
    return response.data;
};

export const updateDevice = async (token, deviceId, updatedData) => {
    const response = await axios.put(`${API_BASE_URL}/dev/devices/${deviceId}/`, updatedData, {
        headers: { Authorization: `Token ${token}` }
    });
    return response.data;
};

export const deleteDevice = async (token, deviceId) => {
    await axios.delete(`${API_BASE_URL}/dev/devices/${deviceId}/`, {
        headers: { Authorization: `Token ${token}` }
    });
};

export const assignDevice = async (token, deviceId, professionalId) => {
    const response = await axios.post(`${API_BASE_URL}/dev/devices/${deviceId}/assign/`, 
        { professional_id: professionalId },
        { headers: { Authorization: `Token ${token}` } }
    );
    return response.data;
};


export const fetchInfluxData = async (token, deviceSerials) => {
    try {
        console.log("Sending request to InfluxDB with serials:", deviceSerials);

        const response = await axios.post(`${API_BASE_URL}/influx/get_device_data`, 
            { deviceSerials }, // Ensure it's sent as an array inside an object
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log("InfluxDB Response:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching InfluxDB data:', error);
        throw error;
    }
};
