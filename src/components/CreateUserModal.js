import React from 'react';
import styles from './CreateUserModal.module.css';

const CreateUserModal = ({ newUser, setNewUser, handleCreateUser, onClose }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h3>Create Professional User</h3>
                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="First Name"
                    value={newUser.first_name}
                    onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={newUser.last_name}
                    onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
                <div className={styles.modalButtons}>
                    <button className={styles.createButton} onClick={handleCreateUser}>
                        Create
                    </button>
                    <button className={styles.cancelButton} onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateUserModal;
