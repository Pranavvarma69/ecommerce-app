// src/pages/LoginPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';

const LoginPage = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((res) => {
        console.log('Login success:', res);
      })
      .catch((err) => {
        console.log('Login failed:', err);
      });
  };

  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        <div style={formContainerStyle}>
          <h2 style={headingStyle}>Login to Your Account</h2>
          {error && <p style={errorStyle}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setemail(e.target.value)}
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setpassword(e.target.value)}
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '80vh',
  backgroundColor: '#f5f5f5',
  padding: '1rem',
};

const formContainerStyle = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '400px',
};

const headingStyle = {
  textAlign: 'center',
  marginBottom: '1.5rem',
  color: '#333',
};

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '0.75rem',
  marginBottom: '1rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '1rem',
};

const buttonStyle = {
  width: '100%',
  padding: '0.75rem',
  backgroundColor: '#3498db',
  color: 'white',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem',
};

const errorStyle = {
  color: 'red',
  marginBottom: '1rem',
  textAlign: 'center',
};

export default LoginPage;