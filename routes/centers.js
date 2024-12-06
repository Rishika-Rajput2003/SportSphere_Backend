const express = require('express');
const Center = require('../models/Center');

const router = express.Router();

// Retrieve all centers with associated sports
router.get('/', async (req, res) => {
    try {
        const allCenters = await Center.find().populate('sports'); // Populate sports field in Center
        res.status(200).json(allCenters);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve centers.', details: err.message });
    }
});

// Add a new center
router.post('/', async (req, res) => {
    const { location, sports } = req.body;

    try {
        const newCenter = new Center({
            location,
            sports,
        });

        const createdCenter = await newCenter.save(); // Save the new center
        res.status(201).json(createdCenter); // Respond with the newly created center
    } catch (err) {
        res.status(400).json({ error: 'Error creating center.', details: err.message });
    }
});

module.exports = router;
