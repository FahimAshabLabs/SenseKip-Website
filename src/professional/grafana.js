import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classes from './grafana.module.css';
import ProfessionalNavbar from '../components/ProfessionalNavbar';

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
            <ProfessionalNavbar onLogout={handleLogout} />
            
            {/* Device Dashboard */}
            <main className={classes.mainContent}>
                <h2>Device Dashboard: {serial || "No Serial Found"}</h2>

                {serial ? (
                    <div className={classes.dashboardIframeContainer}>
                        <iframe 
                            src={`http://3.140.62.93:3000/d/fed47nwgk8r9cd/new-dashboard?orgId=1&from=now-24h&to=now&timezone=browser&var-device_id=${serial}&refresh=5s&kiosk=true&theme=light`}
                            title="Grafana Dashboard"
                            frameBorder="0"
                        />
                    </div>
                ) : (
                    <p className={classes.error}>Error: Device ID is missing.</p>
                )}
            </main>
        </div>
    );
};

export default GrafanaDashboard;