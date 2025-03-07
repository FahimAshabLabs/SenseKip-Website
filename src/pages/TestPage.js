import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchDevices, fetchInfluxData } from '../services/api';
import './TestPage.css';
import Navbar from '../components/Navbar';

const ManageDevices2 = ({ user }) => {
    const [devices, setDevices] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        loadDeviceData();
    }, [user]);

    const loadDeviceData = async () => {
        try {
            console.log("Fetching device serials...");
            const deviceList = await fetchDevices(user.token);
            const deviceSerials = deviceList.map(device => device.serial_number);
            console.log("Device serials:", deviceSerials);

            const data = await fetchInfluxData(user.token, deviceSerials);
            console.log("Fetched device data:", data);
            setDevices(Object.entries(data));
        } catch (error) {
            console.error('Error fetching device data:', error);
            setError('Failed to load device data.');
        }
    };

    return (
        <div className="manage-devices-container">
            <Navbar />
            <div className="content">
                <h2>Live Data</h2>
                {error && <p className="error">{error}</p>}
                <table>
                    <thead>
                        <tr>
                            <th>Serial Number</th>
                            <th colSpan="3">Sensor 1 (psi)</th>
                            <th colSpan="3">Sensor 2 (psi)</th>
                            <th>Dashboard</th>
                        </tr>
                        <tr className="sub-header">
                            <th></th>
                            <th>Reading</th>
                            <th>Parameters</th>
                            <th>Status</th>
                            <th>Reading</th>
                            <th>Parameters</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices.map(([serial, device]) => (
                            <tr key={serial}>
                                <td>{serial}</td>
                                <td>{device.sensor1}</td>
                                <td>{`On: ${device.relay1.switchOnPoint}, Off: ${device.relay1.switchOffPoint}`}</td>
                                <td>{device.relay1.state ? 'On' : 'Off'}</td>
                                <td>{device.sensor2}</td>
                                <td>{`On: ${device.relay2.switchOnPoint}, Off: ${device.relay2.switchOffPoint}`}</td>
                                <td>{device.relay2.state ? 'On' : 'Off'}</td>
                                <td>
                                    <button onClick={() => navigate(`/dashboard/${serial}`)}>View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageDevices2;
