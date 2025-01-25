const express = require('express');
const passwordResetController = require('../controllers/passwordreset.controller');

const router = express.Router();

router.post('/send-reset-otp', passwordResetController.sendPasswordResetOTP);
router.post('/verify-reset-token', passwordResetController.verifyResetToken);
router.post('/reset-password', passwordResetController.resetPassword);

module.exports = router;