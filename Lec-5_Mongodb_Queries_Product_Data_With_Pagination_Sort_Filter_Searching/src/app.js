const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const userRoutes = require('./routes/userRouter');
const productRoutes = require('./routes/productRoutes');

const app = express();

dotenv.config();
const { PORT, DB_USER, DB_PASSWORD } = process.env;

console.log(DB_USER);

const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.jdq8n60.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(dbURL);

//Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// start the server
app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`)
});

