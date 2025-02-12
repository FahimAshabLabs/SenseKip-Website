import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App = () => {
    const [user, setUser] = useState(localStorage.getItem('token') ? { token: localStorage.getItem('token') } : null);
    // aA state variable user and its setter setUser are defined using useState.
    // The user state is initialized by checking if a token exists in 
    // local storage. If it exists, user is set to an object with the token;
    //  otherwise, it's set to null.
    return (
        <Router>
            <Routes>
              
                <Route path="/login" element={<Login setUser={setUser} />} />
                {/* Login Route: The /login path renders the Login component. 
                The setUser function is passed as a prop to handle user authentication.Dashboard Route: 
                The /dashboard path renders the Dashboard component if a user is 
                authenticated (user is not null). If not, it redirects to the login page using the Navigate component */}
                <Route path="/dashboard" element={user ? <Dashboard setUser={setUser} /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
