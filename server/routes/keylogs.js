
const mongoose = require('mongoose');// if we dont add this then the delete query want word
const express = require('express');
const router = express.Router();
const Keylog = require('../models/keylog'); // Replace with your model
const KeylogResponse = require('../models/KeylogResponse'); // For responses

// Fetch keylogs one by one
router.get('/', async (req, res) => {
    try {
        const keylogs = await Keylog.find()//.limit(1); // Fetch one document at a time
        res.json(keylogs);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch keylogs' });
    }
});

// Add a new response

router.post('/responses', async (req, res) => {
    const { questionNumber, response, keylogId } = req.body;

    console.log('Received request to save response:', { questionNumber, response, keylogId });

    if (!questionNumber || !response || !keylogId) {
        console.log('Missing required fields');
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Check if the keylogId is valid and exists in the database
        const keylog = await Keylog.findById(keylogId);
        if (!keylog) {
            console.log('Keylog not found for the provided ID:', keylogId);
            return res.status(404).json({ error: 'Keylog not found for the provided ID' });
        }

        // Create a new response document
        const newResponse = new KeylogResponse({
            questionNumber,
            response,
            keylogId: keylog._id,  // Store the reference to the keylog document
        });

        await newResponse.save();
        console.log('Response saved successfully:', newResponse);

        // Send a proper JSON response
        return res.status(201).json({ message: "Response saved" });

    } catch (err) {
        console.error('Error occurred while saving response:', err);
        return res.status(500).json({ error: 'Failed to save response' });
    }
});

// Delete a specific question
// router.delete('/:id', async (req, res) => {
//     try {
//         await Keylog.findByIdAndDelete(req.params.id);
//         res.send('Question deleted successfully');
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to delete question' });
//     }
// });


// Delete a keylog by ID
router.delete('/:id', async (req, res) => {
    try {
        // Logging the ID received for debugging
        console.log('Attempting to delete keylog with ID:', req.params.id);

        // Finding and deleting the keylog
        const deletedKeylog = await Keylog.findByIdAndDelete(req.params.id);

        if (!deletedKeylog) {
            // Keylog not found
            console.error('Keylog not found:', req.params.id);
            return res.status(404).json({ error: 'Keylog not found' });
        }

        // Success
        console.log('Keylog deleted successfully:', deletedKeylog);
        res.status(200).json({ message: 'Question deleted successfully', deletedKeylog });
    } catch (err) {
        // Catching and logging any errors
        console.error('Error while deleting keylog:', err.message);
        res.status(500).json({ error: 'Failed to delete question', details: err.message });
    }
});


// Delete a specific response by keylogId
router.delete('/responses/:keylogId', async (req, res) => {
    const { keylogId } = req.params;

    try {
        console.log('Delete request received for keylogId:', keylogId);

        // Delete all responses related to the provided keylogId
        const deletedResponses = await KeylogResponse.deleteMany({ keylogId });

        if (deletedResponses.deletedCount === 0) {
            console.log('No responses found for the provided keylogId');
            return res.status(404).json({ error: 'No responses found for the provided keylogId' });
        }

        console.log(`Deleted ${deletedResponses.deletedCount} responses successfully`);
        res.json({ message: 'Responses deleted successfully' });
    } catch (err) {
        console.error('Error deleting responses:', err);
        res.status(500).json({ error: 'Failed to delete responses' });
    }
});

module.exports = router;
