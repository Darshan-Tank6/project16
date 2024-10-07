const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  try {
    const { name, department, division, class: userClass, mobileNumber, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, department, division, class: userClass, mobileNumber, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).redirect('/login');
    
  } catch (error) {
    res.status(500).send('Error registering user');
  }
  
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid email or password');
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });
  res.redirect('/user-details');
  // res.status(200).send('Logged in successfully');
  
});

// Get user details
router.get('/user-details', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send('Unauthorized');

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(401).send('Unauthorized');
    const user = await User.findById(decoded.id);
    res.json(user);
  });
});

// Get user role
router.get('/user-role', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send('Unauthorized');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send('Unauthorized');
    res.json({ role: decoded.role });
  });
});

// Logout user
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).send('Logged out successfully');
});

module.exports = router;
