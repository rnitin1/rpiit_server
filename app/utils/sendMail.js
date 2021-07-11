const nodemailer = require("nodemailer");

exports.sendMail1 = async (email, subject, template) => {
  let transporter = await nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "Gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  let mailOptions = {
    to: email,
    subject,
    html: template,
  };
  transporter.sendMail(mailOptions, (err, result) => {
    console.log({ err, result });
    if (err) {
      console.log("errrrrrrrrrrrrr  ", err);
      return err;
    } else {
      console.log("uuuuuuuuuuuu    ", result);
      return result;
    }
  });
};
