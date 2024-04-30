require('dotenv').config();
const axios = require('axios');
const crypto = require('crypto');
const eventManager = require('./eventManager');  // Import the event manager

const webhookUrl = 'http://localhost:3000/webhook';  // Merchant's webhook URL
const secret = process.env.WEBHOOK_SECRET;

function sendWebhook(payload) {
    const payloadString = JSON.stringify(payload);
    const signature = crypto.createHmac('sha256', secret)
        .update(payloadString)
        .digest('hex');

    axios.post(webhookUrl, payload, {
        headers: {
            'Content-Type': 'application/json',
            'x-razorpay-signature': signature
        }
    })
        .then(response => {
            console.log('Webhook sent successfully:', response.statusText);
        })
        .catch(error => {
            console.error('Failed to send webhook:', error.message);
        });
}

// Listen for the 'payment.success' event
eventManager.on('payment.success', (paymentDetails) => {
    console.log('Payment success event detected:', paymentDetails);
    sendWebhook(paymentDetails);
});

// Example function to simulate payment success
function simulatePaymentSuccess() {
    const paymentDetails = {
        event: 'payment.success',
        payment_id: 'pay_9ABCD12345',
        amount: 10000,
        currency: 'INR'
    };
    eventManager.emit('payment.success', paymentDetails);
}

simulatePaymentSuccess();  // Call this function to simulate an event
