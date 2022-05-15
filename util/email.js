const nodemailer = require("nodemailer");
const sendEmail = options =>{

    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "6446ec72e056a0",
          pass: "06a6ce16ee9301"
        }
      });

      const mailOptions ={
          from:"Rajeev <prakashrajeev8005@gmail.com> ",
          to :options.email,
          subject:options.subject,
          text:options.message,
      }

     await  tranporter.sendMail(mailOptions)

}

module.exports = sendEmail;