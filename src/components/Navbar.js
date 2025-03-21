// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import styles from "./Navbar.module.css"; // Import the updated styles

// const Navbar = () => {
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/login");
//     };

//     return (
//         <nav className={styles.navbar}>
//             <ul className={styles.navLinks}>
//                 <li><Link to="/table" className={styles["navbar-link"]}>Home</Link></li>
//                 <li><Link to="/table" className={styles["navbar-link"]}>Profile</Link></li>
//                 <li><Link to="/manage-users" className={styles["navbar-link"]}>Manage Users</Link></li>
//                 <li><Link to="/manage-devices" className={styles["navbar-link"]}>Manage Devices</Link></li>
//                 <li><Link to="/table" className={styles["navbar-link"]}>Settings</Link></li>
//             </ul>
//             <div className={styles.logoutContainer}>
//                 <button onClick={handleLogout} className={styles["logout-button"]}>
//                     Logout
//                 </button>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;


import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FaSignOutAlt } from "react-icons/fa"; // Logout Icon
import { MdSettings, MdManageAccounts, MdDevices } from "react-icons/md"; // Icons for navigation
import { FaRegUser } from "react-icons/fa"; // Profile icon
import { SiReact } from "react-icons/si"; // Temporary logo (replace with your own)

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className={styles.navbar}>
            {/* Left Section - Logo & Corporate Text */}
            <div className={styles.logoContainer}>
                <SiReact className={styles.logoIcon} /> {/* Replace with your own logo */}
                <span className={styles.companyText}>Corporate Management</span>
            </div>

            {/* Center Links */}
            <ul className={styles.navLinks}>
                <li><Link to="/table" className={styles.navbarLink}><FaRegUser /> Monitoring Center</Link></li>
                <li><Link to="/manage-users" className={styles.navbarLink}><MdManageAccounts /> Manage Users</Link></li>
                <li><Link to="/manage-devices" className={styles.navbarLink}><MdDevices /> Manage Devices</Link></li>
                <li><Link to="/table" className={styles.navbarLink}><MdSettings /> Settings</Link></li>
            </ul>

            {/* Right Section - Logout Icon */}
            <div className={styles.logoutContainer} onClick={handleLogout}>
                <FaSignOutAlt className={styles.logoutIcon} />
            </div>
        </nav>
    );
};

export default Navbar;
