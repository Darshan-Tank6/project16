// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Your User model
const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  try {
    const { name, department, division, class: userClass, mobileNumber, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, department, division, class: userClass, mobileNumber, email, password: hashedPassword, role });
    await newUser.save();
    res.redirect('/login'); // Redirect to login page after successful registration
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

  // Set user ID and role in session
  req.session.userId = user._id;
  req.session.role = user.role;

  res.redirect('/user-details'); // Redirect to user details page after successful login
});

// User details route
router.get('/user-details', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login'); // Redirect to login if not authenticated
  }
  
  User.findById(req.session.userId)
    .then(user => {
      res.json(user); // Return user details as JSON
    })
    .catch(err => {
      res.status(500).send('Error fetching user details');
    });
});

// Logout user
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('/login'); // Redirect to login page after logout
  });
});

module.exports = router;
