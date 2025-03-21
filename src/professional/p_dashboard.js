import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchDevices, fetchInfluxData } from "../services/api";
import classes from "./ProfessionalDashboard.module.css";
import ProfessionalNavbar from "../components/ProfessionalNavbar";
import { FaThermometerHalf } from "react-icons/fa";

import { MdDashboard } from "react-icons/md";
import { MdOutlineScreenshotMonitor } from "react-icons/md";
import { IoSquareSharp } from "react-icons/io5";




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
              <th rowSpan="2">Serial Number</th>
              <th colSpan="3" > <FaThermometerHalf color="red" size={26} />Sensor 1 (psi)</th>
              <th colSpan="3">  <FaThermometerHalf color="red" size={26}  />Sensor 2 (psi)</th>
              <th rowSpan="2"> Dashboard</th>
            </tr>
            <tr>
              
              <th>Reading</th>
              <th>Parameters</th>
              <th>Status</th>
              <th>Reading</th>
              <th>Parameters</th>
              <th>Status</th>
              
            </tr>
          </thead>
          <tbody>
            {devices.map(([serial, device]) => (
              <tr key={serial}>
                <td>{serial}</td>
                <td>{device.sensor1}</td>
                <td>{`On: ${device.relay1.switchOnPoint}, Off: ${device.relay1.switchOffPoint}`}</td>
                <td>{device.relay1.state ? <IoSquareSharp color="red" size={24} /> : <IoSquareSharp color="green" size={24} />}</td>
                <td>{device.sensor2}</td>
                <td>{`On: ${device.relay2.switchOnPoint}, Off: ${device.relay2.switchOffPoint}`}</td>
                <td>{device.relay2.state ?  <IoSquareSharp color="red" size={24} /> : <IoSquareSharp color="green" size={24} />}</td>
                
                {/* <td>
                  <button  onClick={() => navigate(`/GrafanaDashboard/${serial}`)}> <MdOutlineScreenshotMonitor color="blue" size={24} /></button>
                </td> */}
                <td>
                  <button onClick={() => navigate(`/GrafanaDashboard/${serial}`)} className={classes.iconButton}>
                    <MdOutlineScreenshotMonitor color="black" size={30} />
                  </button>
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
