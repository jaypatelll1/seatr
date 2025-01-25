const { query } = require('../config/db');


  // Create a new booking
   exports.createBooking = async( bookingData)=> {
    const { restaurant_id, booking_time,user_id,  start_time,end_time } = bookingData;
    const result = await query(
      `INSERT INTO Bookings (user_id, restaurant_id, booking_time, status ,  start_time,end_time) 
      VALUES ($1, $2, $3, $4 ,$5,$6 ) 
      RETURNING *`,
      [user_id, restaurant_id, booking_time,11 ,  start_time,end_time]
    );
    return result.rows[0];
  },

  // Get booking details by bookingId
   exports.getBookingById= async(bookingId, userId)=> {
    const result = await query(
      `SELECT b.*, r.name AS restaurant_name
      FROM Bookings b
      JOIN Restaurants r ON b.restaurant_id = r.restaurant_id
      WHERE b.booking_id = $1 AND b.user_id = $2`,
      [bookingId, userId]
    );
    return result.rows[0];
  },

  // Cancel a booking (Set status to 'canceled')
   exports.cancelBooking = async(bookingId, userId)=> {
    const result = await query(
      `UPDATE Bookings
      SET status = 13, updated_at = NOW()  -- assuming 13 is canceled status
      WHERE booking_id = $1 AND user_id = $2
      RETURNING *`,
      [bookingId, userId]
    );
    return result.rows[0];
  },

  // Complete a booking (Admin only)
   exports.completeBooking = async(bookingId) => {
    const result = await query(
      `UPDATE bookings
      SET status = 12, updated_at = NOW()  -- assuming 14 is completed status
      WHERE booking_id = $1
      RETURNING *`,
      [bookingId]
    );
    return result.rows[0];
  },

  // Release a booking (Free up the reservation, Set status to released)
  exports.releaseBooking = async(bookingId)=> {
    const result = await query(
      `UPDATE Bookings
      SET status = 15, updated_at = NOW()  -- assuming 15 is released status
      WHERE booking_id = $1
      RETURNING *`,
      [bookingId]
    );
    return result.rows[0];
  }



