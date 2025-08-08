import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        backgroundColor: '#e74c3c',
        border: 'none',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;