// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { loginUser } from '../services/api';
// import styles from './Login.module.css'; 

// const Login = ({ setUser }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const { token, role } = await loginUser(email, password);
//             localStorage.setItem('token', token);
//             localStorage.setItem('role', role);
    
//             setUser({ token, role });
    
//             // Redirect based on role
//             if (role === "N3") {
//                 navigate('/table');
//             } else if (role === "N4") {
//                 navigate('/professional-dashboard');
//             } else {
//                 setError("Unknown role. Please contact support.");
//             }
//         } catch (err) {
//             setError('Invalid credentials');
//         }
//     };

//     return (
//         <div className={styles["login-container"]}>
//             <div className={styles["login-form"]}>
//                 <h2>Login</h2>
//                 <form onSubmit={handleSubmit}>
//                     <input 
//                         type="email" 
//                         placeholder="Email" 
//                         value={email} 
//                         onChange={(e) => setEmail(e.target.value)} 
//                         required 
//                         className={styles.input}
//                     />
//                     <input 
//                         type="password" 
//                         placeholder="Password" 
//                         value={password} 
//                         onChange={(e) => setPassword(e.target.value)} 
//                         required 
//                         className={styles.input}
//                     />
//                     <button type="submit" className={styles.button}>Login</button>
//                 </form>
//                 {error && <p className={styles.error}>{error}</p>}
//             </div>
//         </div>
//     );
// };

// export default Login;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { loginUser } from '../services/api';
// import styles from './Login.module.css'; // Import CSS module

// const Login = ({ setUser }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [loginType, setLoginType] = useState('corporate'); // 'corporate' or 'professional'
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const { token, role } = await loginUser(email, password);
//             localStorage.setItem('token', token);
//             localStorage.setItem('role', role); // Store role

//             setUser({ token, role });

//             // Redirect based on role
//             if (role === "N3") {
//                 navigate('/table');
//             } else if (role === "N4") {
//                 navigate('/professional-dashboard');
//             } else {
//                 setError("Unknown role. Please contact support.");
//             }
//         } catch (err) {
//             setError('Invalid credentials');
//         }
//     };

//     return (
//         <div className={styles.loginContainer}>
//             <div className={styles.loginForm}>
//                 <h2>Welcome Back</h2>
//                 <p>Please log in to continue</p>

//                 {/* Toggle Slider for Login Type */}
//                 <div className={styles.toggleContainer}>
//                     <button
//                         className={`${styles.toggleButton} ${loginType === 'corporate' ? styles.active : ''}`}
//                         onClick={() => setLoginType('corporate')}
//                     >
//                         Corporate
//                     </button>
//                     <button
//                         className={`${styles.toggleButton} ${loginType === 'professional' ? styles.active : ''}`}
//                         onClick={() => setLoginType('professional')}
//                     >
//                         Professional
//                     </button>
//                 </div>

//                 {/* Login Form */}
//                 <form onSubmit={handleSubmit}>
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                         className={styles.input}
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         className={styles.input}
//                     />
//                     <button type="submit" className={styles.button}>
//                         Login
//                     </button>
//                 </form>

//                 {/* Error Message */}
//                 {error && <p className={styles.error}>{error}</p>}

//                 {/* Additional Links */}
//                 <div className={styles.links}>
//                     <a href="/forgot-password">Forgot Password?</a>
//                     <a href="/signup">Don't have an account? Sign Up</a>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import styles from './Login.module.css'; // Import CSS module

const Login = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loginType, setLoginType] = useState('corporate'); // 'corporate' or 'professional'
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { token, role } = await loginUser(email, password);
            localStorage.setItem('token', token);
            localStorage.setItem('role', role); // Store role

            setUser({ token, role });

            // Redirect based on role
            if (role === "N3") {
                navigate('/table');
            } else if (role === "N4") {
                navigate('/professional-dashboard');
            } else {
                setError("Unknown role. Please contact support.");
            }
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginForm}>
                <h2>Welcome Back</h2>
                <p>Please log in to continue</p>

                {/* Toggle Slider for Login Type */}
                {/* <div className={styles.toggleContainer}>
                    <button
                        className={`${styles.toggleButton} ${loginType === 'corporate' ? styles.active : ''}`}
                        onClick={() => setLoginType('corporate')}
                    >
                        Corporate
                    </button>
                    <button
                        className={`${styles.toggleButton} ${loginType === 'professional' ? styles.active : ''}`}
                        onClick={() => setLoginType('professional')}
                    >
                        Professional
                    </button>
                </div> */}

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={styles.input}
                    />
                    <button type="submit" className={styles.button}>
                        Login
                    </button>
                </form>

                {/* Error Message */}
                {error && <p className={styles.error}>{error}</p>}

                {/* Additional Links */}
                <div className={styles.links}>
                    <a href="/forgot-password">Forgot Password?</a>
                    <a href="/signup">Don't have an account? Sign Up</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
