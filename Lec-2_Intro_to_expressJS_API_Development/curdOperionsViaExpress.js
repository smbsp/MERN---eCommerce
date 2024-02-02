const express = require('express');

const app = express();

/**
 * app.get() -> to serve the get http method which require the API name and a callback ->
 * contains 2 params - 
 *   1. req - object representing the request
 *   2. res - object representing the response
 * */

// app.get('/api/users', (req, res, next )=>{
//     console.log('I am inside in get() method')
//     res.status(200).json({
//         status:"success",
//         message: "got the get data"
//     });

//     next();
// });

// app.use((req, res, next )=>{

//     res.status(404).json({
//         status:"failure",
//         message: "no user found!"
//     });
// });


// it's built-in middleware function -> to add the data in the coming request of http request(req.body) 
app.use(express.json());

app.use((req, res, next)=>{
    
  console.log(req.body);
  next();
});



// app.get('/api/user:id', (req, res, next )=>{
//     console.log('I am inside in get() method')
//     res.status(200).json({
//         status:"success",
//         message: "got the get data"
//     });

//     next();
// });



// app.use((req, res)=>{
//     console.log('Next request has been seved');

//     console.log(req.body);

//     res.status(500).json({
//         status:"Internal",
//         message: "Internal Server error"
//     });

// });

app.post('/api/user',(req, res)=>{
    console.log('I am inside in post() method')
    res.status(200).json({
        status:"success",
        message: "got the post data"
    });
})

app.use((req, res)=>{
    res.status(404).json({
        status:"failure",
        message: "No data found!"
    });
});


const port = 7000;
const hostname = 'localhost';

app.listen(port, hostname, ()=>{
  console.log(`Server is up and running on http://${hostname}:${port}`);
});



