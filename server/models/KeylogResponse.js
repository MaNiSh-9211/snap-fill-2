const mongoose = require('mongoose');

// Define the KeylogResponse schema
const KeylogResponseSchema = new mongoose.Schema({
    questionNumber: String,
    response: String,
    submittedAt: { type: Date, default: Date.now },
    keylogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Keylog', required: true }  // Add reference to Keylog
});

module.exports = mongoose.model('KeylogResponse', KeylogResponseSchema);
