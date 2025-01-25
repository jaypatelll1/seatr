const express = require('express');
const bookingController = require('../controllers/booking.controller');
const { jwtAuthMiddleware } = require('../middleware/jwtAuthMiddleware');

const router = express.Router();

// Apply JWT authentication to all routes
router.use(jwtAuthMiddleware);

router.get('/', bookingController.getBookings);
router.post('/', bookingController.createBooking);
router.get('/:id', bookingController.getBookingById);
router.put('/:id/cancel', bookingController.cancelBooking);
router.put('/:id/complete', bookingController.completeBooking);
router.put('/:id/release', bookingController.releaseBooking);

module.exports = router;