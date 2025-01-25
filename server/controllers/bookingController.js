const bookingModel = require('../models/booking.model');
const bookingTableModel = require('../models/bookingTableModel');


  // Create a new booking with tables
  exports.createBooking = async (req, res)=> {
    try {
        
      const {user_id, restaurant_id, start_time,end_time,booking_time, table_ids } = req.body;

      // Step 1: Create the booking
      const bookingData = { user_id,restaurant_id, booking_time, start_time,end_time };
      const booking = await bookingModel.createBooking(bookingData);

      // Step 2: Associate tables with the booking
      const tables = [];
      for (const tableId of table_ids) {
        const table = await bookingTableModel.createBookingTable(booking.booking_id, tableId);
        tables.push(table);
      }

      // Respond with booking and tables
      res.status(201).json({
        message: 'Booking created successfully with tables',
        booking,
        tables,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to create booking with tables' });
    }
  },

  // Get booking details with associated tables
  exports.getBookingById= async(req, res) =>{
    try {
      const { bookingId ,userId} = req.params;  // Booking ID from URL params
          
      console.log('userId',userId);
      

      const booking = await bookingModel.getBookingById(bookingId, userId);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }

      const tables = await bookingTableModel.getBookingTables(bookingId);
      res.status(200).json({ booking, tables });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to get booking details' });
    }
  },

  // Cancel a booking (Set status to canceled)
  exports.cancelBooking= async(req, res)=> {
    try {
      const { bookingId } = req.params;  // Booking ID from URL params
      const userId = req.user.id;        // Assuming user ID is stored in JWT token

      const canceledBooking = await bookingModel.cancelBooking(bookingId, userId);
      if (!canceledBooking) {
        return res.status(404).json({ message: 'Booking not found or already canceled' });
      }

      res.status(200).json({
        message: 'Booking canceled successfully',
        booking: canceledBooking,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to cancel booking' });
    }
  },

  // Complete a booking (Admin only)
   exports.completeBooking = async(req, res)=> {
    try {
      const { bookingId } = req.params;  // Booking ID from URL params

      const completedBooking = await bookingModel.completeBooking(bookingId);
      if (!completedBooking) {
        return res.status(404).json({ message: 'Booking not found or already completed' });
      }

      res.status(200).json({
        message: 'Booking completed successfully',
        booking: completedBooking,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to complete booking' });
    }
  },

  // Release a booking (Set status to released)
  exports.releaseBooking  =  async(req, res)=> {
    try {
      const { bookingId } = req.params;  // Booking ID from URL params

      const releasedBooking = await bookingModel.releaseBooking(bookingId);
      if (!releasedBooking) {
        return res.status(404).json({ message: 'Booking not found or already released' });
      }

      res.status(200).json({
        message: 'Booking released successfully',
        booking: releasedBooking,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to release booking' });
    }
  }

