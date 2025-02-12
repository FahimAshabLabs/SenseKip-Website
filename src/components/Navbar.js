// src/components/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; // Navbar styles

const Navbar = ({ handleLogout }) => {
    return (
        <nav className="sidebar">
            <ul>
                <li><a href="/dashboard" className="sidebar-link">Home</a></li>
                <li><a href="/dashboard" className="sidebar-link">Profile</a></li>
                <li><a href="/manage-users" className="sidebar-link">Manage Users</a></li>
                <li><a href="/manage-devices" className="sidebar-link">Manage Devices</a></li>
                <li><a href="/settings" className="sidebar-link">Settings</a></li>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </ul>
        </nav>
    );
};

export default Navbar;
