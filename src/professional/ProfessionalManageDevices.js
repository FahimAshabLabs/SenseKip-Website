import React, { useState, useEffect } from 'react';

import styles from './ProfessionalManageDevices.module.css';  // ✅ Import Fixed CSS
import { fetchDevices } from '../services/api';
import { Link, useNavigate } from "react-router-dom";
import ProfessionalNavbar from '../components/ProfessionalNavbar';

const ProfessionalManageDevices = ({ user }) => {
    const [devices, setDevices] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchDevicesList();
    }, []);

    const fetchDevicesList = async () => {
        try {
            const devices = await fetchDevices(user.token);
            setDevices(devices);
        } catch (error) {
            setError('Failed to fetch devices');
        }
    };
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
      };

    return (
        <div className={styles.proContainer}> {/* ✅ Wrap Everything Inside a Container */}

            
            <ProfessionalNavbar onLogout={handleLogout} />

            {/* ✅ Device Content Section */}
            <div className={styles.devicesContent}>  
                <h2>My Assigned Devices</h2>
                {error && <p className={styles.error}>{error}</p>}

                <table className={styles.deviceTable}>  
                    <thead>
                        <tr>
                            <th>Serial Number</th>
                            <th>Device Type</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices.map(device => (
                            <tr key={device.id}>
                                <td>{device.serial_number}</td>
                                <td>{device.device_type}</td>
                                <td>{device.location}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProfessionalManageDevices;
