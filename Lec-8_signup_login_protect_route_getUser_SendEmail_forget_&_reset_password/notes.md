
- JWT (JSON Web Token) / Web token:
   - It is a compact and self-contained way of securley transmitting the information between parties as a JSON object.
   
   -  It is commonly used for authentication and information exchange in web applications and APIs.

   - please refer the notes.

   - To implement the JWT, we need a libray -> we require 'jsonwebtoken'

   - Need to install it npm i jsonwebtoken or yarn add jsonwebtoken

# How to send email via backend?

  - Whenever -> you want to use someone else services, you need the API key and the server who is providing the services.

  - Email Service:
    - you need the access of STMP server:
       - Twilio sendgrid
       - Gmail
       - Hotmail, Outlooks 

  - Steps for getting API key from sendgrid

     1. signup: https://app.sendgrid.com/
     2. FA auth -> Enabling (Choose this option Text SMS)
     3. Dashboard of sendgrid
     4. Email API -> integration guide -> web API -> ch0ose nodeJS
     5. generate and get the API -> take that API key and store it in .env
     6. npm install --save @sendgrid/mail / yarn add @sendgrid/mail
     7. To check whether email is being sent or not, use the sendgrid code.

# How to send the email via nodeJS API using nodemailer?

   - nodemailer - popular email library that is being used for sending emails from nodeJS apps
   - yarn add nodemailer
