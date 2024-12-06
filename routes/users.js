const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Fetch all users
router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find(); // Retrieve all users
        res.status(200).json(allUsers); // Send the list of users
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve users.', details: err.message });
    }
});

// Register a new user
router.post('/', async (req, res) => {
    const { username, PIN, email, balance } = req.body;
    console.log('Creating user:', username);

    try {
        // Check if the username already exists
        const usernameTaken = await User.findOne({ username });
        if (usernameTaken) {
            return res.status(400).json({ error: 'The username is already in use.' });
        }
        const encryptedPIN = await bcrypt.hash(String(PIN), 10);
        const newUser = new User({
            username,
            PIN: encryptedPIN, // Save the encrypted PIN
            email,
            balance,
        });

        const savedUser = await newUser.save(); 
        res.status(201).json(savedUser); // Respond with the saved user data
    } catch (err) {
        res.status(400).json({ error: 'Error while creating user.', details: err.message });
    }
});

// Validate user credentials
router.post('/validate-user', async (req, res) => {
    // console.log(req)
    const { username, PIN } = req.body;

    try {
        // Locate the user by username
        const userRecord = await User.findOne({ username });
        if (!userRecord) {
            return res.status(404).json({ error: 'No user found with the provided username.' });
        }

        // Compare the provided PIN with the stored hashed PIN
        const isMatch = await bcrypt.compare(String(PIN), userRecord.PIN);
        
        if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect PIN provided.' });
        }

        // If valid, send back the user ID
        res.status(200).json({ userId: userRecord._id });
    } catch (err) {
        console.error('Error during user validation:', err);
        res.status(500).json({ error: 'Server error while validating user.', details: err.message });
    }
});

module.exports = router;
