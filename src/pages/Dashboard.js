// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = ({ setUser }) => {
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         setUser(null);
//         navigate('/login');
//     };

//     return (
//         <div style={{ display: 'flex' }}>
//             <nav style={{ width: '200px', background: '#f4f4f4', padding: '10px' }}>
//                 <ul>
//                     <li><a href="/dashboard">Dashboard</a></li>
//                     <li><a href="/manage-users">Manage Users</a></li>
//                     <li><a href="/manage-devices">Manage Devices</a></li>
//                 </ul>
//             </nav>
//             <main style={{ flex: 1, padding: '10px' }}>
//                 <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>
//                 <h2>Welcome to the Corporate Dashboard</h2>
//             </main>
//         </div>
//     );
// };

// export default Dashboard;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import the CSS file
import Navbar from "../components/Navbar"; // Import Navbar


const Dashboard = ({ setUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
       
        <div className="dashboard-container">
            <Navbar handleLogout={handleLogout} /> {/* Use Navbar Component */}
            <main className="main-content">
                <h2>Welcome to the Corporate Dashboard</h2>
            </main>
        </div>
    );
};

export default Dashboard;
