const mongoose = require('mongoose');

const keylogSchema = new mongoose.Schema({
    deviceInfo: {
        type: Object, // Assuming `deviceInfo` is a nested object; adjust if it's more specific
        required: true,
    },
    questionNumber: {
        type: String, // The question number, stored as a string
        required: true,
    },
    loggedKeys: {
        type: String, // The logged keys as a string
        required: true,
    },
    lastTimestamp: {
        type: Date, // A timestamp for when the log was last updated
        required: true,
    },
}, { timestamps: true }); // Automatically adds `createdAt` and `updatedAt` fields

module.exports = mongoose.model('Keylog', keylogSchema);
