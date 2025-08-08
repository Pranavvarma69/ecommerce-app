// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './LogoutButton'; // make sure this path is correct

const Navbar = () => {
  const items = useSelector((state) => state.cart.items);
  const { userInfo } = useSelector((state) => state.user);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav
      style={{
        background: '#1e1e1e',
        color: 'white',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      }}
    >
      <h2 style={{ margin: 0 }}>🛒 MyShop</h2>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/cart" style={linkStyle}>Cart ({itemCount})</Link>
        <Link to="/checkout" style={linkStyle}>Checkout</Link>

        {userInfo ? (
          <>
            <span style={{ color: 'white' }}>Hi, {userInfo.name}</span>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        )}

        <Link to="/admin" style={linkStyle}>Admin</Link>
      </div>
    </nav>
  );
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: '500',
  fontSize: '1rem',
};

export default Navbar;