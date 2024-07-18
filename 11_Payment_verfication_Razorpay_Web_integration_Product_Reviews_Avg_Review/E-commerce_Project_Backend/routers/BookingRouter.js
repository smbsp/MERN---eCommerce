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
            payment_capture: payment_capture
        };

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
        // write the booking logic here

        const allBookings = await BookingModel.find();
        res.status(201).json({
            status: "success",
            message: "All bookings have been fetched successfully",
            data: {
                allBookings
            }
        })


    } catch (err) {
        res.status(500).json({
            status: "failure",
            message: err.message
        })
    }
}

// This will be done during frontend integration
// const verifyPaymentController = async (req, res) => {
//     try {
//         // this object -> sha256+webhook_secret
//         const shasum = crypto.createHmac("sha256", WEBHOOK_SECERET);
//         // console.log("Verify data->", req.body);
//         shasum.update(JSON.stringify(req.body));
//         const freshSignature = shasum.digest("hex");
//         const razorPaySign = req.headers["x-razorpay-signature"];

//         console.log(freshSignature, razorPaySign);
//         if (freshSignature == razorPaySign) {
//             // ok
//             // write the logic here

//             // get the order id
//             // booking model to get payment_order_id
//             // also update the status from pending to success
//             // save this data in our DB

//             res.status(200).json({
//                 message: "OK",
//             });
//         } else {
//             // there some tempering 
//             res.status(403).json({ message: "Invalid" });
//         }

//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             status: "failure",
//             message: err.message
//         })
//     }
// }

const crypto = require('crypto');

const verifyPaymentController = async (req, res) => {
    try {
        const { WEBHOOK_SECRET } = process.env;
        if (!WEBHOOK_SECRET) {
            throw new Error('WEBHOOK_SECRET Key is not defined');
        }

        const { body } = req;
        const receivedSignature = req.headers["x-razorpay-signature"];

        if (!receivedSignature) {
            return res.status(400).json({ message: 'Razorpay signature missing in headers' });
        }

        const shasum = crypto.createHmac("sha256", WEBHOOK_SECRET);
        shasum.update(JSON.stringify(body));
        const computedSignature = shasum.digest('hex');

        if (computedSignature !== receivedSignature) {
            return res.status(403).json({ message: "Invalid signature. Integrity check failed" });
        }

        const { event, payload } = body;
        // Handle the event here, e.g., payment.success
        console.log('Handling event:', event);
        // Ensure proper handling of each event type

        res.status(200).json({ message: "Webhook processed successfully" });
    } catch (err) {
        console.error("Webhook handling error:", err);
        res.status(500).json({
            status: "failure",
            message: err.message
        });
    }
};

//BookingRouter.use(protectRouteMiddleWare);

// BookingRouter.post("/:productId", protectRouteMiddleWare, initialBookingController)
// BookingRouter.post("/verify", protectRouteMiddleWare, verifyPaymentController)
BookingRouter.post("/payment-webhook", verifyPaymentController);
BookingRouter.get("/", getAllBookings);

module.exports = BookingRouter;