/******all the required imports are in the same file***/
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;
const promisifiedJWTSign = promisify(jwt.sign);
const promisifiedJWTVerify = promisify(jwt.verify);
const otpGenerator = require("../utils/generateOtp");
const { SECRET_KEY } = process.env;
// never -> sync in your server 
const fs = require("fs");
const path = require("path");
const sendEmailHelper = require('../utils/dynamicMailSender');


const pathToOtpHTML = path.join(__dirname, "../", "templates", "otp.html");
const HtmlTemplateString = fs.readFileSync(pathToOtpHTML, "utf-8");

const signupController = async (req, res) => {
    try {
        // add it to the db 
        const userObject = req.body
        //   data -> req.body
        let newUser = await UserModel.create(userObject);
        // send a response 
        res.status(201).json({
            "message": "user created successfully",
            user: newUser,
            status: "success"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message,
            status: "success"
        })
    }
}
const loginController = async (req, res) => {
    try {

        /***
         * 1. enable login -> tell the client that user is logged In
         *      a. email and password 
         **/

        let { email, password } = req.body;
        let user = await UserModel.findOne({ email });
        if (user) {
            let areEqual = password == user.password;
            if (areEqual) {
                // user is authenticated
                /* 2. Sending the token -> people remember them
                       * */
                // payload : id of that user 
                let token = await promisifiedJWTSign({ id: user["_id"] }, SECRET_KEY);
                console.log("Setting cookie", token);
                res.cookie("JWT", token, {
                    httpOnly: true,
                    secure: false,  // For HTTP local development, set to true for HTTPS
                    sameSite: 'Lax',  // 'None' requires secure to be true
                    maxAge: 3600000  // 1 hour
                });
                res.status(200).json({
                    status: "success",
                    message: "user logged In",
                    token: token
                })
            } else {
                console.log("err", err)
                res.status(404).json({
                    status: "failure",
                    message: "email or password is incorrect"
                })
            }

        } else {
            res.status(404).json({
                status: "failure",
                message:
                    "user not found with creds"
            })
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "failure",
            message: err.message
        })
    }
}
const forgetPasswordController = async (req, res) => {
    try {
        // -> send his email 
        let { email } = req.body;
        //  check for the email -> exist or not
        let user = await UserModel.findOne({ email: email })
        if (user) {
            // exists ->
            const otp = otpGenerator();

            // 1. send the Email -> token
            await sendEmailHelper(otp, HtmlTemplateString, user.name, user.email)
            // 2. save that token in DB 
            user.token = otp;
            user.otpExpiry = Date.now() + 1000 * 60 * 5;
            // if you update an object -> model
            await user.save();

            res.status(200).json({
                message: "user updated",
                status: "success",
                otp: otp,
                userId: user.id
            })
        } else {
            //  if not -> return -> no user found
            res.status(404).json({
                status: "failure",
                message: "no user with this email id found"
            })
        }

    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure"
        })
    }
}
const resetPasswordController = async function (req, res) {
    //  -> otp 
    //  newPassword and newConfirmPassword 
    // -> params -> id 
    try {
        const userId = req.params.userId;
        const { password, confirmPassword, otp } = req.body;
        console.log(password, confirmPassword, otp);
        /****
         * 1. search user using id
         * 
         *      a.  not found -> invalid otp or session  
         *      b. it's found 
         *                  -> get the token  is matching&&check it's expiry>currentTime 
         *                          -> update the user's password
         *                              
         * **/

        const user = await UserModel.findById(userId);
        if (user) {
            if (otp && user.token == otp) {
                let currentTime = Date.now();
                if (currentTime < user.otpExpiry) {
                    user.confirmPassword = confirmPassword;
                    user.password = password;
                    delete user.token;
                    delete user.otpExpiry
                    await user.save();
                    res.status(200).json({
                        "status": "success",
                        message: "your password is updated"
                    })
                }
            } else {
                res.status(404).json({
                    status: "failure",
                    message: "otp is not found or wrong"
                })
            }

        } else {
            res.status(404).json({
                status: "failure",
                message: "no user with this email id found"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure"
        })
    }


}

/*****************middleware**********************/

const protectRouteMiddleWare = async function (req, res, next) {
    try {
        let jwttoken = req.cookies.JWT;
        let decryptedToken = await promisifiedJWTVerify(jwttoken, SECRET_KEY);

        if (decryptedToken) {
            let userId = decryptedToken.id;
            console.log("protectRouteMiddleWare", userId, req.params);
            // adding the userId to the req object
            req.userId = userId;
            console.log("authenticated");
            next();
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure"
        })

    }
}

const isValidUser = async function (req, res, next) {
    const { userId } = req;
    const { elementId } = req.params;

    let user = await UserModel.findById(userId);
    if (user.role != "admin") {
        // Check if the user ID from the JWT matches the elementId from the URL params
        if (userId !== elementId) {
            return res.status(403).json({
                status: "failure",
                message: "Unauthorized access: User ID does not match."
            });
        }
    }
    next();
}

const isAdminMiddleWare = async function (req, res, next) {
    // has to check whether the role of user is admin or not 
    try {
        let id = req.userId;
        console.log(id);
        let user = await UserModel.findById(id);
        console.log(user);
        if (user.role == "admin") {
            console.log("authorized admin");

            next();
        } else {
            console.log("returning back ")
            res.status(401).json({
                status: "failure",
                "message": "You are not authorized to do this action "
            })
        }

    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "failure"
        })

    }

}

const isAuthorizedMiddleWare = function (allowedRoles) {
    return async function (req, res, next) {
        try {
            let id = req.userId;
            let user = await UserModel.findById(id);
            let isAuthorized = allowedRoles.includes(user.role);
            if (isAuthorized) {
                console.log("authorized user");
                next();
            } else {
                console.log("returning back ")
                res.status(401).json({
                    status: "failure",
                    "message": "You are not authorized to do this action "
                })
            }

        } catch (err) {
            res.status(500).json({
                message: err.message,
                status: "failure"
            })

        }
    }
}


const logoutController = function (req, res) {
    res.cookie("JWT", "dsjfbmdjbhsf", { maxAge: Date.now(), httpOnly: true, path: "/" });

    res.status(200).json({
        status: "success",
        message: "user logged out "
    })
}

module.exports = {
    signupController,
    loginController,
    forgetPasswordController,
    resetPasswordController,
    protectRouteMiddleWare,
    isValidUser,
    isAdminMiddleWare,
    isAuthorizedMiddleWare,
    logoutController
}