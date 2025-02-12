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

const Dashboard = ({ setUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <nav className="sidebar">
                <ul>
                    <li><a href="/dashboard" className="sidebar-link">Home</a></li>
                    <li><a href="/dashboard" className="sidebar-link">Profile</a></li>
                    <li><a href="/manage-users" className="sidebar-link">Manage Users</a></li>
                    <li><a href="/manage-devices" className="sidebar-link">Manage Devices</a></li>
                    <li><a href="/manage-devices" className="sidebar-link">Settings</a></li>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </ul>
            </nav>
            <main className="main-content">
                {/* <button onClick={handleLogout} className="logout-button">Logout</button> */}
                <h2>Welcome to the Corporate Dashboard</h2>
            </main>
        </div>
    );
};

export default Dashboard;
