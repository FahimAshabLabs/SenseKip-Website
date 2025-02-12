import React from 'react';
import './CreateUserModal.css';

const CreateUserModal = ({ newUser, setNewUser, handleCreateUser, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Create Professional User</h3>
                <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                <input type="text" placeholder="First Name" value={newUser.first_name} onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })} />
                <input type="text" placeholder="Last Name" value={newUser.last_name} onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })} />
                <input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                <div className="modal-buttons">
                    <button className="create-button" onClick={handleCreateUser}>Create</button>
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CreateUserModal;
