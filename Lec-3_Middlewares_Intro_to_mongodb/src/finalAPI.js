const express = require('express');
const userRoutes = require('./routes/users.js');

const app = express();

// Middleware
app.use(express.json());

// Mounting the routes
app.use('/api/users', userRoutes); // /api/users/:id

const port = 8090;
const hostname = 'localhost';

app.listen(port, hostname, ()=>{
    console.log(`Server is running on http://${hostname}:${port}`)
})