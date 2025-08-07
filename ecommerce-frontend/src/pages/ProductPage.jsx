// src/pages/ProductDetailsPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/navbar';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { products, loading, error } = useSelector((state) => state.product);

  const product = products.find((p) => p._id === id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fafafa' }}>
        <h1 style={{ textAlign: 'center' }}>{product.name}</h1>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }}
        />
        <p><strong>Price:</strong> ₹{product.price}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Category:</strong> {product.category || 'N/A'}</p>
        {/* Add more fields if your product has them */}
      </div>
    </>
  );
};

export default ProductDetailsPage;