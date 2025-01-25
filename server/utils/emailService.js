const nodemailer = require('nodemailer');
require('dotenv').config();

const emailService = {
  async sendResetTokenEmail(email, token) {
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
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Token',
      text: `Your password reset token is: ${token}. 
             This token will expire in 10 minutes.`
    });
  }
};

module.exports = emailService;