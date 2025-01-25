const db = require('../config/db');

const bookingModel = {
  // Fetch bookings with optional filters
  async getBookings(userId, filters = {}) {
    let query = `
      SELECT b.*, r.name AS restaurant_name 
      FROM Bookings b
      JOIN Restaurants r ON b.restaurant_id = r.restaurant_id
      WHERE b.user_id = $1
    `;
    const params = [userId];
    let paramCount = 2;

    if (filters.status) {
      query += ` AND b.status = $${paramCount}`;
      params.push(filters.status);
      paramCount++;
    }

    if (filters.restaurant_id) {
      query += ` AND b.restaurant_id = $${paramCount}`;
      params.push(filters.restaurant_id);
      paramCount++;
    }

    const result = await db.query(query, params);
    return result.rows;
  },

  // Create a new booking
  async createBooking(userId, bookingData) {
    const { 
      restaurant_id, 
      table_ids, 
      guest_count, 
      start_time, 
      end_time, 
      booking_type 
    } = bookingData;

    const result = await db.query(
      `INSERT INTO Bookings 
      (user_id, restaurant_id, table_ids, guest_count, start_time, end_time, booking_type, status) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, 'PENDING') 
      RETURNING *`,
      [
        userId, 
        restaurant_id, 
        table_ids, 
        guest_count, 
        start_time, 
        end_time, 
        booking_type
      ]
    );
    return result.rows[0];
  },

  // Get specific booking details
  async getBookingById(bookingId, userId) {
    const result = await db.query(
      `SELECT b.*, r.name AS restaurant_name 
       FROM Bookings b
       JOIN Restaurants r ON b.restaurant_id = r.restaurant_id
       WHERE b.booking_id = $1 AND b.user_id = $2`,
      [bookingId, userId]
    );
    return result.rows[0];
  },

  // Cancel a booking
  async cancelBooking(bookingId, userId) {
    const result = await db.query(
      `UPDATE Bookings 
       SET status = 'CANCELLED', 
           updated_at = NOW() 
       WHERE booking_id = $1 AND user_id = $2 
       RETURNING *`,
      [bookingId, userId]
    );
    return result.rows[0];
  },

  // Complete a booking (Admin only)
  async completeBooking(bookingId) {
    const result = await db.query(
      `UPDATE Bookings 
       SET status = 'COMPLETED', 
           updated_at = NOW() 
       WHERE booking_id = $1 
       RETURNING *`,
      [bookingId]
    );
    return result.rows[0];
  },

  // Release a table
  async releaseBooking(bookingId) {
    const result = await db.query(
      `UPDATE Bookings 
       SET status = 'RELEASED', 
           updated_at = NOW() 
       WHERE booking_id = $1 
       RETURNING *`,
      [bookingId]
    );
    return result.rows[0];
  }
};

module.exports = bookingModel;