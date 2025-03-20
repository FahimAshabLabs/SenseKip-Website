// // src/components/ProfessionalNavbar.js
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import classes from "./ProfessionalNavbar.module.css"; // Importing styles
// import logo from "../figures/corporate_logo.jpg";
// import Monitoring from "../figures/monitoring.png";
// import iot from "../figures/iot.png";
// import config from "../figures/config.png";

// const ProfessionalNavbar = ({ onLogout }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     onLogout(); // Call the passed logout function (setUser=null or navigate to login)
//     navigate("/login");
//   };

//   return (
//     <nav className={classes.proNavbar}>
//       {/* Left Side: Logo + Heading */}
//       <div className={classes.proNavbarLeft}>
//         <img src={logo} alt="Corporate_Logo" />
//         <h1>Professional Management</h1>
//       </div>

//       {/* Right Side: Links + Logout */}
//       <div className={classes.proNavbarRight}>
//         <div>
//           <img src={Monitoring} alt="Monitoring Center Logo" />
//           <Link to="/professional-dashboard" className={classes.navLink}>
//             Monitoring center
//           </Link>
        
//         </div>
//         <div>
//           <img src={iot} alt="IoT Device Management Logo" />
//           <Link to="/professional-manage-devices" className={classes.navLink}>
//             IoT Device Management
//           </Link>
//         </div>
//         <div>
//           <img src={config} alt="Configuration Logo" />
//           <span>Configuration</span>
//         </div>
//         <button className={classes.proLogoutButton} onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default ProfessionalNavbar;


// src/components/ProfessionalNavbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./ProfessionalNavbar.module.css"; // Importing styles
import logo from "../figures/corporate_logo.jpg";
import Monitoring from "../figures/monitoring.png";
import iot from "../figures/iot.png";
import config from "../figures/config.png";

const ProfessionalNavbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    onLogout(); // Call the passed logout function (setUser=null or navigate to login)
    navigate("/login");
  };

  return (
    <nav className={classes.proNavbar}>
      {/* Left Side: Logo + Heading */}
      <div className={classes.proNavbarLeft}>
        <img src={logo} alt="Corporate_Logo" className={classes.logo} />
        <h1 className={classes.heading}>Professional Management</h1>
      </div>

      {/* Right Side: Links + Logout */}
      <div className={classes.proNavbarRight}>
        <div className={classes.navItem}>
          <img src={Monitoring} alt="Monitoring Center Logo" className={classes.navIcon} />
          <Link to="/professional-dashboard" className={classes.navLink}>
            Monitoring Center
          </Link>
        </div>
        <div className={classes.navItem}>
          <img src={iot} alt="IoT Device Management Logo" className={classes.navIcon} />
          <Link to="/professional-manage-devices" className={classes.navLink}>
            IoT Device Management
          </Link>
        </div>
        <div className={classes.navItem}>
          <img src={config} alt="Configuration Logo" className={classes.navIcon} />
          <span className={classes.navLink}>Configuration</span>
        </div>
        <button className={classes.proLogoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default ProfessionalNavbar;