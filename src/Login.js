import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = ({ setRole }) => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const handleLogin = () => {
// Send login request to the server
fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
})
    .then((response) => response.json())
    .then((data) => {
    if (data.role) {
        setRole(data.role);
        toast.success('Logged in!');
    } else {
        toast.error(data.message);
    }
    })
    .catch((error) => {
    console.error('Error:', error);
    toast.error('An error occurred');
    });
};

return (
<div className="login-container">
    <h2>Login</h2>
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
    <button onClick={handleLogin}>Log In</button>
    <p className="message"></p>
    <Link to="/signup" className="signup-link">Sign Up</Link>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
</div>
);
};

export default Login;
