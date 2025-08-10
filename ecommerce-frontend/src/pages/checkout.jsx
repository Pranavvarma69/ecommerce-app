// src/pages/CheckoutPage.jsx
import React, { useState } from "react";
import Navbar from "../components/navbar";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import axios from "axios";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "credit",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!items.length) {
      alert("Your cart is empty!");
      return;
    }
    try {
      const { data } = await axios.post("/api/orders", {
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        paymentMethod: formData.paymentMethod,
        orderItems: items,
        totalPrice: totalAmount,
      });
      alert(`Order placed! Order ID: ${data._id}`);
      dispatch(clearCart());
    } catch (error) {
      console.error(error);
      alert("Error placing order. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          maxWidth: "900px",
          margin: "40px auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          padding: "20px",
          background: "#f9f9f9",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
        }}
      >
        {/* Cart Summary */}
        <div>
          <h2 style={{ marginBottom: "20px" }}>Your Order</h2>
          {items.length ? (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {items.map((item) => (
                <li
                  key={item.id}
                  style={{
                    padding: "10px 0",
                    borderBottom: "1px solid #ddd",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <strong>₹{item.price * item.quantity}</strong>
                </li>
              ))}
            </ul>
          ) : (
            <p>No items in cart</p>
          )}
          <h3 style={{ marginTop: "20px" }}>Total: ₹{totalAmount}</h3>
        </div>

        {/* Checkout Form */}
        <div>
          <h2 style={{ marginBottom: "20px" }}>Shipping & Payment</h2>
          <form
            onSubmit={handleCheckout}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
              <option value="cod">Cash on Delivery</option>
            </select>
            <button
              type="submit"
              style={{
                padding: "12px",
                background: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const inputStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "14px",
};

export default CheckoutPage;