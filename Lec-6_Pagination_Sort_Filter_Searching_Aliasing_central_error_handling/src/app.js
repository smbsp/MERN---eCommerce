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

// to get the filter params
// app.use('/search', (req, res)=>{
//    console.log(req.query);
//    res.status(200).json({
//         message: 'Search Successfully',
//         data: req.query
//    })
// });



// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Central error handling and please maintain order to place this Central error handling middle.
// must come after the routes.
app.use((err, req, res, next)=>{
    console.log('in central error handler');
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'

    res.json({
        status: statusCode,
        message: message
    }); 
});

// start the server
app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`)
});

