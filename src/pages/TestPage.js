// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { fetchDevices, fetchInfluxData } from '../services/api';
// import Navbar from '../components/Navbar';
// import styles from './TestPage.module.css';  // Import the CSS module

// import { FaThermometerHalf } from "react-icons/fa";

// import { MdDashboard } from "react-icons/md";
// import { MdOutlineScreenshotMonitor } from "react-icons/md";
// import { IoSquareSharp } from "react-icons/io5";

// const ManageDevices2 = ({ user }) => {
//     const [devices, setDevices] = useState([]);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!user) {
//             navigate('/login');
//             return;
//         }
//         loadDeviceData();
//     }, [user]);

//     const loadDeviceData = async () => {
//         try {
//             console.log("Fetching device serials...");
//             const deviceList = await fetchDevices(user.token);
//             const deviceSerials = deviceList.map(device => device.serial_number);
//             console.log("Device serials:", deviceSerials);

//             const data = await fetchInfluxData(user.token, deviceSerials);
//             console.log("Fetched device data:", data);
//             setDevices(Object.entries(data));
//         } catch (error) {
//             console.error('Error fetching device data:', error);
//             setError('Failed to load device data.');
//         }
//     };

//     return (
//         <div className={styles.manageDevicesContainer}>
//             <Navbar />
//             <div className={styles.content}>
//                 <h2>Live Data</h2>
//                 {error && <p className={styles.error}>{error}</p>}
//                 <table>
//                     <thead>
//                         <tr>
//                             <th rowSpan="2">Serial Number</th>
//                             <th colSpan="3">Sensor 1 (psi)</th>
//                             <th colSpan="3">Sensor 2 (psi)</th>
//                             <th rowSpan="2">Dashboard</th>
//                         </tr>
//                         <tr className={styles.subHeader}>
                          
