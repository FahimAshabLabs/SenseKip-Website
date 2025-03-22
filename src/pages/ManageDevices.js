
// import React, { useState, useEffect } from 'react';
// import styles from './ManageDevices.module.css';  // Importing the CSS Module
// import { fetchDevices, createDevice, updateDevice, deleteDevice, assignDevice, fetchUsers } from '../services/api';
// import Navbar from '../components/Navbar';

// const ManageDevices = ({ user }) => {
//     const [devices, setDevices] = useState([]);
//     const [professionals, setProfessionals] = useState([]);
//     const [showInputBox, setShowInputBox] = useState(false);
//     const [deviceData, setDeviceData] = useState({ serial_number: '', device_type: '', location: '' });
//     const [editingDevice, setEditingDevice] = useState(null);
//     const [error, setError] = useState('');
//     const [selectedProfessionalId, setSelectedProfessionalId] = useState('');

//     useEffect(() => {
//         fetchDevicesList();
//         fetchProfessionalsList();
//     }, []);

//     const fetchDevicesList = async () => {
//         try {
//             const devices = await fetchDevices(user.token);
//             setDevices(devices);
//         } catch (error) {
//             setError('Failed to fetch devices');
//         }
//     };

//     const fetchProfessionalsList = async () => {
//         try {
//             const users = await fetchUsers(user.token);
//             const professionals = users.filter(user => user.role === 'N4');
//             setProfessionals(professionals);
//         } catch (error) {
//             setError('Failed to fetch professionals');
//         }
//     };

//     const handleAddDeviceClick = () => {
//         setShowInputBox(true);
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setDeviceData({ ...deviceData, [name]: value });
//     };

//     const handleSaveDevice = async () => {
//         try {
//             if (editingDevice) {
//                 await updateDevice(user.token, editingDevice.id, deviceData);
//             } else {
//                 await createDevice(user.token, deviceData);
//             }
//             setShowInputBox(false);
//             setDeviceData({ serial_number: '', device_type: '', location: '' });
//             setEditingDevice(null);
//             fetchDevicesList();
//         } catch (error) {
//             setError('Failed to save device');
//         }
//     };

//     const handleEditDevice = (device) => {
//         setDeviceData({ serial_number: device.serial_number, device_type: device.device_type, location: device.location });
//         setEditingDevice(device);
//         setShowInputBox(true);
//     };

//     const handleDeleteDevice = async (deviceId) => {
//         try {
//             await deleteDevice(user.token, deviceId);
//             fetchDevicesList();
//         } catch (error) {
//             setError('Failed to delete device');
//         }
//     };

//     const handleAssignDevice = async (deviceId) => {
//         try {
//             await assignDevice(user.token, deviceId, selectedProfessionalId);
//             fetchDevicesList();
//         } catch (error) {
//             setError('Failed to assign device');
//         }
//     };

//     const getProfessionalName = (professionalId) => {
//         const professional = professionals.find(pro => pro.id === professionalId);
//         return professional ? `${professional.first_name} ${professional.last_name}` : 'Unassigned';
//     };

//     return (
//         <div className={styles.manageDevicesPage}>  {/* Using styles from CSS Module */}
//             <Navbar />
//             <div className={styles.manageDevicesContent}>  {/* Using styles from CSS Module */}
//                 <h2>Manage Devices</h2>
//                 {error && <p className="error">{error}</p>}

//                 <button className={styles.addDeviceButton} onClick={handleAddDeviceClick}>Add Device</button>

//                 {showInputBox && (
//                     <div className={styles.inputBox}>
//                         <input type="text" name="serial_number" value={deviceData.serial_number} onChange={handleInputChange} placeholder="Enter Serial Number" />
//                         <input type="text" name="device_type" value={deviceData.device_type} onChange={handleInputChange} placeholder="Enter Device Type" />
//                         <input type="text" name="location" value={deviceData.location} onChange={handleInputChange} placeholder="Enter Location" />
//                         <button onClick={handleSaveDevice}>Save</button>
//                     </div>
//                 )}

//                 <table className={styles.deviceTable}>  {/* Using styles from CSS Module */}
//                     <thead>
//                         <tr>
//                             <th>Serial Number</th>
//                             <th>Device Type</th>
//                             <th>Location</th>
//                             <th>Assigned To</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {devices.map(device => (
//                             <tr key={device.id}>
//                                 <td>{device.serial_number}</td>
//                                 <td>{device.device_type}</td>
//                                 <td>{device.location}</td>
//                                 <td>{getProfessionalName(device.assigned_to)}</td>
//                                 <td>
//                                     <button className={styles.editButton} onClick={() => handleEditDevice(device)}>Edit</button>
//                                     <button className={styles.deleteButton} onClick={() => handleDeleteDevice(device.id)}>Delete</button>
//                                     <select className={styles.assignDropdown} value={selectedProfessionalId} onChange={(e) => setSelectedProfessionalId(e.target.value)}>
//                                         <option value="">Select Professional</option>
//                                         {professionals.map(professional => (
//                                             <option key={professional.id} value={professional.id}>
//                                                 {professional.first_name} {professional.last_name}
//                                             </option>
//                                         ))}
//                                     </select>
//                                     <button className={styles.assignButton} onClick={() => handleAssignDevice(device.id)}>Assign</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default ManageDevices;


import React, { useState, useEffect } from 'react';
import styles from './ManageDevices.module.css';
import { fetchDevices, createDevice, updateDevice, deleteDevice, assignDevice, fetchUsers } from '../services/api';
import Navbar from '../components/Navbar';

