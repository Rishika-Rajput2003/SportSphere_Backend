const mongoose = require('mongoose');

// Define schema for booking information
const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, // Link to the User model
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Center',
        required: true, // Link to the Center model
    },
    sport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sport',
        required: true, // Link to the Sport model
    },
    court: {
        type: Number,
        required: true, // Court number
    },
    time: {
        type: String,
        required: true, // Reserved time slot
    },
    date: {
        type: Date,
        required: true, // Booking date
    },
});

// Export the Booking model
module.exports = mongoose.model('Booking', bookingSchema);
