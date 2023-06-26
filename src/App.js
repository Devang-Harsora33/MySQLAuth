import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import User from './User';
import Admin from './Admin';

const App = () => {
  const [role, setRole] = useState('');

  useEffect(() => {
    // Check the user's role and set the appropriate role
    // This can be done based on your authentication logic
    // For demonstration purposes, let's assume the role is fetched from the server
    fetch('/getRole')
      .then((response) => response.json())
      .then((data) => {
        setRole(data.role);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
        {role === 'admin' && <Route path="/admin" element={<Navigate to = '/admin'/>} />}
        {role === 'user' && <Route path="/user" element={<Navigate to = '/user'/>} />}
      </Routes>
      {role === 'admin' && (
        <Link to="/admin">
          <button>Go To Admin Dashboard</button>
        </Link>
      )}
      {role === 'user' && (
        <Link to="/user">
          <button>Go to User Dashboard</button>
        </Link>
      )}
    </Router>
  );
};

export default App;
