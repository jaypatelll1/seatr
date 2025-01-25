const db = require('../config/db');

const restaurantModel = {
  async getAllRestaurants(filters = {}) {
    let query = 'SELECT * FROM Restaurants WHERE 1=1';
    const params = [];
    let paramCount = 1;

    if (filters.cuisine) {
      query += ` AND cuisine = $${paramCount}`;
      params.push(filters.cuisine);
      paramCount++;
    }

    if (filters.location) {
      query += ` AND location ILIKE $${paramCount}`;
      params.push(`%${filters.location}%`);
      paramCount++;
    }

    const result = await db.query(query, params);
    return result.rows;
  },

  async getRestaurantById(restaurantId) {
    const result = await db.query(
      `SELECT * FROM Restaurants WHERE restaurant_id = $1`,
      [restaurantId]
    );
    return result.rows[0];
  },

  async checkTableAvailability(restaurantId, tableIds, startTime, endTime) {
    const result = await db.query(
      `SELECT t.table_id 
       FROM Tables t
       WHERE t.restaurant_id = $1 
       AND t.table_id = ANY($2)
       AND NOT EXISTS (
         SELECT 1 FROM Bookings b
         WHERE b.restaurant_id = $1
         AND b.table_ids @> ARRAY[t.table_id]::uuid[]
         AND (
           (b.start_time < $4 AND b.end_time > $3)
           OR (b.start_time >= $3 AND b.start_time < $4)
         )
         AND b.status NOT IN ('CANCELLED', 'COMPLETED')
       )`,
      [restaurantId, tableIds, startTime, endTime]
    );
    return result.rows;
  }
};

module.exports = restaurantModel;