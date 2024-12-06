const express = require('express');
const Sport = require('../models/Sport');
const Center = require('../models/Center');

const router = express.Router();

// Retrieve all sports
router.get('/', async (req, res) => {
    try {
        const allSports = await Sport.find(); // Fetch all sports
        res.status(200).json(allSports); // Respond with the list of sports
    } catch (err) {
        res.status(500).json({ error: 'Unable to fetch sports.', details: err.message });
    }
});

// Add a new sport and link it to a specific center
router.post('/:centerId', async (req, res) => {
    const { name, courts, timeSlots } = req.body;

    try {
        // Find the center by its ID
        const targetCenter = await Center.findById(req.params.centerId);

        if (!targetCenter) {
            return res.status(404).json({ error: 'Specified center not found.' });
        }

        // Initialize and save the new sport
        const sportToCreate = new Sport({
            name,
            courts,
            timeSlots,
            center: req.params.centerId, // Link to the target center
        });

        const createdSport = await sportToCreate.save();

        // Update the center's sports array
        targetCenter.sports.push(createdSport._id);
        await targetCenter.save();

        res.status(201).json(createdSport); // Respond with the new sport
    } catch (err) {
        res.status(400).json({ error: 'Failed to create sport.', details: err.message });
    }
});

module.exports = router;
