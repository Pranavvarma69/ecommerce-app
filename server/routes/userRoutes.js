const express = require('express');
const router = express.Router();
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const userexists = await user.findOne({ email });
    if (userexists) return res.status(400).json({ message: 'User already exists' });

    // ❌ REMOVE manual bcrypt.hash here
    // Just pass raw password; it will be hashed by Mongoose middleware
    const newUser = await user.create({ name, email, password });

    if (newUser) {
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: token
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
});

router.post("/login", async (req, res) => {
    console.log("/login route hit"); 
    const { email, password } = req.body;
    console.log("Login Request Body:", req.body);
  
    try {
      const foundUser = await user.findOne({ email }); // <-- Fix here
      console.log("User found:", foundUser);
  
      if (!foundUser) {
        console.log("❌ User not found");
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      const isMatch = await bcrypt.compare(password, foundUser.password);
      console.log("Password match result:", isMatch);
  
      if (!isMatch) {
        console.log("❌ Incorrect password");
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      console.log("✅ Login successful, token:", token);
  
      res.status(200).json({
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        token,
      });
    } catch (err) {
      console.error("🔥 Login error:", err);
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;