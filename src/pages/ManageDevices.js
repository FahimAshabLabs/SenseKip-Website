
import React, { useState, useEffect } from 'react';
import styles from './ManageDevices.module.css';  // Importing the CSS Module
import { fetchDevices, createDevice, updateDevice, deleteDevice, assignDevice, fetchUsers } from '../services/api';
import Navbar from '../components/Navbar';

const ManageDevices = ({ user }) => {
    const [devices, setDevices] = useState([]);
    const [professionals, setProfessionals] = useState([]);
    const [showInputBox, setShowInputBox] = useState(false);
    const [deviceData, setDeviceData] = useState({ serial_number: '', device_type: '', location: '' });
    const [editingDevice, setEditingDevice] = useState(null);
    const [error, setError] = useState('');
    const [selectedProfessionalId, setSelectedProfessionalId] = useState('');

    useEffect(() => {
        fetchDevicesList();
        fetchProfessionalsList();
    }, []);

    const fetchDevicesList = async () => {
        try {
            const devices = await fetchDevices(user.token);
            setDevices(devices);
        } catch (error) {
            setError('Failed to fetch devices');
        }
    };

    const fetchProfessionalsList = async () => {
        try {
            const users = await fetchUsers(user.token);
            const professionals = users.filter(user => user.role === 'N4');
            setProfessionals(professionals);
        } catch (error) {
            setError('Failed to fetch professionals');
        }
    };

    const handleAddDeviceClick = () => {
        setShowInputBox(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDeviceData({ ...deviceData, [name]: value });
    };

    const handleSaveDevice = async () => {
        try {
            if (editingDevice) {
                await updateDevice(user.token, editingDevice.id, deviceData);
            } else {
                await createDevice(user.token, deviceData);
            }
            setShowInputBox(false);
            setDeviceData({ serial_number: '', device_type: '', location: '' });
            setEditingDevice(null);
            fetchDevicesList();
        } catch (error) {
            setError('Failed to save device');
        }
    };

    const handleEditDevice = (device) => {
        setDeviceData({ serial_number: device.serial_number, device_type: device.device_type, location: device.location });
        setEditingDevice(device);
        setShowInputBox(true);
    };

    const handleDeleteDevice = async (deviceId) => {
        try {
            await deleteDevice(user.token, deviceId);
            fetchDevicesList();
        } catch (error) {
            setError('Failed to delete device');
        }
    };

    const handleAssignDevice = async (deviceId) => {
        try {
            await assignDevice(user.token, deviceId, selectedProfessionalId);
            fetchDevicesList();
        } catch (error) {
            setError('Failed to assign device');
        }
    };

    const getProfessionalName = (professionalId) => {
        const professional = professionals.find(pro => pro.id === professionalId);
        return professional ? `${professional.first_name} ${professional.last_name}` : 'Unassigned';
    };

    return (
        <div className={styles.manageDevicesPage}>  {/* Using styles from CSS Module */}
            <Navbar />
            <div className={styles.manageDevicesContent}>  {/* Using styles from CSS Module */}
                <h2>Manage Devices</h2>
                {error && <p className="error">{error}</p>}

                <button className={styles.addDeviceButton} onClick={handleAddDeviceClick}>Add Device</button>

                {showInputBox && (
                    <div className={styles.inputBox}>
                        <input type="text" name="serial_number" value={deviceData.serial_number} onChange={handleInputChange} placeholder="Enter Serial Number" />
                        <input type="text" name="device_type" value={deviceData.device_type} onChange={handleInputChange} placeholder="Enter Device Type" />
                        <input type="text" name="location" value={deviceData.location} onChange={handleInputChange} placeholder="Enter Location" />
                        <button onClick={handleSaveDevice}>Save</button>
                    </div>
                )}

                <table className={styles.deviceTable}>  {/* Using styles from CSS Module */}
                    <thead>
                        <tr>
                            <th>Serial Number</th>
                            <th>Device Type</th>
                            <th>Location</th>
                            <th>Assigned To</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices.map(device => (
                            <tr key={device.id}>
                                <td>{device.serial_number}</td>
                                <td>{device.device_type}</td>
                                <td>{device.location}</td>
                                <td>{getProfessionalName(device.assigned_to)}</td>
                                <td>
                                    <button className={styles.editButton} onClick={() => handleEditDevice(device)}>Edit</button>
                                    <button className={styles.deleteButton} onClick={() => handleDeleteDevice(device.id)}>Delete</button>
                                    <select className={styles.assignDropdown} value={selectedProfessionalId} onChange={(e) => setSelectedProfessionalId(e.target.value)}>
                                        <option value="">Select Professional</option>
                                        {professionals.map(professional => (
                                            <option key={professional.id} value={professional.id}>
                                                {professional.first_name} {professional.last_name}
                                            </option>
                                        ))}
                                    </select>
                                    <button className={styles.assignButton} onClick={() => handleAssignDevice(device.id)}>Assign</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageDevices;
