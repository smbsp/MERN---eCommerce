const express = require('express');
const app = express();

// Middleware function that simulates an error
app.use((req, res, next) => {
    const error = new Error('Something went wrong!');
    next(error); // Pass the error to the next error handling middleware
});

// Route handler that simulates an error
app.get('/', (req, res, next) => {
    const error = new Error('Error in route handler!');
    next(error); // Pass the error to the next error handling middleware
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.message); // Log the error message
    res.status(500).send('An error occurred: ' + err.message);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
