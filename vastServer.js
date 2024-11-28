const express = require('express');
const cors = require('cors')

const app = express();
const PORT = 3000;

// Middleware

app.use(express.json());
app.use(cors())
// In-memory storage for event counts
const eventCounts = {
    impression: 0,
    firstQuartile: 0,
    thirdQuartile:0,
    playCount:0,
    pauseCount:0,
    midpoint: 0,
    complete: 0,
};




// Route to handle event tracking
app.get('/:eventType', (req, res) => {
    const { eventType } = req.params;

    if (!eventCounts.hasOwnProperty(eventType)) {
        return res.status(400).json({ error: `Invalid event type: ${eventType}` });
    }

    // Increment the count for the event
    eventCounts[eventType]++;
    console.log(`Updated count for ${eventType}: ${eventCounts[eventType]}`);

    // Return the updated count
    res.json({ event: eventType, count: eventCounts[eventType] });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});




