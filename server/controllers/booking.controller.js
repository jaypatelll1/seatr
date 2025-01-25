const bookingModel = require('../models/booking.model');
const restaurantModel = require('../models/restaurantModel');

const bookingController = {
  async getBookings(req, res) {
    try {
      const { status, restaurant_id } = req.query;
      const bookings = await bookingModel.getBookings(req.user.id, { status, restaurant_id });
      return res.status(200).json(bookings);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching bookings', details: error.message });
    }
  },

  async createBooking(req, res) {
    try {
      const { restaurant_id, table_ids, guest_count, start_time, end_time, booking_type } = req.body;
      
      const availableTables = await restaurantModel.checkTableAvailability(
        restaurant_id, 
        table_ids, 
        start_time, 
        end_time
      );

      if (availableTables.length !== table_ids.length) {
        return res.status(400).json({ error: 'Selected tables are not available' });
      }

      const booking = await bookingModel.createBooking(req.user.id, req.body);
      return res.status(201).json(booking);
    } catch (error) {
      return res.status(500).json({ error: 'Error creating booking', details: error.message });
    }
  },

  async getBookingById(req, res) {
    try {
      const booking = await bookingModel.getBookingById(req.params.id, req.user.id);
      
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      return res.status(200).json(booking);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching booking', details: error.message });
    }
  },

  async cancelBooking(req, res) {
    try {
      const booking = await bookingModel.cancelBooking(req.params.id, req.user.id);
      
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found or cannot be cancelled' });
      }

      return res.status(200).json(booking);
    } catch (error) {
      return res.status(500).json({ error: 'Error cancelling booking', details: error.message });
    }
  },

  async completeBooking(req, res) {
    try {
      if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Unauthorized: Admin access required' });
      }

      const booking = await bookingModel.completeBooking(req.params.id);
      
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      return res.status(200).json(booking);
    } catch (error) {
      return res.status(500).json({ error: 'Error completing booking', details: error.message });
    }
  },

  async releaseBooking(req, res) {
    try {
      const booking = await bookingModel.releaseBooking(req.params.id);
      
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      return res.status(200).json(booking);
    } catch (error) {
      return res.status(500).json({ error: 'Error releasing booking', details: error.message });
    }
  }
};

module.exports = bookingController;