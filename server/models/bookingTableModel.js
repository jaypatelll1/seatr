const { query } = require('../config/db');


  // Create a new booking-table association
exports.createBookingTable=   async(bookingId, tableId)=> {
    const result = await query(
      `INSERT INTO BookingTables (booking_id, table_id) 
      VALUES ($1, $2) 
      RETURNING *`,
      [bookingId, tableId]
    );
    return result.rows[0];
  },

  // Get all tables associated with a specific booking
  exports.getBookingTables= async(bookingId)=> {
    const result = await query(
      `SELECT bt.*, t.table_identifier, t.capacity, r.name AS restaurant_name
      FROM BookingTables bt
      JOIN Tables t ON bt.table_id = t.table_id
      JOIN Restaurants r ON t.restaurant_id = r.restaurant_id
      WHERE bt.booking_id = $1`,
      [bookingId]
    );
    return result.rows;
  }
