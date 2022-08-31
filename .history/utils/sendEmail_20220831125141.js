const nodemailer = require('nodemailer');
const senderEmail =  "newlife132@hotmail.com";
const senderPassword =  "Newlife@132";
const emailService = "hotmail.com";


const transporter = nodemailer.createTransport({
  service:emailService,
  auth: {
    user: senderEmail,
    pass: senderPassword
  }
});

const sendEmail =(userEmail)=>{ 
  
  const mailOptions = {
    from: senderEmail,
    to: userEmail,
    subject: 'Welcome To Our Community',
    text: 'We are happy to welcome you.'
  };

  transporter.sendMail(mailOptions, function(error, info){
  if (error) {console.log(error); return false;} 
  else {console.log('Email sent: ' + info.response); return true;}
});}

module.exports= sendEmail;