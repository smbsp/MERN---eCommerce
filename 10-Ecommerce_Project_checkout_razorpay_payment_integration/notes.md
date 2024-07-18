# payment related challenges:

  1. Security: 

      - Requirement: compliance with PCI DSS (Payment Card Industry Data Security Standard) - regularly monitoring, monthly/Bi-weekly audting, maintain the secure server, cardholder data protection etc

  2. Multiple mode of payments
         - UPI
         - credit/debit
         - netbanking

  3. Data Encryption

  4. Fraud Detection and prevention

  5. Legal and regulatory consirderations required.

  # Third party payment gateways:

    - Razorpay
    - stripe
    - paypal

  # payment gateway responsibilities:
   1. Include multiple payments methods - payment aggregators.
   2. Security and user data protection.
   3. Inform the server the final status of the payment
        - call a predefined route (webhook) to inform about the status.

  # checkout and payment flow:

    1. From the product page, you initiate a product request to get the product details.

    2. Checkout page, we get the all details of the product that the end users are buying.

    3. Make the payment through the integrated payment gateway(Razorpay)

    4. Redirected to the order page

    5. patment gateway webhook to notify about the payment.


  # razorpay integration:

    - asymmetric encryption technique
        - public key (public key required for clients)
        - secret key (it is kept at the sever side)

    - sign up on the razorpay.
       - https://razorpay.com/pricing/
       - go to signup part with 0 fee - test account has to be created otrherwise live account can deduct you money where you will associate your bank details in razorpay.

       - login -> dashboard page of the Razorpay ->  account & settings -> API keys will show you secret key, public key.

       - copy those public and private key.

    - Implementation of razorpay integration in our website:
       https://razorpay.com/docs/payments/server-integration/nodejs/payment-gateway/build-integration/

       1. yarn add razorpay / npm i razorpay

       2. go to the integration steps
           - create the instance of the razorpay
           - pass options
           - create the orderinformation to razorpay to create the order.
           - verify and intimate to the server (webhook).

    - webhook:
       - Please refer the notes.


     




     