//                             <th>Reading</th>
//                             <th>Parameters</th>
//                             <th>Status</th>
//                             <th>Reading</th>
//                             <th>Parameters</th>
//                             <th>Status</th>
                         
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {devices.map(([serial, device]) => (
//                             <tr key={serial} className={styles.deviceRow}>
//                                 <td>{serial}</td>
//                                 <td>{device.sensor1}</td>
//                                 <td>{`On: ${device.relay1.switchOnPoint}, Off: ${device.relay1.switchOffPoint}`}</td>
//                                 <td>{device.relay1.state ? <IoSquareSharp color="red" size={24} /> : <IoSquareSharp color="green" size={24} />}</td>
//                                 {/* <td>{device.relay1.state ? 'On' : 'Off'}</td> */}
//                                 <td>{device.sensor2}</td>
//                                 <td>{`On: ${device.relay2.switchOnPoint}, Off: ${device.relay2.switchOffPoint}`}</td>
//                                 {/* <td>{device.relay2.state ? 'On' : 'Off'}</td> */}
//                                 <td>{device.relay1.state ? <IoSquareSharp color="red" size={24} /> : <IoSquareSharp color="green" size={24} />}</td>
//                                 {/* <td>
//                                     <button className={styles.viewButton} onClick={() => navigate(`/dashboard/${serial}`)}>View</button>
//                                 </td> */}
//                                 <td>
//                                         <button onClick={() => navigate(`/dashboard/${serial}`)} className={styles.iconButton}>
//                                                     <MdOutlineScreenshotMonitor color="black" size={30} />
//                                         </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default ManageDevices2;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { fetchDevices, fetchInfluxData } from '../services/api';
// import Navbar from '../components/Navbar';
// import styles from './TestPage.module.css';

// // Icons
// import { FaThermometerHalf, FaSearch, FaSyncAlt, FaFilter } from "react-icons/fa";
// import { MdDashboard, MdOutlineScreenshotMonitor, MdNotifications } from "react-icons/md";
// import { IoSquareSharp } from "react-icons/io5";
// import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";

// const ManageDevices2 = ({ user }) => {
//     const [devices, setDevices] = useState([]);
//     const [filteredDevices, setFilteredDevices] = useState([]);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [sortConfig, setSortConfig] = useState({ key: 'serial', direction: 'ascending' });
//     const [showFilters, setShowFilters] = useState(false);
//     const [filterStatus, setFilterStatus] = useState('all');
//     const [autoRefresh, setAutoRefresh] = useState(false);
//     const [lastUpdated, setLastUpdated] = useState(new Date());
    
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!user) {
//             navigate('/login');
//             return;
//         }
//         loadDeviceData();
        
//         // Set up auto-refresh interval if enabled
//         let refreshInterval;
//         if (autoRefresh) {
//             refreshInterval = setInterval(() => {
//                 loadDeviceData();
//             }, 30000); // Refresh every 30 seconds
//         }
        
//         return () => {
//             if (refreshInterval) clearInterval(refreshInterval);
//         };
//     }, [user, autoRefresh]);

//     // Filter and sort devices when dependencies change
//     useEffect(() => {
//         if (devices.length === 0) return;
        
//         let result = [...devices];
        
//         // Apply search filter
//         if (searchTerm) {
//             result = result.filter(([serial]) => 
//                 serial.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }
        
//         // Apply status filter
//         if (filterStatus !== 'all') {
//             result = result.filter(([_, device]) => {
//                 if (filterStatus === 'on') {
//                     return device.relay1.state || device.relay2.state;
//                 } else if (filterStatus === 'off') {
//                     return !device.relay1.state && !device.relay2.state;
//                 }
//                 return true;
//             });
//         }
        
//         // Apply sorting
//         if (sortConfig.key) {
//             result.sort((a, b) => {
//                 if (sortConfig.key === 'serial') {
//                     return sortConfig.direction === 'ascending' 
//                         ? a[0].localeCompare(b[0])
//                         : b[0].localeCompare(a[0]);
//                 } else if (sortConfig.key === 'sensor1') {
//                     return sortConfig.direction === 'ascending' 
//                         ? a[1].sensor1 - b[1].sensor1
//                         : b[1].sensor1 - a[1].sensor1;
//                 } else if (sortConfig.key === 'sensor2') {
//                     return sortConfig.direction === 'ascending' 
//                         ? a[1].sensor2 - b[1].sensor2
//                         : b[1].sensor2 - a[1].sensor2;
//                 }
//                 return 0;
//             });
//         }
        
//         setFilteredDevices(result);
//     }, [devices, searchTerm, sortConfig, filterStatus]);

//     const loadDeviceData = async () => {
//         try {
//             setLoading(true);
//             console.log("Fetching device serials...");
//             const deviceList = await fetchDevices(user.token);
//             const deviceSerials = deviceList.map(device => device.serial_number);
//             console.log("Device serials:", deviceSerials);

//             const data = await fetchInfluxData(user.token, deviceSerials);
//             console.log("Fetched device data:", data);
//             setDevices(Object.entries(data));
//             setLastUpdated(new Date());
//         } catch (error) {
//             console.error('Error fetching device data:', error);
//             setError('Failed to load device data.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const requestSort = (key) => {
//         let direction = 'ascending';
//         if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//             direction = 'descending';
//         }
//         setSortConfig({ key, direction });
//     };

//     const getSortIcon = (columnName) => {
//         if (sortConfig.key !== columnName) return null;
//         return sortConfig.direction === 'ascending' ? 
//             <BiSolidUpArrow className={styles.sortIcon} /> : 
//             <BiSolidDownArrow className={styles.sortIcon} />;
//     };

//     const getStatusClass = (relay) => {
//         return relay.state ? styles.statusOn : styles.statusOff;
//     };

//     const formatTime = (date) => {
//         return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
//     };

//     return (
//         <div className={styles.manageDevicesContainer}>
//             <Navbar />
//             <div className={styles.content}>
//                 <div className={styles.pageHeader}>
//                     <h2>Live Device Data</h2>
//                     <div className={styles.controlsWrapper}>
//                         <div className={styles.searchContainer}>
//                             <FaSearch className={styles.searchIcon} />
//                             <input 
//                                 type="text" 
//                                 placeholder="Search by serial number..." 
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 className={styles.searchInput}
//                             />
//                         </div>
                        
//                         <div className={styles.actionButtons}>
//                             <button 
//                                 className={`${styles.controlButton} ${showFilters ? styles.active : ''}`} 
//                                 onClick={() => setShowFilters(!showFilters)}
//                                 title="Toggle Filters"
//                             >
//                                 <FaFilter />
//                             </button>
                            
//                             <button 
//                                 className={`${styles.controlButton} ${autoRefresh ? styles.active : ''}`} 
//                                 onClick={() => setAutoRefresh(!autoRefresh)}
//                                 title={autoRefresh ? "Auto-refresh on" : "Auto-refresh off"}
//                             >
//                                 <FaSyncAlt className={autoRefresh ? styles.spinning : ''} />
//                             </button>
                            
//                             <button 
//                                 className={styles.controlButton} 
//                                 onClick={loadDeviceData}
//                                 title="Refresh data"
//                             >
//                                 <FaSyncAlt />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
                
//                 {showFilters && (
//                     <div className={styles.filtersContainer}>
//                         <div className={styles.filterGroup}>
//                             <label>Status Filter:</label>
//                             <select 
//                                 value={filterStatus} 
//                                 onChange={(e) => setFilterStatus(e.target.value)}
//                                 className={styles.filterSelect}
//                             >
//                                 <option value="all">All Statuses</option>
//                                 <option value="on">At least one relay ON</option>
//                                 <option value="off">All relays OFF</option>
//                             </select>
//                         </div>
                        
//                         <div className={styles.lastUpdated}>
//                             Last updated: {formatTime(lastUpdated)}
//                         </div>
//                     </div>
//                 )}
                
//                 {error && <div className={styles.errorMessage}>{error}</div>}
                
//                 {loading ? (
//                     <div className={styles.loadingContainer}>
//                         <div className={styles.loadingSpinner}></div>
//                         <p>Loading device data...</p>
//                     </div>
//                 ) : (
//                     <div className={styles.tableContainer}>
//                         <table className={styles.dataTable}>
//                             <thead>
//                                 <tr>
//                                     <th 
//                                         className={styles.sortableHeader} 
//                                         onClick={() => requestSort('serial')}
//                                         rowSpan="2"
//                                     >
//                                         Serial Number {getSortIcon('serial')}
//                                     </th>
//                                     <th colSpan="3" className={styles.groupHeader}>Sensor 1 (psi)</th>
//                                     <th colSpan="3" className={styles.groupHeader}>Sensor 2 (psi)</th>
//                                     <th rowSpan="2" className={styles.actionHeader}>Dashboard</th>
//                                 </tr>
//                                 <tr className={styles.subHeader}>
//                                     <th></th>
//                                     <th 
//                                         className={styles.sortableHeader} 
//                                         onClick={() => requestSort('sensor1')}
//                                     >
//                                         Reading {getSortIcon('sensor1')}
//                                     </th>
//                                     <th>Parameters</th>
//                                     <th>Status</th>
//                                     <th 
//                                         className={styles.sortableHeader} 
//                                         onClick={() => requestSort('sensor2')}
//                                     >
//                                         Reading {getSortIcon('sensor2')}
//                                     </th>
//                                     <th>Parameters</th>
//                                     <th>Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredDevices.length > 0 ? (
//                                     filteredDevices.map(([serial, device]) => (
//                                         <tr key={serial} className={styles.deviceRow}>
//                                             <td className={styles.serialColumn}>{serial}</td>
//                                             <td className={styles.readingCell}>
//                                                 <div className={styles.sensorReading}>
//                                                     <FaThermometerHalf className={styles.sensorIcon} />
//                                                     <span>{device.sensor1}</span>
//                                                 </div>
//                                             </td>
//                                             <td className={styles.parametersCell}>
//                                                 <div className={styles.parameterValue}>
//                                                     <span className={styles.paramLabel}>On:</span> {device.relay1.switchOnPoint}
//                                                 </div>
//                                                 <div className={styles.parameterValue}>
//                                                     <span className={styles.paramLabel}>Off:</span> {device.relay1.switchOffPoint}
//                                                 </div>
//                                             </td>
//                                             <td className={styles.statusCell}>
//                                                 <div className={getStatusClass(device.relay1)}>
//                                                     <IoSquareSharp size={24} />
//                                                     <span className={styles.statusText}>
//                                                         {device.relay1.state ? 'ON' : 'OFF'}
//                                                     </span>
//                                                 </div>
//                                             </td>
//                                             <td className={styles.readingCell}>
//                                                 <div className={styles.sensorReading}>
//                                                     <FaThermometerHalf className={styles.sensorIcon} />
//                                                     <span>{device.sensor2}</span>
//                                                 </div>
//                                             </td>
//                                             <td className={styles.parametersCell}>
//                                                 <div className={styles.parameterValue}>
//                                                     <span className={styles.paramLabel}>On:</span> {device.relay2.switchOnPoint}
//                                                 </div>
//                                                 <div className={styles.parameterValue}>
//                                                     <span className={styles.paramLabel}>Off:</span> {device.relay2.switchOffPoint}
//                                                 </div>
//                                             </td>
//                                             <td className={styles.statusCell}>
//                                                 <div className={getStatusClass(device.relay2)}>
//                                                     <IoSquareSharp size={24} />
//                                                     <span className={styles.statusText}>
//                                                         {device.relay2.state ? 'ON' : 'OFF'}
//                                                     </span>
//                                                 </div>
//                                             </td>
//                                             <td className={styles.actionCell}>
//                                                 <button 
//                                                     onClick={() => navigate(`/dashboard/${serial}`)} 
//                                                     className={styles.dashboardButton}
//                                                     title="View Dashboard"
//                                                 >
//                                                     <MdOutlineScreenshotMonitor size={24} />
//                                                     <span className={styles.buttonText}>View</span>
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="8" className={styles.noData}>
//                                             {searchTerm || filterStatus !== 'all' ? 
//                                                 'No devices match your search or filter criteria.' : 
//                                                 'No devices found.'}
//                                         </td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
                
//                 <div className={styles.deviceSummary}>
//                     <span className={styles.deviceCount}>Total Devices: {devices.length}</span>
//                     <span className={styles.deviceCount}>Displayed: {filteredDevices.length}</span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ManageDevices2;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchDevices, fetchInfluxData } from '../services/api';
import Navbar from '../components/Navbar';
import styles from './TestPage.module.css';

// Icons
import { FaThermometerHalf, FaSearch, FaSyncAlt, FaFilter } from "react-icons/fa";
import { MdDashboard, MdOutlineScreenshotMonitor, MdNotifications } from "react-icons/md";
import { IoSquareSharp } from "react-icons/io5";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";

const ManageDevices2 = ({ user }) => {
    const [devices, setDevices] = useState([]);
    const [filteredDevices, setFilteredDevices] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'serial', direction: 'ascending' });
    const [showFilters, setShowFilters] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');
    const [autoRefresh, setAutoRefresh] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(new Date());
    
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        loadDeviceData();
        
        // Set up auto-refresh interval if enabled
        let refreshInterval;
        if (autoRefresh) {
            refreshInterval = setInterval(() => {
                loadDeviceData();
            }, 30000); // Refresh every 30 seconds
        }
        
        return () => {
            if (refreshInterval) clearInterval(refreshInterval);
        };
    }, [user, autoRefresh]);

    // Filter and sort devices when dependencies change
    useEffect(() => {
        if (devices.length === 0) return;
        
        let result = [...devices];
        
        // Apply search filter
        if (searchTerm) {
            result = result.filter(([serial]) => 
                serial.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        // Apply status filter
        if (filterStatus !== 'all') {
            result = result.filter(([_, device]) => {
                if (filterStatus === 'on') {
                    return device.relay1.state || device.relay2.state;
                } else if (filterStatus === 'off') {
                    return !device.relay1.state && !device.relay2.state;
                }
                return true;
            });
        }
        
        // Apply sorting
        if (sortConfig.key) {
            result.sort((a, b) => {
                if (sortConfig.key === 'serial') {
                    return sortConfig.direction === 'ascending' 
                        ? a[0].localeCompare(b[0])
                        : b[0].localeCompare(a[0]);
                } else if (sortConfig.key === 'sensor1') {
                    return sortConfig.direction === 'ascending' 
                        ? a[1].sensor1 - b[1].sensor1
                        : b[1].sensor1 - a[1].sensor1;
                } else if (sortConfig.key === 'sensor2') {
                    return sortConfig.direction === 'ascending' 
                        ? a[1].sensor2 - b[1].sensor2
                        : b[1].sensor2 - a[1].sensor2;
                }
                return 0;
            });
        }
        
        setFilteredDevices(result);
    }, [devices, searchTerm, sortConfig, filterStatus]);

    const loadDeviceData = async () => {
        try {
            setLoading(true);
            console.log("Fetching device serials...");
            const deviceList = await fetchDevices(user.token);
            const deviceSerials = deviceList.map(device => device.serial_number);
            console.log("Device serials:", deviceSerials);

            const data = await fetchInfluxData(user.token, deviceSerials);
            console.log("Fetched device data:", data);
            setDevices(Object.entries(data));
            setLastUpdated(new Date());
        } catch (error) {
            console.error('Error fetching device data:', error);
            setError('Failed to load device data.');
        } finally {
            setLoading(false);
        }
    };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (columnName) => {
        if (sortConfig.key !== columnName) return null;
        return sortConfig.direction === 'ascending' ? 
            <BiSolidUpArrow className={styles.sortIcon} /> : 
            <BiSolidDownArrow className={styles.sortIcon} />;
    };

    const getStatusClass = (relay) => {
        return relay.state ? styles.statusOn : styles.statusOff;
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    return (
        <div className={styles.manageDevicesContainer}>
            <Navbar />
            <div className={styles.content}>
                <div className={styles.pageHeader}>
                    <h2>Live Device Data</h2>
                    <div className={styles.controlsWrapper}>
                        <div className={styles.searchContainer}>
                            <FaSearch className={styles.searchIcon} />
                            <input 
                                type="text" 
                                placeholder="Search by serial number..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={styles.searchInput}
                            />
                        </div>
                        
                        <div className={styles.actionButtons}>
                            <button 
                                className={`${styles.controlButton} ${showFilters ? styles.active : ''}`} 
                                onClick={() => setShowFilters(!showFilters)}
                                title="Toggle Filters"
                                style={{ zIndex: 10 }} // Added z-index to ensure it's not behind other elements
                            >
                                <FaFilter />
                            </button>
                            
                            <button 
                                className={`${styles.controlButton} ${autoRefresh ? styles.active : ''}`} 
                                onClick={() => setAutoRefresh(!autoRefresh)}
                                title={autoRefresh ? "Auto-refresh on" : "Auto-refresh off"}
                            >
                                <FaSyncAlt className={autoRefresh ? styles.spinning : ''} />
                            </button>
                            
                            <button 
                                className={styles.controlButton} 
                                onClick={loadDeviceData}
                                title="Refresh data"
                            >
                                <FaSyncAlt />
                            </button>
                        </div>
                    </div>
                </div>
                
                {showFilters && (
                    <div className={styles.filtersContainer}>
                        <div className={styles.filterGroup}>
                            <label>Status Filter:</label>
                            <select 
                                value={filterStatus} 
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className={styles.filterSelect}
                            >
                                <option value="all">All Statuses</option>
                                <option value="on">At least one relay ON</option>
                                <option value="off">All relays OFF</option>
                            </select>
                        </div>
                        
                        <div className={styles.lastUpdated}>
                            Last updated: {formatTime(lastUpdated)}
                        </div>
                    </div>
                )}
                
                {error && <div className={styles.errorMessage}>{error}</div>}
                
                {loading ? (
                    <div className={styles.loadingContainer}>
                        <div className={styles.loadingSpinner}></div>
                        <p>Loading device data...</p>
                    </div>
                ) : (
                    <div className={styles.tableContainer}>
                        <table className={styles.dataTable}>
                            <thead>
                                <tr>
                                    <th 
                                        className={`${styles.sortableHeader} ${styles.actionHeader}`} 
                                        onClick={() => requestSort('serial')}
                                        rowSpan="2"
                                    >
                                        Serial Number {getSortIcon('serial')}
                                    </th>
                                    <th colSpan="3" className={styles.groupHeader}>Sensor 1 (psi)</th>
                                    <th colSpan="3" className={styles.groupHeader}>Sensor 2 (psi)</th>
                                    <th rowSpan="2" className={styles.actionHeader}>Dashboard</th>
                                </tr>
                                <tr className={styles.subHeader}>
                                    <th></th>
                                    <th 
                                        className={styles.sortableHeader} 
                                        onClick={() => requestSort('sensor1')}
                                    >
                                        Reading {getSortIcon('sensor1')}
                                    </th>
                                    <th>Parameters</th>
                                    <th>Status</th>
                                    <th 
                                        className={styles.sortableHeader} 
                                        onClick={() => requestSort('sensor2')}
                                    >
                                        Reading {getSortIcon('sensor2')}
                                    </th>
                                    <th>Parameters</th>
                                    <th>Status</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDevices.length > 0 ? (
                                    filteredDevices.map(([serial, device]) => (
                                        <tr key={serial} className={styles.deviceRow}>
                                            <td className={styles.serialColumn}>{serial}</td>
                                            <td className={styles.readingCell}>
                                                <div className={styles.sensorReading}>
                                                    <FaThermometerHalf className={styles.sensorIcon} />
                                                    <span>{device.sensor1}</span>
                                                </div>
                                            </td>
                                            <td className={styles.parametersCell}>
                                                <div className={styles.parameterValue}>
                                                    <span className={styles.paramLabel}>On:</span> {device.relay1.switchOnPoint}
                                                </div>
                                                <div className={styles.parameterValue}>
                                                    <span className={styles.paramLabel}>Off:</span> {device.relay1.switchOffPoint}
                                                </div>
                                            </td>
                                            <td className={styles.statusCell}>
                                                <div className={getStatusClass(device.relay1)}>
                                                    <IoSquareSharp size={24} />
                                                    <span className={styles.statusText}>
                                                        {device.relay1.state ? 'ON' : 'OFF'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className={styles.readingCell}>
                                                <div className={styles.sensorReading}>
                                                    <FaThermometerHalf className={styles.sensorIcon} />
                                                    <span>{device.sensor2}</span>
                                                </div>
                                            </td>
                                            <td className={styles.parametersCell}>
                                                <div className={styles.parameterValue}>
                                                    <span className={styles.paramLabel}>On:</span> {device.relay2.switchOnPoint}
                                                </div>
                                                <div className={styles.parameterValue}>
                                                    <span className={styles.paramLabel}>Off:</span> {device.relay2.switchOffPoint}
                                                </div>
                                            </td>
                                            <td className={styles.statusCell}>
                                                <div className={getStatusClass(device.relay2)}>
                                                    <IoSquareSharp size={24} />
                                                    <span className={styles.statusText}>
                                                        {device.relay2.state ? 'ON' : 'OFF'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className={styles.actionCell}>
                                                <button 
                                                    onClick={() => navigate(`/dashboard/${serial}`)} 
                                                    className={styles.dashboardButton}
                                                    title="View Dashboard"
                                                >
                                                    <MdOutlineScreenshotMonitor size={24} />
                                                    <span className={styles.buttonText}>View</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className={styles.noData}>
                                            {searchTerm || filterStatus !== 'all' ? 
                                                'No devices match your search or filter criteria.' : 
                                                'No devices found.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
                
                <div className={styles.deviceSummary}>
                    <span className={styles.deviceCount}>Total Devices: {devices.length}</span>
                    <span className={styles.deviceCount}>Displayed: {filteredDevices.length}</span>
                </div>
            </div>
        </div>
    );
};

export default ManageDevices2;