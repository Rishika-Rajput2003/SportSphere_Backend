const Booking = require('../models/Booking');
const mongoose = require('mongoose');

exports.getBookings = async (req, res) => {
  const { centerId, sportId, date } = req.query;
  
  try {
    // Query bookings based on center, sport, and date
    const bookings = await Booking.find({ 
      center: centerId, 
      sport: sportId, 
      date: new Date(date).toISOString().split('T')[0] // Ensure the date is in the correct format
    });
    
    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: 'Error fetching bookings', details: err.message });
  }
};

exports.createBooking = async (req, res) => {
  const { userId, center, sport, court, date, startTime, endTime } = req.body;
  
  // Convert string IDs to ObjectId
  const userObjectId = mongoose.Types.ObjectId(userId);
  const centerObjectId = mongoose.Types.ObjectId(center);
  const sportObjectId = mongoose.Types.ObjectId(sport);
  const courtObjectId = mongoose.Types.ObjectId(court);
  
  try {
    // Check for existing booking at the same time for the same court
    const existingBooking = await Booking.findOne({
      court: courtObjectId,
      date,
      $or: [
        { startTime: { $lt: endTime, $gte: startTime } },  // Check for overlap with start time
        { endTime: { $gt: startTime, $lte: endTime } }     // Check for overlap with end time
      ]
    });

    if (existingBooking) {
      return res.status(400).json({ error: 'Time slot already booked' });
    }

    // Create new booking if no conflict found
    const newBooking = new Booking({
      user: userObjectId,
      center: centerObjectId,
      sport: sportObjectId,
      court: courtObjectId,
      date,
      startTime,
      endTime
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ error: 'Error creating booking', details: err.message });
  }
};
