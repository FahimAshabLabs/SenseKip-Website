import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ManageUsers from './pages/ManageUsers';
import ManageDevices from './pages/ManageDevices';
import ManageDevices2 from './pages/TestPage';
import ProfessionalDashboard from './professional/p_dashboard'; // Import Professional Dashboard
import ProfessionalManageDevices from './professional/ProfessionalManageDevices'; // ✅ Import ProfessionalManageDevices
import GrafanaDashboard from './professional/grafana';
import LandingPage from './pages/landingpage';

const App = () => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        return token ? { token, role } : null;
    });

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/landing" element={<LandingPage setUser={setUser} />} />

                {/* Professional Dashboard - Only N4 users can access */}
                <Route path="/professional-dashboard" element={
                    user?.role === 'N4' ? <ProfessionalDashboard /> : <Navigate to="/login" />
                }/>
               
                <Route 
                    path="/GrafanaDashboard/:serial" 
                    element={user?.role === 'N3' || user?.role === 'N4' ? <GrafanaDashboard setUser={setUser} /> : <Navigate to="/login" />}
                />
                {/* Professional IoT Device Management - Only N4 users */}
                <Route path="/professional-manage-devices" element={
                    user?.role === 'N4' ? <ProfessionalManageDevices user={user} /> : <Navigate to="/login" />
                }/>

                {/* <Route path="/dashboard/:serial" element={
                    user?.role === 'N3' ? <Dashboard setUser={setUser} /> : <Navigate to="/login" />
                    
                }/> */}
                <Route 
                    path="/dashboard/:serial" 
                    element={user?.role === 'N3' || user?.role === 'N4' ? <Dashboard setUser={setUser} /> : <Navigate to="/login" />}
                />


                {/* Restricted Pages - Only N3 (Corporate Admin) can access */}
                <Route path="/manage-users" element={
                    user?.role === 'N3' ? <ManageUsers user={user} /> : <Navigate to="/login" />
                }/>
                <Route path="/manage-devices" element={
                    user?.role === 'N3' ? <ManageDevices user={user} /> : <Navigate to="/login" />
                }/>
                <Route path="/table" element={
                    user?.role === 'N3' ? <ManageDevices2 user={user} /> : <Navigate to="/login" />
                }/>

                {/* Default Route */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
