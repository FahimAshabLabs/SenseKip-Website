
// import React, { useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import classes from './Dashboard.module.css'; // ✅ Ensure correct import
// import Navbar from "../components/Navbar";

// const Dashboard = ({ setUser }) => {
//     const navigate = useNavigate();
//     const { serial } = useParams();

//     useEffect(() => {
//         console.log("Received serial:", serial);
//     }, [serial]);

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         setUser(null);
//         navigate('/login');
//     };

//     return (
//         <div className={classes.dashboardContainer}> {/* ✅ Full-page container */}
//             <Navbar handleLogout={handleLogout} />

//             <div className={classes.mainContent}> {/* ✅ Centered content */}
//                 <h2>Device Dashboard: {serial || "No Serial Found"}</h2>

//                 {serial ? (
//                     <div className={classes.dashboardIframeContainer}> {/* ✅ Responsive container */}
//                         <iframe 
//                             src={`http://3.140.62.93:3000/d/fed47nwgk8r9cd/new-dashboard?orgId=1&from=now-24h&to=now&timezone=browser&var-device_id=${serial}&refresh=5s&kiosk=true&theme=light`}
//                             title="Grafana Dashboard"
//                             frameBorder="0"
//                         />
//                     </div>
//                 ) : (
//                     <p className={classes.error}>Error: Device ID is missing.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classes from './Dashboard.module.css';
import Navbar from "../components/Navbar";

const Dashboard = ({ setUser }) => {
    const navigate = useNavigate();
    const { serial } = useParams();
    
    // State for sensors set points
    const [sensor1, setSensor1] = useState({ on: 30, off: 20 });
    const [sensor2, setSensor2] = useState({ on: 200, off: 130 });
    const [sensor1Active, setSensor1Active] = useState(true);
    const [sensor2Active, setSensor2Active] = useState(false);

    useEffect(() => {
        console.log("Received serial:", serial);
        // Here you would fetch the current sensor settings from your API
    }, [serial]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    const handleSensor1Change = (field, value) => {
        setSensor1({...sensor1, [field]: value});
    };

    const handleSensor2Change = (field, value) => {
        setSensor2({...sensor2, [field]: value});
    };

    const toggleSensor1 = () => {
        setSensor1Active(!sensor1Active);
    };

    const toggleSensor2 = () => {
        setSensor2Active(!sensor2Active);
    };

    const saveSensor1Settings = () => {
        // API call to save sensor 1 settings
        console.log("Saving Sensor 1 settings:", sensor1);
        // Here you would make an API call to save the settings
    };

    const saveSensor2Settings = () => {
        // API call to save sensor 2 settings
        console.log("Saving Sensor 2 settings:", sensor2);
        // Here you would make an API call to save the settings
    };

    return (
        <div className={classes.dashboardContainer}>
            <Navbar handleLogout={handleLogout} />

            <div className={classes.mainContent}>
                <h2>Device Dashboard: {serial || "No Serial Found"}</h2>
                
                {serial ? (
                    <div className={classes.dashboardLayout}>
                        <div className={classes.dashboardLeft}>
                            <div className={classes.dashboardIframeContainer}>
                                <iframe 
                                    src={`http://3.140.62.93:3000/d/fed47nwgk8r9cd/new-dashboard?orgId=1&from=now-24h&to=now&timezone=browser&var-device_id=${serial}&refresh=5s&kiosk=true&theme=light`}
                                    title="Grafana Dashboard"
                                    frameBorder="0"
                                />
                            </div>
                        </div>
                        
                        <div className={classes.dashboardRight}>
                            <div className={classes.serialNumber}>
                                <span>Serial Number: {serial}</span>
                                <div className={classes.signalIcon}>
                                    <i className="fas fa-signal"></i>
                                </div>
                            </div>
                            
                            <div className={classes.setPointCard}>
                                <h3>Set-point Sensor 1</h3>
                                
                                <div className={classes.setPointRow}>
                                    <span>Turn on</span>
                                    <div className={classes.inputGroup}>
                                        <input 
                                            type="number" 
                                            value={sensor1.on}
                                            onChange={(e) => handleSensor1Change('on', e.target.value)}
                                        />
                                        <span className={classes.unit}>psi</span>
                                    </div>
                                </div>
                                
                                <div className={classes.setPointRow}>
                                    <span>Turn off</span>
                                    <div className={classes.inputGroup}>
                                        <input 
                                            type="number" 
                                            value={sensor1.off}
                                            onChange={(e) => handleSensor1Change('off', e.target.value)}
                                        />
                                        <span className={classes.unit}>psi</span>
                                    </div>
                                </div>
                                
                                <div className={classes.toggleContainer}>
                                    <div 
                                        className={`${classes.toggle} ${sensor1Active ? classes.active : ''}`}
                                        onClick={toggleSensor1}
                                    >
                                        <div className={classes.toggleButton}></div>
                                    </div>
                                </div>
                                
                                <button 
                                    className={classes.saveButton} 
                                    onClick={saveSensor1Settings}
                                >
                                    <i className="fas fa-save"></i> Salvar
                                </button>
                            </div>
                            
                            <div className={classes.setPointCard}>
                                <h3>Set-point Sensor 2</h3>
                                
                                <div className={classes.setPointRow}>
                                    <span>Turn on</span>
                                    <div className={classes.inputGroup}>
                                        <input 
                                            type="number" 
                                            value={sensor2.on}
                                            onChange={(e) => handleSensor2Change('on', e.target.value)}
                                        />
                                        <span className={classes.unit}>psi</span>
                                    </div>
                                </div>
                                
                                <div className={classes.setPointRow}>
                                    <span>Turn off</span>
                                    <div className={classes.inputGroup}>
                                        <input 
                                            type="number" 
                                            value={sensor2.off}
                                            onChange={(e) => handleSensor2Change('off', e.target.value)}
                                        />
                                        <span className={classes.unit}>psi</span>
                                    </div>
                                </div>
                                
                                <div className={classes.toggleContainer}>
                                    <div 
                                        className={`${classes.toggle} ${sensor2Active ? classes.active : ''}`}
                                        onClick={toggleSensor2}
                                    >
                                        <div className={classes.toggleButton}></div>
                                    </div>
                                </div>
                                
                                <button 
                                    className={classes.saveButton} 
                                    onClick={saveSensor2Settings}
                                >
                                    <i className="fas fa-save"></i> Salvar
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className={classes.error}>Error: Device ID is missing.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;