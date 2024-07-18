const dotenv = require('dotenv');
const express = require('express');
const Razorpay = require('razorpay');
const shortid = require('shortid');



dotenv.config();
const { PORT, PUBLIC_KEY, PRIVATE_KEY } = process.env;
const app = express();
app.use(express.json());

const amount = 500;
const curreny = 'INR';
const payment_capture = 1;

const checkoutController = (req, res) => {
    try {

        const instance = new Razorpay({
            key_id: PUBLIC_KEY,
            key_secret: PRIVATE_KEY,
        });

        var options = {
            amount: amount,  // amount in the smallest currency unit
            currency: curreny,
            receipt: shortid.generate(),
            payment_capture:  payment_capture
        };

        instance.orders.create(options, function(err, order) {
            res.status(201).json({
                status: "success",
                message: {
                    id: order.id,
                    currency: order.currency,
                    amount: order.amount,
                    receipt: order.receipt
                }
            });
        });

        // const orderObj = instance.orders.create(options);

        // // console.log(orderObj);

        // res.status(201).json({
        //     status: "success",
        //     message: {
        //         id: orderObj.id,
        //         currency: orderObj.currency,
        //         amount: orderObj.amount
        //     }
        // });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "failure",
            message:"Internal server error"
        });
    }
}

const paymentVerificationController = (req, res) => {

    try {
        // need to use webhook of razorpay

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "failure",
            message:"Internal server error"
        });
    }
}

app.post('/checkout', checkoutController);
app.post('/verification', paymentVerificationController);

app.listen(PORT, ()=>{
 console.log(`Listening on port ${PORT}`);
});