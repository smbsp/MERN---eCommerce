import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const loadScript = () => {
    return new Promise((resolve, reject)=>{
      const script = document.createElement('script');
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  const dispalyRazorpay = async() => {
    await loadScript();

    console.log('Checkout.js script loaded');

    const resp = await fetch('http://localhost:3060/checkout', {method: 'POST'});
    const respJSON = await resp.json();
    console.log(respJSON.message);

    const {id, currency, amount } = respJSON.message;

    console.log(id);

        var options = {
          "key": 'rzp_test_4oG8GbYT3IEPnA', // Enter the Key ID generated from the razorpay Dashboard
          "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          "currency":currency,
          "name": "Acme Corp", //your business name
          "description": "Test Transaction",
          "image": "https://example.com/your_logo",
          "order_id": id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          "handler": function (response){
              alert(response.razorpay_payment_id);
              alert(response.razorpay_order_id);
              alert(response.razorpay_signature);
          },
          "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
              "name": "Ashwani Rajput", //your customer's name
              "email": "ashwin.rajput87@gmail.com",
              "contact": "9810214080" //Provide the customer's phone number for better conversion rates 
          },
          "notes": {
              "address": "Razorpay Corporate Office"
          },
          "theme": {
              "color": "#3399cc"
          }
        };

        const rzpInstance = new Razorpay(options);
        rzpInstance.open();

}
  return (
    <>
     <button 
     onClick={dispalyRazorpay}>
      Pay
     </button>
    </>
  )
}

export default App
