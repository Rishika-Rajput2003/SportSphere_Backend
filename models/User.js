const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define schema for User details
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,  // Username must be unique
  },
  PIN: {
    type: String,
    required: true,  // PIN for the user, to be hashed before saving
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Email must be unique
  },
  balance: {
    type: Number,
    default: 0,  // Default balance is 0
  },
});

module.exports = mongoose.model('User', userSchema);
