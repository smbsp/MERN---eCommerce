const dotenv = require('dotenv');
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const UserModel = require('./models/UserModel');


/********************* including env variables *****************************/
dotenv.config();
const { PORT, DB_USER, DB_PASSWORD, SECRET_KEY } = process.env;

/********************** connection to our DB ********************************/
const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.jdq8n60.mongodb.net/?retryWrites=true&w=majority`;
console.log(dbURL)
mongoose.connect(dbURL).then(()=>{
    console.log('Mongo db conncted');
});

/*************************************************/
const app = express();

/*** to get the data in req.body **/
app.use(express.json());

/******* to get the cookie in req.cookies **/
app.use(cookieParser());


// Implement signup, login , protect routes, getuser, logout
const signupController = async(req,res) =>{
    try {

        const userObj = req.body;
        console.log(userObj);
        if(userObj) {
            let newUser = await UserModel.create(userObj);
            console.log(newUser);

            res.status(201).json({
                status: "success",
                message: "User has been created succesfully",
                user: userObj
            })
        }
    } catch (error) {
         res.status(500).json({
            status: "failure",
            message: "Internel Server Error"
        });
    }

}

const loginController = async(req,res) =>{
    const {email, password } = req.body;
    const user = await UserModel.findOne({email});
    console.log(user);

    if(!user) {
        return res.status(404).json({
            status: "failure",
            message: 'User not found'
        });
    }



    // check the password, if user exist in the mongodb or not
    const isPwdSame = password === user.password;
       try{
         console.log(isPwdSame);
         if(isPwdSame) {
            //generate the JWT
            jwt.sign(
                {id: user['_id']},
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
                        status: "success",
                        message: "User has been logged in"
                    });
                }
            )
         } else {
            return res.status(400).json({
                status: 'failure',
                message: 'Invalid Credentials'
            });
        }

       } catch(err) {
        console.log(err);
            return res.status(500).json({
                status: 'failure',
                message: 'Internal Server Error'
            });
       }

}

const protectRouteMiddleWare = (req, res, next) => {
    try {
          const { token } = req.cookies;
          const decodedToken = jwt.verify(token, SECRET_KEY);

          if( decodedToken) {
            const userId = decodedToken.id;
            req.userId = userId;
            next();
          }  
    } catch (error) {
        res.json({
            status: "failure",
            message: error.message
        })
    }
}

const getUserProfile = async(req,res) => {

 const id = req.userId;
 console.log(id);

 const userDetails = await UserModel.findById(id);

 const { name, email } = userDetails;
 res.status(200).json({
    status: 'success',
    message: "User data retrieved successfully",
    user: {
        name,
        email
    }
 })  
}

const logoutController = (req,res) =>{
   res.clearCookie('token');
   res.json({message: "You have successfully logout"});
}


/************routes***************/
/*
 * 1. /signup 
 * 2. /login 
 * 3. /getUser -> allows you to access getUserData if user is authenticated 
 */
app.post("/signup", signupController);
app.post("/login", loginController);
app.get("/getUser", protectRouteMiddleWare, getUserProfile);
// app.get("/users", protectRouteMiddleWare, getUsers);
app.get('/logout', logoutController);

// start the server
app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`)
});

