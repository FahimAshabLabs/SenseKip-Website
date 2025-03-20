import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classes from './Dashboard.module.css'; // ✅ Ensure correct import
import Navbar from "../components/Navbar";

const Dashboard = ({ setUser }) => {
    const navigate = useNavigate();
    const { serial } = useParams();

    useEffect(() => {
        console.log("Received serial:", serial);
    }, [serial]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
       <div>
        <Navbar handleLogout={handleLogout} />

        <div className={classes.dashboardContainer}> {/* ✅ Corrected usage */}
            
            <main className={classes.mainContent}> {/* ✅ Corrected usage */}
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
       </div>
    );
};

export default Dashboard;
