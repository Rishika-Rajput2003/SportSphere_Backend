const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const connectDB = require('./utils/db');
const centerRoutes = require('./routes/centers');
const bookingRoutes = require('./routes/bookings');
const sportRoutes = require('./routes/sports');
const userRoutes = require('./routes/users'); // Optional if authentication is needed
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Route middlewares
app.use('/api/centers', centerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/sports', sportRoutes);
app.use('/api/users', userRoutes); // Optional

// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
