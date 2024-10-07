// app.js
const express = require('express');
const session = require('express-session'); // Import the express-session package
const mongoose = require('mongoose'); // Import mongoose for MongoDB
const authRoutes = require('./routes/auth'); // Import your authentication route file
const path = require('path'); // Import path for serving static files

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up the session middleware
app.use(session({
  secret: 'your-secret-key', // Change this to a strong secret
  resave: false,
  saveUninitialized: true, // Don't create session until something stored
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Connect to MongoDB (make sure to replace with your connection string)
mongoose.connect('mongodb://localhost:27017/your_database', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a home route that redirects to the login page
app.get('/', (req, res) => {
    res.redirect('/auth/login'); // Change this to your actual login path
  });

// Use your auth routes
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
