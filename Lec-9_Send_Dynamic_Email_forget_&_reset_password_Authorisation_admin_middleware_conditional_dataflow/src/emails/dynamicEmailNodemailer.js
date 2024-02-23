const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();
const { SENDGRID_API_KEY, SENDER_EMAIL } = process.env;

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

const fs = require('fs');
const path = require('path');

// always use the async method of reading files.
const otpHtmlTemplateStr = fs.readFileSync(path.join(__dirname, '../templates', 'otp.html'), 'utf-8'); // /Users/ashwanirajput/Documents/Projects/MERN_Stack_Jan_2024/Lec-9_Send_Dynamic_Email_forget_&_reset_password_Authorisation_admin_middleware_conditional_dataflow/src/emails/templates/otp.html 
// console.log(otpHtmlTemplateStr);

// //2. enter the details required to send the email
// let emailObj = { 
//   to: 'ashwin.rajput87@gmail.com', // Change to your recipient
//   from: 'ashwani.rajput_1@scaler.com', // Change to your verified sender
//   subject: 'Sending Email with nodemailer',
//   text: 'You can send email to anyone',
//   html: '<strong>Nodemailer is sending email now</strong>',
// };

// transporter.sendMail(emailObj).then(()=>{
//   console.log("Email has been sent");
// }).catch((err)=> console.log(err));

const sendEmailHelper = async(otp, userName, to) => {

  try {

        const finalHTMLTemplate = otpHtmlTemplateStr
            .replace('#{USER_NAME}', userName)
            .replace('#{OTP}', otp);

        const text = `Hi ${userName}, tour OTP for forgot password is ${otp}`;

        let emailObj = { 
          to: to, // Change to your recipient
          from: SENDER_EMAIL, // Change to your verified sender
          subject: 'Reset Password Verification OTP',
          text: text,
          html: finalHTMLTemplate,
        };

        transporter.sendMail(emailObj).then(()=>{
          console.log("Email has been sent");
        }).catch((err)=> console.log(err));
            
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }

}

//sendEmailHelper("123456", 'Ashwani Rajput', 'ashwin.rajput87@gmail.com')

module.exports = sendEmailHelper;