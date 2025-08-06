const express = require('express');
const router = express.Router();
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const userexists = await user.findOne({ email });
    if (userexists) return res.status(400).json({ message: 'user already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({ name, email, password: hashedPassword });

    if (newUser) {
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        res.status(201).json({ token });
    } else {
        res.status(400).json({ message: 'invalid user data' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await user.findOne({ email });

    if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
        res.json({ token });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;