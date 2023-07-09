const nodemailer = require("nodemailer");
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  //  || 465,
  secure: false,
  //  || true,
  auth: {
    user: "shibuchapagain12@gmail.com",
    pass: "nclm rapt mmgc ctgj",
  },
  tls: {
    rejectUnauthorized: false,
  },
  // tls: {
  //   // Add this setting to specify the SSL/TLS version
  //   minVersion: "TLSv1",
  // },
});

// setup email data with unicode symbols
let mailOptions = {
  from: '"Shibu Chapagain" <shibuchapagain12@gmail.com>', // sender address
  to: "recipient-email@example.com", // list of receivers
  subject: "Verification Code", // Subject line
  text: "Your verification code is 123456", // plain text body
  html: "<b>Your verification code is 123456</b>", // html body
};

// send mail with defined transport object

const sendEmail = (mailOptions: any) => {
  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
};

export default sendEmail;
