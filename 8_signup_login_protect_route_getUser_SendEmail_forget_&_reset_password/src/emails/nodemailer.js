const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();
const { SENDGRID_API_KEY } = process.env;

console.log(SENDGRID_API_KEY);

//1. entering the details of your smtp server and client -> create transporter

const techDetails = {
    host: 'smtp.sendgrid.net',
    port: 465,
    secure: true,
    auth: {
       user: 'apikey', // Note: Use 'apikey' as the username
       pass: SENDGRID_API_KEY // Use your SendGrid API Key as the password
    }
};

const transporter  = nodemailer.createTransport(techDetails);
//2. enter the details required to send the email
let emailObj = { 
  to: 'ashwin.rajput87@gmail.com', // Change to your recipient
  from: 'ashwani.rajput_1@scaler.com', // Change to your verified sender
  subject: 'Sending Email with nodemailer',
  text: 'You can send email to anyone',
  html: '<strong>Nodemailer is sending email now</strong>',
};

transporter.sendMail(emailObj).then(()=>{
  console.log("Email has been sent");
}).catch((err)=> console.log(err));