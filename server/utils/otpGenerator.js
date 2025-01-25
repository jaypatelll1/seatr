// utils/otpGenerator.js
const crypto = require('crypto');

class OTPService {
  static generateOTP(length = 6) {
    return crypto.randomInt(
      Math.pow(10, length - 1), 
      Math.pow(10, length)
    ).toString();
  }

  static generateResetToken() {
    return crypto.randomBytes(32).toString('hex');
  }
}

module.exports = OTPService;