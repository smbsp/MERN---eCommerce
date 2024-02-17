const dotenv = require('dotenv');
const express = require('express');

const cookieParser = require('cookie-parser');

dotenv.config();
const { PORT } = process.env;
const app = express();

//app.use(express.json());

/**
 * Lets craete the 3 routes
 *    - home
 *    - products
 *    - clearCookie
 */

app.use(cookieParser());

app.get('/', (req, res)=>{
   // implement the server side httponly cookie
   /**
        name: name of the cookie
        value: value of the cookie
        options: optional but important
         maxAge: to set teh max age of the cookie.
         httpOnly: to make this cookie httponly so it can be accessed via server and can't be tempered.
   
    */

   res.cookie('prevpage', 'home', {
    maxAge: 7 * 24 * 60 * 60 * 1000, // for a week
    httpOnly: true
   });

    res.status(200).json({
        message: 'thank you for visiting us'
    })
});

// accessing the cookie
app.get('/products', (req, res)=>{
    console.log(req.cookies.prevpage);

    let messageStr = '';

    if(req.cookies.prevpage) {
        messageStr = `you have visted the ${req.cookies.prevpage} page`
    }

    res.status(201).json({
        message: 'thank you access the product page'
    })

});

app.get('/clearCookie', (req, res)=>{
    res.clearCookie("prevpage", {path:'/'});
    res.status(201).json({
        message: 'I have cleared the cookie'
    })
});

// start the server
app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`)
});

