import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ManageUsers from './pages/ManageUsers';
import ManageDevices from './pages/ManageDevices';
import InfluxTable from './pages/TestPage';

const App = () => {
    const [user, setUser] = useState(localStorage.getItem('token') ? { token: localStorage.getItem('token') } : null);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/dashboard" element={user ? <Dashboard setUser={setUser} /> : <Navigate to="/login" />} />
                <Route path="*" element={user ? <Dashboard setUser={setUser} /> : <Navigate to="/login" />} />
                <Route path="/manage-users" element={user ? <ManageUsers user={user} /> : <Navigate to="/login" />} />
                <Route path="/manage-devices" element={user ? <ManageDevices user={user} /> : <Navigate to="/login" />} />
                <Route path="/influx-table" element={user ? <InfluxTable /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
