const express = require("express");
const BookingRouter = express.Router();
const shortid = require('shortid');
const BookingModel = require("../models/BookingModel");
const { protectRouteMiddleWare } = require("../controllers/AuthController");

const Razorpay = require("razorpay");
const UserModel = require("../models/UserModel");
const { PUBLIC_KEY, PRIVATE_KEY, WEBHOOK_SECERET } = process.env;
const razorpayInstance = new Razorpay({
    key_id: PUBLIC_KEY,
    key_secret: PRIVATE_KEY,
});

const initialBookingController = async (req, res) => {
    const userId = req.userId;
    const { productId } = req.params;
    const { priceAtThatTime } = req.body;
    const status = "pending";

    try {
        /**************create a booking document************/
        const bookingObject = await BookingModel.create({
            user: userId,
            product: productId,
            priceAtThatTime: priceAtThatTime,
            status: status 
        });

        console.log('booking data->', bookingObject);

        // fetch user data and add the order id or the booking id
        const userObject = await UserModel.findById(userId);
        
        userObject.bookings.push(bookingObject["_id"]);
        await userObject.save();
        console.log('userdata->', userObject);
        
        
        /****************initiating the payment*************/
        const amount = bookingObject.priceAtThatTime;
        const currency = "INR";
        const payment_capture = 1; 
        const options = {
            amount: amount * 100,  // amount in the smallest currency unit (paise)
            currency: currency,
            receipt: bookingObject["_id"],
            payment_capture:  payment_capture
        };
        
       console.log('razorpay', razorpayInstance.orders.create(options))
        const orderObject = await razorpayInstance.orders.create(options);
        console.log('oderObject->', orderObject);
        bookingObject.payment_order_id = orderObject.id;

        await bookingObject.save();

        // you send the order it to frontend 
        res.status(200).json({
            status: "success",
            message: "You order has been paced successfully",
            data: {
                id: orderObject.id,
                currency: orderObject.currency,
                amountinPaise: orderObject.amount
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "failure",
            message: err.message
        })
    }
}

const getAllBookings = async (req, res) => {
    try {
        
    } catch (err) {
        res.status(500).json({
            status: "failure",
            message: err.message
        })
    }

}

const verifyPaymentController = async function (req, res) {
    try {
        // this object -> sha256+webhook_secret
        const shasum = crypto.createHmac("sha256", WEBHOOK_SECERET);
        shasum.update(JSON.stringify(req.body));
        const freshSignature = shasum.digest("hex");
        const razorPaySign = req.headers["x-razorpay-signature"];
        // console.log(req.headers);
        console.log(freshSignature, razorPaySign);
        if (freshSignature == razorPaySign) {
            // ok
            console.log("Payment is verified", req.body);
            const orderId = req.body.payload.payment.entity.order_id;
            const bookingObject = await
                BookingModel.findOne({ payment_order_id: orderId });
            // your payment has been done 
            bookingObject.status = "success";
            delete bookingObject.payment_order_id
            await bookingObject.save();
            // 
            res.status(200).json({
                message: "OK",
            });
        } else {
            // there some tempering 
            res.status(403).json({ message: "Invalid" });
        }

    } catch (err) {
        res.status(500).json({
            status: "failure",
            message: err.message
        })
    }
}

BookingRouter.use(protectRouteMiddleWare);

BookingRouter.post("/:productId", initialBookingController)
BookingRouter.post("/verify", verifyPaymentController)
BookingRouter.get("/", getAllBookings);

module.exports = BookingRouter;