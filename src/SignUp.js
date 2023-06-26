import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignUp.css';

const SignUp = () => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [role, setRole] = useState('');
const [message, setMessage] = useState('');

const handleSignUp = () => {
// Send signup request to the server
fetch('/signup', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, role }),
})
    .then((response) => response.json())
    .then((data) => {
    setMessage(data.message);
    if (data.success) {
        toast.success('Signed up successfully!');
    } else {
        toast.error(data.message);
    }
    })
    .catch((error) => {
    console.error('Error:', error);
    setMessage('An error occurred');
    toast.error('An error occurred');
    });
};

return (
<div className="signup-container">
    <h2>Sign Up</h2>
    <input
    type="text"
    placeholder="Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    />
    <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    />
    <select value={role} onChange={(e) => setRole(e.target.value)}>
    <option value="">Select Role</option>
    <option value="admin">Admin</option>
    <option value="user">User</option>
    </select>
    <button onClick={handleSignUp}>Sign Up</button>
    <p className="message">{message}</p>
    <Link to="/login" className="login-link">Back to Login</Link>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
</div>
);
};

export default SignUp;
