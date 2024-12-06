const express = require('express');
const Booking = require('../models/Booking');
const Center = require('../models/Center');
const Sport = require('../models/Sport');
const User = require('../models/User');

const router = express.Router();

// Fetch all bookings with detailed references
router.get('/', async (req, res) => {
    try {
        const allBookings = await Booking.find()
            .populate('location', 'location') // Include only the location field from Center
            .populate('sport', 'name') // Include only the name field from Sport
            .populate('court', 'number') // Include court details
            .populate('user', 'username'); // Include only the username field from User

        res.status(200).json(allBookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Add a new booking
router.post('/', async (req, res) => {
    const { location, sport, court, time, user, date } = req.body;

    try {
        // Verify the center and sport exist
        const foundCenter = await Center.findById(location);
        const foundSport = await Sport.findById(sport);

        if (!foundCenter || !foundSport) {
            return res.status(404).json({ error: 'Center or Sport not found' });
        }

        // Fetch existing bookings
        const currentBookings = await Booking.find();

        // Format the booking date
        const formattedDate = date.split('T')[0];

        // Check for conflicts with existing bookings
        const isConflict = currentBookings.some((existingBooking) => 
            existingBooking.location.toString() === foundCenter._id.toString() &&
            existingBooking.sport.toString() === foundSport._id.toString() &&
            existingBooking.court === court &&
            existingBooking.time === time &&
            existingBooking.date.toISOString().split('T')[0] === formattedDate
        );

        if (isConflict) {
            return res.status(400).json({ error: 'Time slot already booked.' });
        }

        // Create and save a new booking
        const newBooking = new Booking({
            location: foundCenter._id,
            sport: foundSport._id,
            court,
            time,
            user,
            date,
        });

        const createdBooking = await newBooking.save();
        res.status(201).json(createdBooking);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
