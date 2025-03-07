// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Dashboard.css'; // Import the CSS file
// import Navbar from "../components/Navbar"; // Import Navbar

// const Dashboard = ({ setUser }) => {
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         setUser(null);
//         navigate('/login');
//     };

//     return (
//         <div className="dashboard-container">
//             <Navbar handleLogout={handleLogout} /> {/* Use Navbar Component */}
//             <main className="main-content">
//                 <h2>Welcome to the Corporate Dashboard</h2>
                
//                 {/* Corrected div syntax */}
//                 <div style={{ position: 'relative', width: '650px', height: '200px' }}>
//                     <iframe 
//                         src={`http://3.140.62.93:3000/d/fed47nwgk8r9cd/new-dashboard?orgId=1&from=2025-02-15T14:09:38.582Z&to=2025-02-15T17:09:38.582Z&timezone=browser&var-device_id=ABC123456&refresh=5s&kiosk=true`}
//                         width="850" 
//                         height="500" 
//                         style={{ border: 'none' }}
//                         title="Grafana Dashboard"
//                         frameBorder="0"  // Corrected attribute name
//                     />
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default Dashboard;


// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import './Dashboard.css'; // Import the CSS file
// import Navbar from "../components/Navbar"; // Import Navbar

// const Dashboard = ({ setUser }) => {
//     const navigate = useNavigate();
//     const { serial } = useParams(); // Get serial number from URL

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         setUser(null);
//         navigate('/login');
//     };

//     return (
//         <div className="dashboard-container">
//             <Navbar handleLogout={handleLogout} /> {/* Use Navbar Component */}
//             <main className="main-content">
//                 <h2>Device Dashboard: {serial}</h2>

//                 {/* iFrame with dynamic serial and last 24 hours time range */}
//                 <div style={{ position: 'relative', width: '850px', height: '500px' }}>
//                     <iframe 
//                         src={`http://3.140.62.93:3000/d/fed47nwgk8r9cd/new-dashboard?orgId=1&from=now-24h&to=now&timezone=browser&var-device_id=${serial}&refresh=5s&kiosk=true`}
//                         width="850" 
//                         height="500" 
//                         style={{ border: 'none' }}
//                         title="Grafana Dashboard"
//                         frameBorder="0"
//                     />
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default Dashboard;

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Navbar from "../components/Navbar";

const Dashboard = ({ setUser }) => {
    const navigate = useNavigate();
    const { serial } = useParams(); // Get serial number from URL

    // Print serial in console for debugging
    useEffect(() => {
        console.log("Received serial:", serial);
    }, [serial]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <Navbar handleLogout={handleLogout} />
            <main className="main-content">
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

export default Dashboard;
