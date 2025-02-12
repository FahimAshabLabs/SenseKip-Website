// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { fetchUsers, deleteUser, updateUser } from '../services/api';
// import './ManageUsers.css';
// import Navbar from "../components/Navbar"; // Import Navbar


// const ManageUsers = ({ user }) => {
//     const [users, setUsers] = useState([]);
//     const [editingUser, setEditingUser] = useState(null);
//     const [updatedData, setUpdatedData] = useState({ first_name: '', last_name: '' });
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         setUsers(null);
//         navigate('/login');
//     };

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

//     return (
//         <div className="manage-users-container">


//             <Navbar handleLogout={handleLogout} /> {/* Use Navbar Component */}




//             <div className="content">
//                 <h2>Manage Users</h2>
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
//                                             <input
//                                                 type="text"
//                                                 value={updatedData.first_name}
//                                                 onChange={(e) => setUpdatedData({ ...updatedData, first_name: e.target.value })}
//                                             />
//                                             <input
//                                                 type="text"
//                                                 value={updatedData.last_name}
//                                                 onChange={(e) => setUpdatedData({ ...updatedData, last_name: e.target.value })}
//                                             />
//                                             <input
//                                                 type="email"
//                                                 value={updatedData.email}
//                                                 onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
//                                             />
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
//         </div>
//     );
// };

// export default ManageUsers;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, deleteUser, updateUser } from '../services/api';
import './ManageUsers.css';
import Navbar from '../components/Navbar'; // Import Navbar

const ManageUsers = ({ user }) => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [updatedData, setUpdatedData] = useState({ first_name: '', last_name: '', email: '' });
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUsers([]); // Fix: Set to empty array instead of null
        navigate('/login');
    };

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        loadUsers();
    }, [user]);

    const loadUsers = async () => {
        if (!user?.token) return; // Fix: Ensure token exists before fetching

        try {
            const data = await fetchUsers(user.token);
            setUsers(data || []); // Fix: Ensure users is always an array
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser(user.token, userId);
                loadUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleEditClick = (user) => {
        setEditingUser(user.id);
        setUpdatedData({ first_name: user.first_name, last_name: user.last_name, email: user.email });
    };

    const handleUpdate = async () => {
        try {
            await updateUser(user.token, editingUser, updatedData);
            setEditingUser(null);
            loadUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="manage-users-container">
            <Navbar handleLogout={handleLogout} /> {/* Navbar Component */}
            <div className="main-content">
                <h2>Manage Users</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        {editingUser === user.id ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={updatedData.first_name}
                                                    onChange={(e) =>
                                                        setUpdatedData({ ...updatedData, first_name: e.target.value })
                                                    }
                                                />
                                                <input
                                                    type="text"
                                                    value={updatedData.last_name}
                                                    onChange={(e) =>
                                                        setUpdatedData({ ...updatedData, last_name: e.target.value })
                                                    }
                                                />
                                                <input
                                                    type="email"
                                                    value={updatedData.email}
                                                    onChange={(e) =>
                                                        setUpdatedData({ ...updatedData, email: e.target.value })
                                                    }
                                                />
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
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" style={{ textAlign: 'center' }}>No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
