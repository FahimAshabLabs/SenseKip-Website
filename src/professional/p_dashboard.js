// import React from "react";
// import { Link } from 'react-router-dom'; // ✅ Import Link for navigation
// import classes from './ProfessionalDashboard.module.css'; // ✅ Import CSS module
// import logo from '../figures/corporate_logo.jpg';
// import Monitoring from '../figures/monitoring.png';
// import iot from '../figures/iot.png';
// import config from '../figures/config.png';

// const ProfessionalDashboard = () => {
//   return (
//     <div>
//       <nav className={classes.proNavbar}> 
//         {/* Left Side: Logo + Heading */}
//         <div className={classes.proNavbarLeft}> 
//           <img src={logo} alt="Corporate_Logo" />
//           <h1>Professional Management</h1>
//         </div>

//         {/* Right Side: Links + Logout */}
//         <div className={classes.proNavbarRight}> 
//           <div>
//             <img src={Monitoring} alt="Monitoring Center Logo" />
//             <span>Monitoring Center</span>
//           </div>

//           {/* ✅ IoT Device Management Link */}
//           <div>
//             <img src={iot} alt="IoT Device Management Logo" />
//             <Link to="/professional-manage-devices" className={classes.navLink}>IoT Device Management</Link>
//           </div>

//           <div>
//             <img src={config} alt="Configuration Logo" />
//             <span>Configuration</span>
//           </div>

//           <button className={classes.proLogoutButton}>Logout</button>
//         </div>
//       </nav>

//       {/* Content Area */}
//       <div className={classes.proContent}>
//         <h2>Welcome to the Professional Dashboard</h2>
//         <p>
//           This is where your content will go. Replace this section with your dashboard components.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ProfessionalDashboard;


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchDevices, fetchInfluxData } from "../services/api";
import classes from "./ProfessionalDashboard.module.css";
import ProfessionalNavbar from "../components/ProfessionalNavbar";
const ProfessionalDashboard = () => {
  const [user, setUser] = useState(null);
  const [devices, setDevices] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from localStorage
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role === "N4") {
      setUser({ token, role });
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadDeviceData();
    }
  }, [user]);

  const loadDeviceData = async () => {
    try {
      console.log("Fetching device serials...");
      const deviceList = await fetchDevices(user.token);
      const deviceSerials = deviceList.map((device) => device.serial_number);
      console.log("Device serials:", deviceSerials);

      const data = await fetchInfluxData(user.token, deviceSerials);
      console.log("Fetched device data:", data);
      setDevices(Object.entries(data));
    } catch (error) {
      console.error("Error fetching device data:", error);
      setError("Failed to load device data.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  if (!user) return null; // Prevent rendering if user data isn't loaded

  return (
    <div className={classes.proContainer}>
      <ProfessionalNavbar onLogout={handleLogout} />
     
      {/* Devices List Section */}
      <div className={classes.devicesContent}>
        <h2>Live Device Data</h2>
        {error && <p className={classes.error}>{error}</p>}
        <table className={classes.deviceTable}>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th colSpan="3">Sensor 1 (psi)</th>
              <th colSpan="3">Sensor 2 (psi)</th>
              <th>Dashboard</th>
            </tr>
            <tr>
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
                <td>{device.relay1.state ? "On" : "Off"}</td>
                <td>{device.sensor2}</td>
                <td>{`On: ${device.relay2.switchOnPoint}, Off: ${device.relay2.switchOffPoint}`}</td>
                <td>{device.relay2.state ? "On" : "Off"}</td>
                <td></td>
                <td>
                  <button  onClick={() => navigate(`/GrafanaDashboard/${serial}`)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
