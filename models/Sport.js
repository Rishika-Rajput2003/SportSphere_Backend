const mongoose = require('mongoose');

// Define schema for sports details
const sportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // Name of the sport (e.g., Badminton, Tennis)
    },
    courts: {
        type: Number,
        required: true,  // Number of courts available for the sport
    },
    timeSlots: {
        type: [String],
        required: true,  // Available time slots for booking
    },
    center: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Center',
        required: true,  // Reference to the center offering the sport
    },
});

// Export the Sport model
module.exports = mongoose.model('Sport', sportSchema);
