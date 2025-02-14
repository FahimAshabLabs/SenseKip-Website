// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Navbar styles

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="sidebar">
            <ul>
                <li><Link to="/dashboard" className="sidebar-link">Home</Link></li>
                <li><Link to="/dashboard" className="sidebar-link">Profile</Link></li>
                <li><Link to="/manage-users" className="sidebar-link">Manage Users</Link></li>
                <li><Link to="/manage-devices" className="sidebar-link">Manage Devices</Link></li>
                <li><Link to="/settings" className="sidebar-link">Settings</Link></li>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </ul>
        </nav>
    );
};

export default Navbar;
