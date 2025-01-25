const { hashPassword } = require('../utils/hashUtil');
const userModel = require('../models/userModel');
const emailService = require('../utils/emailService');

const passwordResetController = {
  // Send password reset OTP
  async sendPasswordResetOTP(req, res) {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    try {
      // Check if user exists
      const user = await userModel.findUserByEmail(email);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Generate reset token
      const resetToken = await userModel.generatePasswordResetToken(email);

      // Send email with reset token
      await emailService.sendResetTokenEmail(email, resetToken);

      return res.status(200).json({ message: 'Password reset OTP sent' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error sending reset OTP', details: error.message });
    }
  },

  // Verify reset token
  async verifyResetToken(req, res) {
    const { email, token } = req.body;

    if (!email || !token) {
      return res.status(400).json({ error: 'Email and token are required' });
    }

    try {
      const user = await userModel.verifyResetToken(email, token);
      
      if (!user) {
        return res.status(400).json({ error: 'Invalid or expired token' });
      }

      return res.status(200).json({ message: 'Token verified successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error verifying token', details: error.message });
    }
  },

  // Reset password
  async resetPassword(req, res) {
    const { email, token, newPassword } = req.body;

    if (!email || !token || !newPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      // Verify token first
      const user = await userModel.verifyResetToken(email, token);
      
      if (!user) {
        return res.status(400).json({ error: 'Invalid or expired token' });
      }

      // Hash new password
      const hashedPassword = await hashPassword(newPassword);

      // Update password
      await userModel.updatePassword(email, hashedPassword);

      return res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error resetting password', details: error.message });
    }
  }
};

module.exports = passwordResetController;