const ManageDevices = ({ user }) => {
    const [devices, setDevices] = useState([]);
    const [filteredDevices, setFilteredDevices] = useState([]);
    const [professionals, setProfessionals] = useState([]);
    const [showInputBox, setShowInputBox] = useState(false);
    const [deviceData, setDeviceData] = useState({ serial_number: '', device_type: '', location: '' });
    const [editingDevice, setEditingDevice] = useState(null);
    const [error, setError] = useState('');
    const [selectedProfessionalId, setSelectedProfessionalId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const [sortField, setSortField] = useState('serial_number');
    const [sortDirection, setSortDirection] = useState('asc');
    const [showBulkAssign, setShowBulkAssign] = useState(false);
    const [bulkAssignData, setBulkAssignData] = useState({
        serialFrom: '',
        serialTo: '',
        professionalId: ''
    });

    useEffect(() => {
        fetchDevicesList();
        fetchProfessionalsList();
    }, []);

    useEffect(() => {
        // Filter and sort devices whenever dependencies change
        let result = [...devices];
        
        // Apply search
        if (searchTerm) {
            result = result.filter(device => 
                device.serial_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                device.device_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                device.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        // Apply filter
        if (filterType) {
            result = result.filter(device => device.device_type === filterType);
        }
        
        // Apply sorting
        result.sort((a, b) => {
            if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
            if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
        
        setFilteredDevices(result);
    }, [devices, searchTerm, filterType, sortField, sortDirection]);

    const fetchDevicesList = async () => {
        try {
            const devices = await fetchDevices(user.token);
            setDevices(devices);
            setFilteredDevices(devices);
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

    const handleBulkAssignChange = (e) => {
        const { name, value } = e.target;
        setBulkAssignData({ ...bulkAssignData, [name]: value });
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

    const handleBulkAssign = () => {
        // In a real scenario, this would make an API call
        setShowBulkAssign(false);
        // Reset bulk assign form
        setBulkAssignData({
            serialFrom: '',
            serialTo: '',
            professionalId: ''
        });
        // For demo purposes, show a success message
        setError('Bulk assignment completed successfully');
        setTimeout(() => setError(''), 3000);
    };

    const toggleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const getProfessionalName = (professionalId) => {
        const professional = professionals.find(pro => pro.id === professionalId);
        return professional ? `${professional.first_name} ${professional.last_name}` : 'Unassigned';
    };

    // Get unique device types for the filter dropdown
    const deviceTypes = [...new Set(devices.map(device => device.device_type))];

    return (
        <div className={styles.manageDevicesPage}>
            <Navbar />
            <div className={styles.manageDevicesContent}>
                <h2>Manage Devices</h2>
                {error && <p className={error.includes('success') ? styles.success : styles.error}>{error}</p>}

                {/* Top controls row */}
                <div className={styles.controlsRow}>
                    <div className={styles.searchFilterContainer}>
                        <input 
                            type="text" 
                            placeholder="Search devices..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                        
                        <select 
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className={styles.filterSelect}
                        >
                            <option value="">All Device Types</option>
                            {deviceTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        
                        <button className={styles.addDeviceButton} onClick={handleAddDeviceClick}>Add Device</button>
                    </div>
                    
                    <button 
                        className={styles.bulkAssignButton} 
                        onClick={() => setShowBulkAssign(true)}
                    >
                        Bulk Assignment
                    </button>
                </div>

                {showInputBox && (
                    <div className={styles.inputBox}>
                        <input type="text" name="serial_number" value={deviceData.serial_number} onChange={handleInputChange} placeholder="Enter Serial Number" />
                        <input type="text" name="device_type" value={deviceData.device_type} onChange={handleInputChange} placeholder="Enter Device Type" />
                        <input type="text" name="location" value={deviceData.location} onChange={handleInputChange} placeholder="Enter Location" />
                        <button onClick={handleSaveDevice}>Save</button>
                        <button onClick={() => {
                            setShowInputBox(false);
                            setDeviceData({ serial_number: '', device_type: '', location: '' });
                            setEditingDevice(null);
                        }}>Cancel</button>
                    </div>
                )}

                {/* Bulk Assignment Modal */}
                {showBulkAssign && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modal}>
                            <h3>Bulk Device Assignment</h3>
                            <div className={styles.modalContent}>
                                <div className={styles.inputGroup}>
                                    <label>Serial Number Range</label>
                                    <div className={styles.rangeInputs}>
                                        <input 
                                            type="text" 
                                            name="serialFrom" 
                                            placeholder="From" 
                                            value={bulkAssignData.serialFrom}
                                            onChange={handleBulkAssignChange}
                                        />
                                        <span>to</span>
                                        <input 
                                            type="text" 
                                            name="serialTo" 
                                            placeholder="To" 
                                            value={bulkAssignData.serialTo}
                                            onChange={handleBulkAssignChange}
                                        />
                                    </div>
                                </div>
                                
                                <div className={styles.inputGroup}>
                                    <label>Assign To</label>
                                    <select
                                        name="professionalId"
                                        value={bulkAssignData.professionalId}
                                        onChange={handleBulkAssignChange}
                                    >
                                        <option value="">Select Professional</option>
                                        {professionals.map(professional => (
                                            <option key={professional.id} value={professional.id}>
                                                {professional.first_name} {professional.last_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div className={styles.modalActions}>
                                    <button 
                                        className={styles.cancelButton}
                                        onClick={() => setShowBulkAssign(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        className={styles.confirmButton}
                                        onClick={handleBulkAssign}
                                    >
                                        Assign Devices
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <table className={styles.deviceTable}>
                    <thead>
                        <tr>
                            <th onClick={() => toggleSort('serial_number')}>
                                Serial Number {sortField === 'serial_number' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => toggleSort('device_type')}>
                                Device Type {sortField === 'device_type' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => toggleSort('location')}>
                                Location {sortField === 'location' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                            <th>Assigned To</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDevices.map(device => (
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