import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/product/productSlice';
import { addToCart } from '../features/cart/cartSlice';
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading products...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>Error: {error}</p>;

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <Navbar />
      <h1 style={{ textAlign: 'center', margin: '2rem 0', fontSize: '2.5rem' }}>All Products</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2rem',
        padding: '0 2rem 2rem',
      }}>
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              borderRadius: '12px',
              backgroundColor: '#ffffff',
              padding: '1.5rem',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
              textAlign: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: '220px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}
            />
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{product.name}</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.8rem' }}>
              {product.description.slice(0, 70)}...
            </p>
            <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '1rem' }}>
              ₹{product.price}
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.75rem',
              marginTop: '0.5rem'
            }}>
              <button
                style={{
                  padding: '0.5rem 1.2rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
                onClick={() => navigate(`/product/${product._id}`)}
              >
                View
              </button>

              <button
                style={{
                  padding: '0.5rem 1.2rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;