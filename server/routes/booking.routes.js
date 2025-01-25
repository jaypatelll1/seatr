const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const {jwtAuthMiddleware} = require('../middleware/jwtAuthMiddleware')
const{authorizeRoles}= require('../middleware/roleMiddleware')

// Route to create a booking and associate tables
router.post('/create',jwtAuthMiddleware, bookingController.createBooking);

// Route to get booking details with associated tables
router.get('/:userId/:bookingId', jwtAuthMiddleware,bookingController.getBookingById);

// Route to get all bookings in a restaurant
router.get('/:restaurantId', bookingController.getBookingsByRestaurant);

// Route to cancel a booking
// router.put('/bookings/:bookingId/cancel',jwtAuthMiddleware, bookingController.cancelBooking);

// Route to complete a booking (Admin only)
router.put('/:bookingId/complete',jwtAuthMiddleware, bookingController.completeBooking);

// // Route to release a booking
// router.put('/bookings/:bookingId/release', bookingController.releaseBooking);

module.exports = router;
