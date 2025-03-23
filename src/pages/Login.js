// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { loginUser } from '../services/api';
// import styles from './Login.module.css';
// import brand_logo from "../figures/sense.jpg";
// import { motion, AnimatePresence } from 'framer-motion';

// const Login = ({ setUser }) => {
//     const [activeType, setActiveType] = useState('N3');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [companyId, setCompanyId] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const loginTypes = [
//         { name: 'N3', label:  'Professional', icon: '👤'  },
//         { name: 'N4', label:'Corporate Admin', icon:  '💼' },
        
//     ];

//     const handleLoginTypeChange = (type) => {
//         setActiveType(type);
//         setError(''); // Clear any errors when switching tabs
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // We'll pass the role from the activeType
//             const { token, role } = await loginUser(email, password, activeType === 'N4' ? companyId : null);
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
//         <div className={styles.loginContainer}>
//             <div className={styles.loginForm}>
//                 {/* Brand Logo */}
//                 <img src={brand_logo} alt="SenseKip Logo" className={styles.logo} />

//                 <h2>Welcome to SenseKip</h2>
               

//                 {/* Tab System */}
//                 <div className={styles.toggleContainer}>
//                     {loginTypes.map((type) => (
//                         <button
//                             key={type.name}
//                             onClick={() => handleLoginTypeChange(type.name)}
//                             className={`${styles.toggleButton} ${activeType === type.name ? styles.active : ''}`}
//                         >
//                             <span>{type.icon} {type.label}</span>
//                         </button>
//                     ))}
//                 </div>

//                 {/* Fixed height form container */}
//                 <div className={styles.formContainer}>
//                     {/* Login Forms with Animation */}
//                     <AnimatePresence mode="wait">
//                         {activeType === 'N3' && (
//                             <motion.form
//                                 key="individual"
//                                 initial={{ opacity: 0, x: -10 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 exit={{ opacity: 0, x: 10 }}
//                                 transition={{ duration: 0.2 }}
//                                 onSubmit={handleSubmit}
//                                 className={styles.form}
//                             >
//                                 <input
//                                     type="email"
//                                     placeholder="Email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     required
//                                     className={styles.input}
//                                 />
//                                 <input
//                                     type="password"
//                                     placeholder="Password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     required
//                                     className={styles.input}
//                                 />
//                                 <button type="submit" className={styles.button}>
//                                     Login
//                                 </button>
//                             </motion.form>
//                         )}
                        
//                         {activeType === 'N4' && (
//                             <motion.form
//                                 key="professional"
//                                 initial={{ opacity: 0, x: 10 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 exit={{ opacity: 0, x: -10 }}
//                                 transition={{ duration: 0.2 }}
//                                 onSubmit={handleSubmit}
//                                 className={styles.form}
//                             >
//                                 <input
//                                     type="text"
//                                     placeholder="Company ID"
//                                     value={companyId}
//                                     onChange={(e) => setCompanyId(e.target.value)}
                                    
//                                     className={styles.input}
//                                 />
//                                 <input
//                                     type="email"
//                                     placeholder="Email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     required
//                                     className={styles.input}
//                                 />
//                                 <input
//                                     type="password"
//                                     placeholder="Password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     required
//                                     className={styles.input}
//                                 />
//                                 <button type="submit" className={styles.button}>
//                                     Login
//                                 </button>
//                             </motion.form>
//                         )}
//                     </AnimatePresence>
//                 </div>

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
import styles from './Login.module.css';
import brand_logo from "../figures/sense.jpg";
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../components/LoadingSpinner';

const Login = ({ setUser }) => {
    const [activeType, setActiveType] = useState('N3');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const loginTypes = [
        { name: 'N3', label: 'Professional', icon: '👤' },
        { name: 'N4', label: 'Corporate Admin', icon: '💼' },
    ];

    const handleLoginTypeChange = (type) => {
        setActiveType(type);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        try {
            const { token, role } = await loginUser(email, password, activeType === 'N4' ? companyId : null);
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            setUser({ token, role });

            if (role === "N3") {
                navigate('/table');
            } else if (role === "N4") {
                navigate('/professional-dashboard');
            } else {
                setError("Unknown role. Please contact support.");
            }
        } catch (err) {
            setError('Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <motion.div 
                className={styles.loginForm}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <img src={brand_logo} alt="SenseKip Logo" className={styles.logo} />

                <h2>Welcome to SenseKip</h2>
               
                <div className={styles.toggleContainer}>
                    {loginTypes.map((type) => (
                        <button
                            key={type.name}
                            onClick={() => handleLoginTypeChange(type.name)}
                            className={`${styles.toggleButton} ${activeType === type.name ? styles.active : ''}`}
                        >
                            <span>{type.icon} {type.label}</span>
                        </button>
                    ))}
                </div>

                <div className={styles.formContainer}>
                    <AnimatePresence mode="wait">
                        {activeType === 'N3' && (
                            <motion.form
                                key="individual"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                                onSubmit={handleSubmit}
                                className={styles.form}
                            >
                                <div className={styles.inputWrapper}>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className={styles.input}
                                    />
                                </div>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className={styles.input}
                                    />
                                </div>
                                <button type="submit" className={styles.button} disabled={isLoading}>
                                    {isLoading ? <LoadingSpinner size="small" /> : 'Login'}
                                </button>
                            </motion.form>
                        )}
                        
                        {activeType === 'N4' && (
                            <motion.form
                                key="professional"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                onSubmit={handleSubmit}
                                className={styles.form}
                            >
                                <div className={styles.inputWrapper}>
                                    <input
                                        type="text"
                                        placeholder="Company ID"
                                        value={companyId}
                                        onChange={(e) => setCompanyId(e.target.value)}
                                        className={styles.input}
                                    />
                                </div>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className={styles.input}
                                    />
                                </div>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className={styles.input}
                                    />
                                </div>
                                <button type="submit" className={styles.button} disabled={isLoading}>
                                    {isLoading ? <LoadingSpinner size="small" /> : 'Login'}
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <div className={styles.links}>
                    <a href="/forgot-password">Forgot Password?</a>
                    <a href="/signup">Don't have an account? Sign Up</a>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;