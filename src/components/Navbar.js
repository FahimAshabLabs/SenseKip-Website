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
//         <nav className={styles.navbar}> {/* Use the new navbar style */}
//             {/* <div className={styles.logo}>
//                 <Link to="/table" className={styles["navbar-link"]}>MyApp</Link> 
//             </div> */}
//             <ul className={styles.navLinks}>
//                 <li><Link to="/table" className={styles["navbar-link"]}>Home</Link></li>
//                 <li><Link to="/table" className={styles["navbar-link"]}>Profile</Link></li>
//                 <li><Link to="/manage-users" className={styles["navbar-link"]}>Manage Users</Link></li>
//                 <li><Link to="/manage-devices" className={styles["navbar-link"]}>Manage Devices</Link></li>
//                 <li><Link to="/table" className={styles["navbar-link"]}>Settings</Link></li>
//             </ul>
//             <button onClick={handleLogout} className={styles["logout-button"]}>
//                 Logout
//             </button>
//         </nav>
//     );
// };

// export default Navbar;


import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css"; // Import the updated styles

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className={styles.navbar}>
            <ul className={styles.navLinks}>
                <li><Link to="/table" className={styles["navbar-link"]}>Home</Link></li>
                <li><Link to="/table" className={styles["navbar-link"]}>Profile</Link></li>
                <li><Link to="/manage-users" className={styles["navbar-link"]}>Manage Users</Link></li>
                <li><Link to="/manage-devices" className={styles["navbar-link"]}>Manage Devices</Link></li>
                <li><Link to="/table" className={styles["navbar-link"]}>Settings</Link></li>
            </ul>
            <div className={styles.logoutContainer}>
                <button onClick={handleLogout} className={styles["logout-button"]}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
