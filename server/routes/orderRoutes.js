const express = require("express");
const router = express.Router();
const Order = require("../models/order"); // adjust path

// Create new order
router.post("/", async (req, res) => {
    try {
      const { name,address, city, postalCode, paymentMethod, orderItems, totalPrice } = req.body;
  
      if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: "No order items" });
      }
  
      const newOrder = new Order({
        user: null,
        orderItems: orderItems.map(item => ({
          product: item._id,
          qty: item.quantity,
        })),
        shippingAddress: { name,address, city, postalCode, country: "India" },
        paymentMethod,
        totalPrice,
      });
  
      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating order" });
    }
  });

module.exports = router;