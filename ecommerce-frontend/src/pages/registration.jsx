import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const { loading, error } = useSelector((state) => state.user);

  const registerHandler = async (e) => {
    e.preventDefault();
    console.log("Registering with:", { name, email, password });

    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
      navigate('/');
    } catch (err) {
      console.log('Registration failed:', err);
    }
  };

  return (
    <>
    <Navbar/>
    <div style={containerStyle}>
      <form style={formContainerStyle} onSubmit={registerHandler}>
        <h2 style={headingStyle}>Register</h2>
        {error && <p style={errorStyle}>{error}</p>}
        <input
          type='text'
          value={name}
          onChange={(e) => setname(e.target.value)}
          placeholder='Name'
          required
          style={inputStyle}
        />
        <input
          type='email'
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder='Email'
          required
          style={inputStyle}
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder='Password'
          required
          style={inputStyle}
        />
        <button type='submit' style={buttonStyle} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
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
  backgroundColor: '#2ecc71',
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

export default RegisterPage;