'use strict';
const nodemailer = require('nodemailer');
let btoa = require('btoa');


// async..await is not allowed in global scope, must use a wrapper
module.exports = async function sendMail(user) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "apikey", // generated ethereal user
      pass: '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'
    }
  });
  let mail = btoa(user.email)
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"BlingSwish" <gaxite1155@one-mail.top>', // sender address
    to: `${user.email}`, // list of receivers
    subject: `${user.subject}`, // Subject line
    text: `${user.text}`, // plain text body
    html: `${user.html}`
  });
  console.log('Message sent: %s', info.messageId);
  console.log(info)
  console.log(info.from)
  console.log(info.to)

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}