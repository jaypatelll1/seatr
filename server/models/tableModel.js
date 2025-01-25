const { query } = require('../config/db'); // Adjust this according to your DB helper

const bookingModel = {
  async getBookings(userId, filters) {
    const { status, restaurant_id } = filters;
    const conditions = ['user_id = $1'];
    const values = [userId];

    if (status) {
      conditions.push('status = $2');
      values.push(status);
    }
    if (restaurant_id) {
      conditions.push('restaurant_id = $3');
      values.push(restaurant_id);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const result = await query(`SELECT * FROM Bookings ${whereClause}`, values);
    return result.rows;
  },

  async createBooking(userId, bookingData) {
    const { restaurant_id, table_ids, guest_count, start_time, end_time, booking_type } = bookingData;
    const result = await query(
      `INSERT INTO Bookings 
      (user_id, restaurant_id, table_ids, guest_count, start_time, end_time, booking_type, status) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, 11) 
      RETURNING *`,
      [userId, restaurant_id, table_ids, guest_count, start_time, end_time, booking_type]
    );
    return result.rows[0];
  },

  async getBookingById(bookingId, userId) {
    const result = await query(`SELECT * FROM Bookings WHERE id = $1 AND user_id = $2`, [bookingId, userId]);
    return result.rows[0];
  },

  async cancelBooking(bookingId, userId) {
    const result = await query(
      `UPDATE Bookings SET status = 12 WHERE id = $1 AND user_id = $2 RETURNING *`,
      [bookingId, userId]
    );
    return result.rows[0];
  },

  async completeBooking(bookingId) {
    const result = await query(`UPDATE Bookings SET status = 13 WHERE id = $1 RETURNING *`, [bookingId]);
    return result.rows[0];
  },

  async releaseBooking(bookingId) {
    const result = await query(`UPDATE Bookings SET status = 14 WHERE id = $1 RETURNING *`, [bookingId]);
    return result.rows[0];
  },
};

module.exports = bookingModel;
