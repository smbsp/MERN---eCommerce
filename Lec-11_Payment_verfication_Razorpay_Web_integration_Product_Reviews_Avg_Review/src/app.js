const dotenv = require('dotenv');
const express = require('express');
const Razorpay = require('razorpay');
const shortid = require('shortid');
const crypto = require('crypto');
const cors = require('cors');

dotenv.config();
const { PORT, PUBLIC_KEY, PRIVATE_KEY, WEBHOOK_SECRET } = process.env;
const app = express();
app.use(cors());
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
        if(!WEBHOOK_SECRET){
            throw new Error('WEBHOOK_SECRET Key is not defined');
        }

        const { body, headers} = req; 
        const freshSignature = crypto.createHmac("sha256", WEBHOOK_SECRET).update(JSON.stringify(body)).digest('hex');

        console.log(freshSignature);

        const razopaySignature = headers['x-razorpay-signature'];

        if(!razopaySignature) {
            throw new Error('x-razorpay-signature is not being set in headers');
        }

        if(freshSignature === razopaySignature) {
            return res.status(200).json({
                message: "Ok"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "failure",
            message: error.message
        });
    }
}

app.post('/checkout', checkoutController);
app.post('/verification', paymentVerificationController);

app.listen(PORT, ()=>{
 console.log(`Listening on port ${PORT}`);
});