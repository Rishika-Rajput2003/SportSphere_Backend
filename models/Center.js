const mongoose = require('mongoose');

// Define schema for center details
const centerSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,  // Specifies the location (e.g., Delhi, Mumbai)
    },
    sports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sport',  // Reference to the Sport model
    }],
});

// Export the Center model
module.exports = mongoose.model('Center', centerSchema);
