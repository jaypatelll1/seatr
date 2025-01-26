const nodemailer = require('nodemailer');
require('dotenv').config();

const emailNotif = {
  async sendEmail() {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      requireTLS: true
    });

    await transporter.sendMail({
      from: `"Seatr" <${process.env.EMAIL_USER}>`,
      to: "ayushsonar-inft@atharvacoe.ac.in",
      subject: 'Booking Confirmation',
      text: `Your booking has been confirmed.
             Date and Time: 27 January 2022, 10:00 AM - 12:00 PM.
             Table Number: 1`
    });
  }
};

module.exports = emailNotif;