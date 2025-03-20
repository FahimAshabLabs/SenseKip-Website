// import React, { useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import classes from './grafana.module.css';

// const GrafanaDashboard = ({ setUser }) => {
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
//         <div className={classes.dashboardContainer}> {/* ✅ Corrected usage */}
//             <main className={classes.mainContent}> {/* ✅ Corrected usage */}
//                 <h2>Device Dashboard: {serial || "No Serial Found"}</h2>

//                 {serial ? (
//                     <div style={{ position: 'relative', width: '850px', height: '500px' }}>
//                         <iframe 
//                             src={`http://3.140.62.93:3000/d/fed47nwgk8r9cd/new-dashboard?orgId=1&from=now-24h&to=now&timezone=browser&var-device_id=${serial}&refresh=5s&kiosk=true&theme=light`}
//                             width="850" 
//                             height="500" 
//                             style={{ border: 'none' }}
//                             title="Grafana Dashboard"
//                             frameBorder="0"
//                         />
//                     </div>
//                 ) : (
//                     <p style={{ color: 'red' }}>Error: Device ID is missing.</p>
//                 )}
//             </main>
//         </div>
//     );
// };

// export default GrafanaDashboard;


// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import classes from './grafana.module.css';
// import logo from '../figures/corporate_logo.jpg';
// import Monitoring from '../figures/monitoring.png';
// import iot from '../figures/iot.png';
// import config from '../figures/config.png';

// const GrafanaDashboard = ({ setUser }) => {
//     const navigate = useNavigate();
//     const { serial } = useParams();
//     const [user, setUserState] = useState(null);

//     useEffect(() => {
//         console.log("Received serial:", serial);
//     }, [serial]);

//     useEffect(() => {
//         // Retrieve user data from localStorage
//         const token = localStorage.getItem("token");
//         const role = localStorage.getItem("role");

//         if (token && role === "N4") {
//             setUserState({ token, role });
//         } else {
//             navigate("/login");
//         }
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         setUser(null);
//         navigate('/login');
//     };

//     return (
//         <div className={classes.dashboardContainer}>
//             {/* Navbar */}
//             <nav className={classes.proNavbar}>
//                 <div className={classes.proNavbarLeft}>
//                     <img src={logo} alt="Corporate_Logo" />
//                     <h1>Professional Management</h1>
//                 </div>
//                 <div className={classes.proNavbarRight}>
//                     <div>
//                         <img src={Monitoring} alt="Monitoring Center Logo" />
//                         <span>Monitoring Center</span>
//                     </div>
//                     <div>
//                         <img src={iot} alt="IoT Device Management Logo" />
//                         <Link to="/professional-manage-devices" className={classes.navLink}>IoT Device Management</Link>
//                     </div>
//                     <div>
//                         <img src={config} alt="Configuration Logo" />
//                         <span>Configuration</span>
//                     </div>
//                     <button className={classes.proLogoutButton} onClick={handleLogout}>Logout</button>
//                 </div>
//             </nav>

//             {/* Device Dashboard */}
//             <main className={classes.mainContent}>
//                 <h2>Device Dashboard: {serial || "No Serial Found"}</h2>

//                 {serial ? (
//                     <div style={{ position: 'relative', width: '850px', height: '500px' }}>
//                         <iframe 
//                             src={`http://3.140.62.93:3000/d/fed47nwgk8r9cd/new-dashboard?orgId=1&from=now-24h&to=now&timezone=browser&var-device_id=${serial}&refresh=5s&kiosk=true&theme=light`}
//                             width="850" 
//                             height="500" 
//                             style={{ border: 'none' }}
//                             title="Grafana Dashboard"
//                             frameBorder="0"
//                         />
//                     </div>
//                 ) : (
//                     <p style={{ color: 'red' }}>Error: Device ID is missing.</p>
//                 )}
//             </main>
//         </div>
//     );
// };

// export default GrafanaDashboard;



import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classes from './grafana.module.css';
import ProfessionalNavbar from '../components/ProfessionalNavbar';  // Import the navbar component

const GrafanaDashboard = ({ setUser }) => {
    const navigate = useNavigate();
    const { serial } = useParams();
    const [user, setUserState] = useState(null);

    useEffect(() => {
        console.log("Received serial:", serial);
    }, [serial]);

    useEffect(() => {
        // Retrieve user data from localStorage
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (token && role === "N4") {
            setUserState({ token, role });
        } else {
            navigate("/login");
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <div className={classes.dashboardContainer}>
            {/* Add Navbar Component here */}
            <ProfessionalNavbar handleLogout={handleLogout} />

            {/* Device Dashboard */}
            <main className={classes.mainContent}>
                <h2>Device Dashboard: {serial || "No Serial Found"}</h2>

                {serial ? (
                    <div style={{ position: 'relative', width: '850px', height: '500px' }}>
                        <iframe 
                            src={`http://3.140.62.93:3000/d/fed47nwgk8r9cd/new-dashboard?orgId=1&from=now-24h&to=now&timezone=browser&var-device_id=${serial}&refresh=5s&kiosk=true&theme=light`}
                            width="850" 
                            height="500" 
                            style={{ border: 'none' }}
                            title="Grafana Dashboard"
                            frameBorder="0"
                        />
                    </div>
                ) : (
                    <p style={{ color: 'red' }}>Error: Device ID is missing.</p>
                )}
            </main>
        </div>
    );
};

export default GrafanaDashboard;
