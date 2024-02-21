const dotenv = require('dotenv');
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');


dotenv.config();

const app = express();
app.use(cookieParser());

const { PORT, SECRET_KEY } = process.env;

//How to generate JWT (JSON Web Token)?
// const payload = {username: 'Ashwani Rajput'};

const payload = "1234";

const signinController = (req, res) => {
    try {

        jwt.sign(
            {data: payload},
            SECRET_KEY,
            {algorithm: 'HS256'},
            (err, token) => {

                if(err) {
                    throw new Error(err.message);
                }

                res.cookie("token", token, {
                    maxAge: 1000 * 60 * 30, // for 30 mins
                    httpOnly: true,
                });

                res.status(201).json({
                    accessToken: token
                });
            }
        )
        
    } catch (error) {
        res.json({
            status: "failure",
            message: error.message
        });
    }
}

//How to verify the JWT token?

const verificationController = (req, res) => {
    try {
          const { token } = req.cookies;
          const decodedToken = jwt.verify(token, SECRET_KEY);

          res.status(200).json({
            message: 'token has been decoded',
            decodedToken
          });
    } catch (error) {
        res.json({
            status: "failure",
            message: error.message
        })
    }

}


//*** Routes *****/

app.get('/signin', signinController);
app.get('/verify', verificationController);

// server -> run on a port 
app.listen(PORT, function () {
    console.log(` server is listening to ${PORT}`);
});