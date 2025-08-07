import React from 'react';
import Navbar from '../components/navbar';
import { removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const CartPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const handleQuantityChange = (_id, quantity) => {
    dispatch(updateQuantity({ _id, quantity: Number(quantity) }));
  };

  const handleRemove = (_id) => {
    dispatch(removeFromCart(_id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#f7f7f7', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '900px', margin: '2rem auto', background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>🛒 Your Shopping Cart</h2>

        {items.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '18px', color: '#888' }}>Your cart is empty.</p>
        ) : (
          <>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {items.map((item) => (
                <li key={item._id} style={{
                  borderBottom: '1px solid #ddd',
                  paddingBottom: '1rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h3 style={{ margin: 0 }}>{item.name}</h3>
                    <p style={{ margin: '0.25rem 0', color: '#444' }}>Price: ₹{item.price}</p>
                    <label style={{ fontSize: '14px' }}>Qty: </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                      style={{
                        width: '60px',
                        padding: '4px',
                        marginLeft: '8px',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                      }}
                    />
                  </div>
                  <button
                    onClick={() => handleRemove(item._id)}
                    style={{
                      background: '#ff4d4d',
                      color: '#fff',
                      border: 'none',
                      padding: '8px 14px',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
              <h3>Total: ₹{total}</h3>
              <button
                onClick={handleClearCart}
                style={{
                  background: '#444',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;