// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { fetchUsers, deleteUser, updateUser, createUser } from '../services/api';
// import './ManageUsers.css';
// import Navbar from '../components/Navbar';
// import CreateUserModal from '../components/CreateUserModal';

// const ManageUsers = ({ user }) => {
//     const [users, setUsers] = useState([]);
//     const [editingUser, setEditingUser] = useState(null);
//     const [updatedData, setUpdatedData] = useState({ first_name: '', last_name: '', email: '' });
//     const [showCreateUserModal, setShowCreateUserModal] = useState(false);
//     const [newUser, setNewUser] = useState({ email: '', first_name: '', last_name: '', password: '' });
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!user) {
//             navigate('/login');
//             return;
//         }
//         loadUsers();
//     }, [user]);

//     const loadUsers = async () => {
//         try {
//             const data = await fetchUsers(user.token);
//             setUsers(data);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     const handleDelete = async (userId) => {
//         if (window.confirm('Are you sure you want to delete this user?')) {
//             await deleteUser(user.token, userId);
//             loadUsers();
//         }
//     };

//     const handleEditClick = (user) => {
//         setEditingUser(user.id);
//         setUpdatedData({ first_name: user.first_name, last_name: user.last_name, email: user.email });
//     };

//     const handleUpdate = async () => {
//         await updateUser(user.token, editingUser, updatedData);
//         setEditingUser(null);
//         loadUsers();
//     };

//     const handleCreateUser = async () => {
//         if (!newUser.email || !newUser.first_name || !newUser.last_name || !newUser.password) {
//             setError('All fields are required.');
//             return;
//         }

//         try {
//             await createUser(user.token, newUser);
//             setShowCreateUserModal(false);
//             setNewUser({ email: '', first_name: '', last_name: '', password: '' });
//             setError('');
//             loadUsers();
//         } catch (error) {
//             setError('Failed to create user. Please try again.');
//             console.error('Failed to create user:', error);
//         }
//     };

//     return (
//         <div className="manage-users-container">
//             <Navbar />
//             <div className="content">
//                 <h2>Manage Users</h2>
//                 <button className="add-user-button" onClick={() => setShowCreateUserModal(true)}>
//                     + Add User
//                 </button>

//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user) => (
//                             <tr key={user.id}>
//                                 <td>
//                                     {editingUser === user.id ? (
//                                         <>
//                                             <input type="text" value={updatedData.first_name} onChange={(e) => setUpdatedData({ ...updatedData, first_name: e.target.value })} />
//                                             <input type="text" value={updatedData.last_name} onChange={(e) => setUpdatedData({ ...updatedData, last_name: e.target.value })} />
//                                             <input type="email" value={updatedData.email} onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })} />
//                                         </>
//                                     ) : (
//                                         `${user.first_name} ${user.last_name}`
//                                     )}
//                                 </td>
//                                 <td>{user.email}</td>
//                                 <td>
//                                     {editingUser === user.id ? (
//                                         <button onClick={handleUpdate}>Save</button>
//                                     ) : (
//                                         <>
//                                             <button onClick={() => handleEditClick(user)}>Edit</button>
//                                             <button onClick={() => handleDelete(user.id)}>Delete</button>
//                                         </>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {showCreateUserModal && (
//                 <CreateUserModal 
//                     newUser={newUser} 
//                     setNewUser={setNewUser} 
//                     handleCreateUser={handleCreateUser} 
//                     onClose={() => setShowCreateUserModal(false)} 
//                 />
//             )}
//         </div>
//     );
// };

// export default ManageUsers;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, deleteUser, updateUser, createUser } from '../services/api';
import Navbar from '../components/Navbar';
import CreateUserModal from '../components/CreateUserModal';
import styles from './ManageUsers.module.css'; // Import the CSS module

const ManageUsers = ({ user }) => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [updatedData, setUpdatedData] = useState({ first_name: '', last_name: '', email: '' });
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const [newUser, setNewUser] = useState({ email: '', first_name: '', last_name: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        loadUsers();
    }, [user]);

    const loadUsers = async () => {
        try {
            const data = await fetchUsers(user.token);
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            await deleteUser(user.token, userId);
            loadUsers();
        }
    };

    const handleEditClick = (user) => {
        setEditingUser(user.id);
        setUpdatedData({ first_name: user.first_name, last_name: user.last_name, email: user.email });
    };

    const handleUpdate = async () => {
        await updateUser(user.token, editingUser, updatedData);
        setEditingUser(null);
        loadUsers();
    };

    const handleCreateUser = async () => {
        if (!newUser.email || !newUser.first_name || !newUser.last_name || !newUser.password) {
            setError('All fields are required.');
            return;
        }

        try {
            await createUser(user.token, newUser);

            setShowCreateUserModal(false);
            setNewUser({ email: '', first_name: '', last_name: '', password: '' });
            setError('');
            loadUsers();
        } catch (error) {
            setError('Failed to create user. Please try again.');
            console.error('Failed to create user:', error);
        }
    };

    return (
       <div>
            
            <div className={styles["manage-users-container"]}>
            <Navbar />
            <div className={styles.content}>
                <h2>Manage Users</h2>
                <button className={styles["add-user-button"]} onClick={() => setShowCreateUserModal(true)}>
                    + Add User
                </button>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    {editingUser === user.id ? (
                                        <>
                                            <input type="text" value={updatedData.first_name} onChange={(e) => setUpdatedData({ ...updatedData, first_name: e.target.value })} />
                                            <input type="text" value={updatedData.last_name} onChange={(e) => setUpdatedData({ ...updatedData, last_name: e.target.value })} />
                                            <input type="email" value={updatedData.email} onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })} />
                                        </>
                                    ) : (
                                        `${user.first_name} ${user.last_name}`
                                    )}
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    {editingUser === user.id ? (
                                        <button onClick={handleUpdate}>Save</button>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEditClick(user)}>Edit</button>
                                            <button onClick={() => handleDelete(user.id)}>Delete</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showCreateUserModal && (
                <CreateUserModal 
                    newUser={newUser} 
                    setNewUser={setNewUser} 
                    handleCreateUser={handleCreateUser} 
                    onClose={() => setShowCreateUserModal(false)} 
                />
            )}
        </div>
       </div>
    );
};

export default ManageUsers;
